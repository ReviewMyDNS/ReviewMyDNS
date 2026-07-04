const path = require('path');

try {
  process.loadEnvFile(path.join(__dirname, '.env'));
} catch (err) {
  // .env is optional at config-parse time; STRIPE_SECRET_KEY may already be set in the environment
}

module.exports = {
  apps: [{
    name: 'reviewmydns',
    script: './dist/index.js',
    kill_timeout: 5000,
    listen_timeout: 10000,
    cwd: '/var/www/reviewmydns',
    env: {
      NODE_ENV: 'production',
      PORT: 5005,
      DATABASE_URL: process.env.DATABASE_URL,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_PRICE_ID: 'prod_THmhVGb1mFtY9L',
      STRIPE_ENTERPRISE_PRICE_ID: 'prod_THmhVGb1mFtY9L'
    }
  }]
}
