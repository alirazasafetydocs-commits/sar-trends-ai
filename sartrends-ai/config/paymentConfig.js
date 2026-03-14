/**
 * Payment Configuration
 * Contains payment methods and instructions for manual verification
 */

module.exports = {
  // Subscription Plans
  plans: {
    free: {
      name: 'Free',
      price: 0,
      dailyLimit: 3,
      features: [
        '3 AI generations per day',
        'Basic resume templates',
        'Basic cover letter templates'
      ]
    },
    pro: {
      name: 'Pro',
      price: 1500, // PKR
      dailyLimit: 100,
      features: [
        '100 AI generations per day',
        'All resume templates',
        'All cover letter templates',
        'HSE Documents',
        'Website Builder',
        'Priority Support'
      ]
    },
    business: {
      name: 'Business',
      price: 3000, // PKR
      dailyLimit: -1, // Unlimited
      features: [
        'Unlimited AI generations',
        'All features',
        'Custom Documents',
        'API Access',
        'Dedicated Support',
        'White-label options'
      ]
    }
  },

  // Payment Methods
  methods: {
    easypaisa: {
      name: 'Easypaisa',
      type: 'mobile-wallet',
      instructions: [
        '1. Open Easypaisa app on your phone',
        '2. Go to "Send Money"',
        '3. Enter our Merchant Number: 0345-1234567',
        '4. Enter the amount for your selected plan',
        '5. Complete the transaction',
        '6. Copy the Transaction ID shown',
        '7. Submit payment with Transaction ID'
      ],
      accountNumber: '0345-1234567',
      accountName: 'SAR Trends'
    },
    meezan: {
      name: 'Meezan Bank Transfer',
      type: 'bank-transfer',
      instructions: [
        '1. Visit any Meezan Bank branch',
        '2. Request a funds transfer form',
        '3. Fill in our account details:',
        '   Account Title: SAR Trends',
        '   Account Number: 1234-5678-9012-3',
        '   IBAN: PK36 MEZN 0000 1234 5678 9012 3',
        '   Branch Code: 1234',
        '4. Complete the transfer',
        '5. Get the transaction receipt',
        '6. Submit payment with Transaction ID'
      ],
      accountNumber: '1234-5678-9012-3',
      accountTitle: 'SAR Trends',
      iban: 'PK36 MEZN 0000 1234 5678 9012 3',
      bankName: 'Meezan Bank Limited',
      branchCode: '1234'
    }
  },

  // Payment Currency
  currency: {
    code: 'PKR',
    symbol: 'Rs',
    name: 'Pakistani Rupee'
  },

  // Subscription Duration (in days)
  subscriptionDuration: 30
};

