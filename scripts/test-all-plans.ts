import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
});

async function testAllPlans() {
  const plans = [
    { name: 'Pro', priceId: process.env.STRIPE_PRICE_ID, expected: 1900 },
    { name: 'Team', priceId: process.env.STRIPE_TEAM_PRICE_ID, expected: 5900 },
    { name: 'Enterprise', priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID, expected: 4900 },
  ];

  console.log('Testing all Stripe plans...\n');

  for (const plan of plans) {
    try {
      if (!plan.priceId) {
        console.log(`❌ ${plan.name}: Missing price ID in environment`);
        continue;
      }

      const price = await stripe.prices.retrieve(plan.priceId);
      const amount = price.unit_amount || 0;
      
      if (amount === plan.expected) {
        console.log(`✅ ${plan.name}: $${amount/100}/month (${plan.priceId})`);
      } else {
        console.log(`⚠️  ${plan.name}: Expected $${plan.expected/100}, got $${amount/100}`);
      }
    } catch (error: any) {
      console.log(`❌ ${plan.name}: ${error.message}`);
    }
  }
}

testAllPlans();
