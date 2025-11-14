import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
});

async function testTeamCheckout() {
  try {
    console.log('Testing Team plan checkout...');
    console.log('Team Price ID:', process.env.STRIPE_TEAM_PRICE_ID);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: process.env.STRIPE_TEAM_PRICE_ID!,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });
    
    console.log('\n✅ TEAM PLAN CHECKOUT WORKING!');
    console.log('✅ Checkout session created successfully!');
    console.log('Session ID:', session.id);
    console.log('Payment link:', session.url);
  } catch (error: any) {
    console.log('\n❌ TEAM CHECKOUT ERROR:', error.message);
    console.log('Error code:', error.code);
  }
}

testTeamCheckout();
