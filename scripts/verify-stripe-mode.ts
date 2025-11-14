import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

async function verifyMode() {
  console.log("\n🔍 STRIPE MODE VERIFICATION\n");
  console.log("═══════════════════════════════════════════════════");
  
  // Check key prefix
  const keyPrefix = process.env.STRIPE_SECRET_KEY.substring(0, 8);
  console.log("Secret Key Prefix:", keyPrefix);
  console.log("Mode based on prefix:", keyPrefix.includes("test") ? "TEST MODE ❌" : "LIVE MODE ✅");
  console.log("");
  
  // Retrieve account to confirm
  try {
    const account = await stripe.accounts.retrieve();
    console.log("Stripe Account ID:", account.id);
    console.log("Account Email:", account.email || "N/A");
    console.log("Business Name:", account.business_profile?.name || account.settings?.dashboard?.display_name || "N/A");
    console.log("");
    
    // Try to retrieve the configured price
    const priceId = process.env.STRIPE_PRICE_ID;
    console.log("Checking Price ID:", priceId);
    
    try {
      const price = await stripe.prices.retrieve(priceId!);
      console.log("✅ Price EXISTS in this account!");
      console.log("   Amount:", (price.unit_amount! / 100).toFixed(2), price.currency.toUpperCase());
      console.log("   Product ID:", price.product);
    } catch (e: any) {
      console.log("❌ Price NOT FOUND in this account!");
      console.log("   Error:", e.message);
    }
    
  } catch (error: any) {
    console.error("Error retrieving account:", error.message);
  }
  
  console.log("═══════════════════════════════════════════════════\n");
}

verifyMode();
