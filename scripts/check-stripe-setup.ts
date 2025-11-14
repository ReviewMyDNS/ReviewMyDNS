import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
if (!process.env.STRIPE_PRICE_ID) {
  throw new Error('Missing required Stripe secret: STRIPE_PRICE_ID');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

async function checkSetup() {
  try {
    console.log("🔍 Checking Stripe configuration...\n");
    
    // Check the price being used
    const priceId = process.env.STRIPE_PRICE_ID;
    console.log("1️⃣  Pro Plan Price ID:", priceId);
    
    const price = await stripe.prices.retrieve(priceId);
    console.log("   Amount:", (price.unit_amount! / 100).toFixed(2), price.currency.toUpperCase());
    console.log("   Product:", price.product);
    console.log("");
    
    // List all promotion codes
    console.log("2️⃣  Active Promotion Codes:");
    const promoCodes = await stripe.promotionCodes.list({ limit: 10, active: true });
    
    for (const promo of promoCodes.data) {
      console.log(`   - ${promo.code}`);
      const coupon = await stripe.coupons.retrieve(promo.coupon as string);
      console.log(`     Discount: ${coupon.percent_off}% off for ${coupon.duration_in_months || 'forever'}`);
      console.log(`     Active: ${promo.active}, Expires: ${promo.expires_at ? new Date(promo.expires_at * 1000).toLocaleDateString() : 'Never'}`);
      console.log("");
    }
    
  } catch (error: any) {
    console.error("❌ Error:", error.message);
  }
}

checkSetup();
