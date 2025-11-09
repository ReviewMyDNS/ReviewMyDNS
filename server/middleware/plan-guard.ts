import type { Request, Response, NextFunction } from "express";
import { PLAN_LIMITS, type PlanTier } from "@shared/schema";

// Extend Express User type
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      subscriptionPlan?: string | null;
    }
  }
}

export function getPlanTier(user: Express.User | undefined): PlanTier {
  if (!user) return "anonymous";
  
  const plan = user.subscriptionPlan?.toLowerCase();
  if (plan === "pro") return "pro";
  if (plan === "team") return "team";
  if (plan === "enterprise") return "enterprise";
  return "free";
}

export function requirePlan(...allowedPlans: PlanTier[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userPlan = getPlanTier(req.user);
    
    if (!allowedPlans.includes(userPlan)) {
      return res.status(403).json({
        error: "This feature requires a paid plan",
        currentPlan: userPlan,
        requiredPlans: allowedPlans,
        message: `Upgrade to ${allowedPlans.join(" or ")} to access this feature`,
      });
    }
    
    next();
  };
}

export function checkFeatureAccess(feature: keyof typeof PLAN_LIMITS.pro.features) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userPlan = getPlanTier(req.user);
    const planLimits = PLAN_LIMITS[userPlan];
    
    if (!planLimits.features[feature]) {
      return res.status(403).json({
        error: `This feature is not available on your ${userPlan} plan`,
        feature,
        currentPlan: userPlan,
        message: "Upgrade to Pro or Enterprise to access this feature",
      });
    }
    
    next();
  };
}

export function checkRecordTypeAccess(recordType: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userPlan = getPlanTier(req.user);
    const planLimits = PLAN_LIMITS[userPlan];
    
    // Check if record type is in allowed list
    const isAllowed = (planLimits.allowedRecordTypes as readonly string[]).includes(recordType);
    
    if (!isAllowed) {
      return res.status(403).json({
        error: "This record type is not available on your plan",
        recordType,
        currentPlan: userPlan,
        allowedTypes: planLimits.allowedRecordTypes,
        message: "Upgrade to Pro or Enterprise to query advanced record types",
      });
    }
    
    next();
  };
}
