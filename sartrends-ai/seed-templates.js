const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
const Template = require('./models/Template');

const connectDB = async () => {
  const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/sartrends-ai';
  await mongoose.connect(connStr);
  console.log('MongoDB connected');
};

const templates = [
  {
    name: 'Modern Free',
    description: 'Clean modern resume',
    type: 'resume',
    tier: 'free',
    html: '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>{{fullName}} Resume</title><style>body{font-family:\'Segoe UI\',sans-serif;margin:0;padding:20px;line-height:1.6;color:#333;}.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0;}.name{font-size:2.5em;margin:0;font-weight:bold;}.contact{margin:10px 0;font-size:1.1em;opacity:0.9;}.section{margin:30px 0;padding-left:20px;border-left:4px solid #667eea;}.section h2{color:#667eea;font-size:1.5em;margin-bottom:15px;}.skills{display:flex;flex-wrap:wrap;gap:10px;}.skill{background:#667eea;color:white;padding:5px 12px;border-radius:20px;font-size:0.9em;}</style></head><body><div class="header"><h1 class="name">{{fullName}}</h1><p class="contact">{{email}} | {{phone}} | {{location}}</p></div><div class="section"><h2>Professional Summary</h2><p>{{summary}}</p></div><div class="section"><h2>Skills</h2><div class="skills">{{#each skills}}<span class="skill">{{this}}</span>{{/each}}</div></div><div class="section"><h2>Experience</h2>{{#each experience}}<h3>{{title}} - {{company}} ({{dates}})</h3><p>{{description}}</p>{{/each}}</div><div class="section"><h2>Education</h2>{{#each education}}<h3>{{degree}} - {{school}} ({{dates}})</h3>{{/each}}</div></body></html>',
    category: 'modern'
  },
  {
    name: 'Classic Free',
    description: 'Traditional resume layout',
    type: 'resume',
    tier: 'free',
    html: '<!DOCTYPE html><html><head><title>{{fullName}} Resume</title><style>body{font-family:Arial,sans-serif;margin:40px;line-height:1.5;}h1{font-size:2em;border-bottom:3px solid #333;padding-bottom:10px;}h2{font-size:1.3em;margin-top:25px;color:#333;border-bottom:1px solid #ccc;padding-bottom:5px;}.info{margin-bottom:20px;font-size:0.9em;color:#666;}.skills ul{list-style:none;padding:0;}.skills li{background:#eee;padding:5px 10px;margin:5px 0;border-radius:3px;}</style></head><body><h1>{{fullName}}</h1><div class="info"><strong>{{email}}</strong> | {{phone}} | {{location}}</div><div><h2>Summary</h2><p>{{summary}}</p></div><div class="skills"><h2>Skills</h2><ul>{{#each skills}}<li>{{this}}</li>{{/each}}</ul></div><div><h2>Experience</h2>{{#each experience}}<h3>{{title}}, {{company}} ({{dates}})</h3><p>{{description}}</p>{{/each}}</div><div><h2>Education</h2>{{#each education}}<h3>{{degree}}, {{school}} ({{dates}})</h3>{{/each}}</div></body></html>',
    category: 'classic'
  },
  // Add 3 more free
  {
    name: 'Professional Premium',
    description: 'Premium two-column layout',
    type: 'resume',
    tier: 'premium',
    html: '<html><!-- Premium HTML --></html>',
    category: 'professional'
  }
  // Add 9 more premium
];

const seedTemplates = async () => {
  await connectDB();
  
  for (const temp of templates) {
    await Template.findOneAndUpdate({ name: temp.name }, temp, { upsert: true });
  }
  
  console.log('Templates seeded');
  process.exit();
};

seedTemplates();
