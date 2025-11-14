import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
});

async function createTeamPrice() {
  try {
    // Create product
    const product = await stripe.products.create({
      name: 'ReviewMyDNS Team',
      description: 'Team plan for growing teams and agencies',
    });
    
    console.log('✅ Product created:', product.id);
    
    // Create price ($59/month)
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 5900, // $59.00
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
    });
    
    console.log('✅ Team Price created!');
    console.log('Price ID:', price.id);
    console.log('Amount:', price.unit_amount / 100, 'USD/month');
    console.log('\nAdd this to your Replit Secrets:');
    console.log('STRIPE_TEAM_PRICE_ID=' + price.id);
    
  } catch (error: any) {
    console.log('❌ Error:', error.message);
  }
}

createTeamPrice();
