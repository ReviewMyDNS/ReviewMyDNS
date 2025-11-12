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

async function createProductHuntPromo() {
  try {
    console.log("Creating ProductHunt promo code...");
    
    // Step 1: Create a coupon for 100% off for 1 month
    console.log("Step 1: Creating coupon (100% off for 1 month)...");
    const coupon = await stripe.coupons.create({
      name: "ProductHunt Launch - 1 Month Free Pro",
      percent_off: 100,
      duration: "repeating",
      duration_in_months: 1,
    });
    console.log("✓ Coupon created:", coupon.id);
    
    // Step 2: Create promotion code "PRODUCTHUNT"
    console.log("Step 2: Creating promotion code 'PRODUCTHUNT'...");
    const promoCode = await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: "PRODUCTHUNT",
      max_redemptions: 1000, // Limit to 1000 uses
      expires_at: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days from now
      restrictions: {
        first_time_transaction: true, // Only for new customers
      },
    });
    console.log("✓ Promotion code created:", promoCode.code);
    
    console.log("\n🎉 SUCCESS! Promo code details:");
    console.log("═══════════════════════════════════════");
    console.log("Code:", promoCode.code);
    console.log("Discount: 100% off for 1 month");
    console.log("Max uses: 1000");
    console.log("Expires:", new Date(promoCode.expires_at! * 1000).toLocaleDateString());
    console.log("First-time customers only: Yes");
    console.log("═══════════════════════════════════════");
    
  } catch (error: any) {
    if (error.code === 'resource_already_exists') {
      console.log("\n⚠️  Promotion code 'PRODUCTHUNT' already exists!");
      console.log("No action needed - code is ready to use.");
    } else {
      console.error("\n❌ Error creating promo code:", error.message);
      throw error;
    }
  }
}

createProductHuntPromo();
