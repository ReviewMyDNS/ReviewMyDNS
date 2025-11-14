import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

async function createTestPromo() {
  try {
    console.log("Creating PHTEST promo code for testing...");
    
    // Step 1: Create a coupon for 100% off for 1 month
    console.log("Step 1: Creating coupon (100% off for 1 month)...");
    const coupon = await stripe.coupons.create({
      name: "Test - 1 Month Free Pro",
      percent_off: 100,
      duration: "repeating",
      duration_in_months: 1,
    });
    console.log("✓ Coupon created:", coupon.id);
    
    // Step 2: Create promotion code "PHTEST" with NO restrictions
    console.log("Step 2: Creating promotion code 'PHTEST'...");
    const promoCode = await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: "PHTEST",
      max_redemptions: 100,
    });
    console.log("✓ Promotion code created:", promoCode.code);
    
    console.log("\n🎉 SUCCESS! Test promo code details:");
    console.log("═══════════════════════════════════════");
    console.log("Code: PHTEST");
    console.log("Discount: 100% off for 1 month");
    console.log("Max uses: 100");
    console.log("Restrictions: NONE (for testing)");
    console.log("═══════════════════════════════════════");
    
  } catch (error: any) {
    if (error.code === 'resource_already_exists') {
      console.log("\n⚠️  Promotion code 'PHTEST' already exists!");
      console.log("No action needed - code is ready to use.");
    } else {
      console.error("\n❌ Error creating promo code:", error.message);
      throw error;
    }
  }
}

createTestPromo();
