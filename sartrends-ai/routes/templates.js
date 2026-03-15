const express = require('express');
const Template = require('../models/Template');
const auth = require('../middleware/auth'); // Assume auth middleware

const router = express.Router();

// Get templates by type and user plan
router.get('/', auth, async (req, res) => {
  try {
    const { type, category, tier } = req.query;
    const userTierOrder = {
      'free': 1,
      'gold': 2,
      'premium': 3,
      'platinum': 4
    };
    const userTier = userTierOrder[req.user.plan] || 1;

    const query = { type, isActive: true };
    if (category) query.category = category;

    const templates = await Template.find(query).sort({ createdAt: -1 });

    // Filter by tier
    const availableTemplates = templates.filter(t => userTierOrder[t.tier] <= userTier);

    res.json({
      templates: availableTemplates,
      userPlan: req.user.plan,
      canAccessPremium: userTier >= 3
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching templates', error: error.message });
  }
});

// Get single template
router.get('/:id', auth, async (req, res) => {
  try {
    const template = await Template.findOne({ _id: req.params.id, isActive: true });
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    // Check tier
    const userTierOrder = { 'free': 1, 'gold': 2, 'premium': 3, 'platinum': 4 };
    if (userTierOrder[template.tier] > userTierOrder[req.user.plan]) {
      return res.status(403).json({ message: 'Upgrade plan to access this template' });
    }

    res.json(template);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching template' });
  }
});

module.exports = router;

