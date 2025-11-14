import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
});

async function testCheckout() {
  try {
    console.log('Testing Stripe checkout with live keys...');
    console.log('Secret key prefix:', process.env.STRIPE_SECRET_KEY?.substring(0, 15));
    console.log('Price ID:', process.env.STRIPE_PRICE_ID);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });
    
    console.log('\n✅ STRIPE IS WORKING!');
    console.log('✅ Checkout session created successfully!');
    console.log('Session ID:', session.id);
    console.log('Payment link:', session.url);
  } catch (error: any) {
    console.log('\n❌ STRIPE ERROR:', error.message);
    console.log('Error code:', error.code);
    console.log('Error type:', error.type);
  }
}

testCheckout();
