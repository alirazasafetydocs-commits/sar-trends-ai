/**
 * AI Provider Service with Automatic Fallback
 * Supports OpenAI, Groq, and Together AI
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;

// Provider configuration
const PROVIDERS = {
  openai: {
    name: 'OpenAI',
    enabled: !!OPENAI_API_KEY,
    priority: 1,
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    maxTokens: 4000,
    temperature: 0.7
  },
  groq: {
    name: 'Groq',
    enabled: !!GROQ_API_KEY,
    priority: 2,
    model: process.env.GROQ_MODEL || 'mixtral-8x7b-32768',
    maxTokens: 4000,
    temperature: 0.7
  },
  together: {
    name: 'Together AI',
    enabled: !!TOGETHER_API_KEY,
    priority: 3,
    model: process.env.TOGETHER_MODEL || 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    maxTokens: 4000,
    temperature: 0.7
  }
};

// Get enabled providers sorted by priority
function getEnabledProviders() {
  return Object.values(PROVIDERS)
    .filter(p => p.enabled)
    .sort((a, b) => a.priority - b.priority);
}

// Call OpenAI API
async function callOpenAI(prompt, systemPrompt, options = {}) {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: options.model || PROVIDERS.openai.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: options.temperature || PROVIDERS.openai.temperature,
      max_tokens: options.max_tokens || PROVIDERS.openai.maxTokens
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'OpenAI API request failed');
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    provider: 'openai',
    model: data.model,
    usage: data.usage
  };
}

// Call Groq API
async function callGroq(prompt, systemPrompt, options = {}) {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key not configured');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: options.model || PROVIDERS.groq.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: options.temperature || PROVIDERS.groq.temperature,
      max_tokens: options.max_tokens || PROVIDERS.groq.maxTokens
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Groq API request failed');
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    provider: 'groq',
    model: data.model,
    usage: data.usage
  };
}

// Call Together AI API
async function callTogetherAI(prompt, systemPrompt, options = {}) {
  if (!TOGETHER_API_KEY) {
    throw new Error('Together AI API key not configured');
  }

  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOGETHER_API_KEY}`
    },
    body: JSON.stringify({
      model: options.model || PROVIDERS.together.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: options.temperature || PROVIDERS.together.temperature,
      max_tokens: options.max_tokens || PROVIDERS.together.maxTokens
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Together AI API request failed');
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    provider: 'together',
    model: data.model,
    usage: data.usage
  };
}

// Main AI call function with automatic fallback
async function callAI(prompt, systemPrompt, options = {}) {
  const providers = getEnabledProviders();
  
  if (providers.length === 0) {
    throw new Error('No AI providers configured. Please set at least one API key.');
  }

  let lastError = null;
  
  for (const provider of providers) {
    try {
      console.log(`Trying AI provider: ${provider.name}...`);
      
      switch (provider.name.toLowerCase()) {
        case 'openai':
          return await callOpenAI(prompt, systemPrompt, options);
        case 'groq':
          return await callGroq(prompt, systemPrompt, options);
        case 'together ai':
          return await callTogetherAI(prompt, systemPrompt, options);
        default:
          throw new Error(`Unknown provider: ${provider.name}`);
      }
    } catch (error) {
      console.error(`${provider.name} failed:`, error.message);
      lastError = error;
      // Continue to next provider
    }
  }

  // All providers failed
  throw new Error(`All AI providers failed. Last error: ${lastError?.message}`);
}

// Check if AI is available
function isAIAvailable() {
  return getEnabledProviders().length > 0;
}

// Get provider info
function getProviderInfo() {
  return {
    available: getEnabledProviders().map(p => ({
      name: p.name,
      enabled: p.enabled,
      priority: p.priority,
      model: p.model
    })),
    primary: getEnabledProviders()[0]?.name || 'None',
    fallbackAvailable: getEnabledProviders().length > 1
  };
}

module.exports = {
  callAI,
  isAIAvailable,
  getProviderInfo,
  PROVIDERS
};

