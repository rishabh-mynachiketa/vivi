import { useState } from "react";
import "./PricingSection.css";
import { pricingPlans } from "../../data/pricing";

type BillingCycle = "monthly" | "annual";
type Feature = { name: string; available: boolean };

const monthlyFeatures: Record<string, Feature[]> = {
  free: [
    { name: "Max video length: 30 sec", available: true },
    { name: "Video models: Standard", available: true },
    { name: "Image models: 1K resolution", available: true },
    { name: "Max resolution: 720p", available: true },
    { name: "Vibe Edit: Limited", available: true },
    { name: "Watermark: No", available: false },
    { name: "Concurrent generations: 1", available: true },
    { name: "Priority queue", available: false },
    { name: "Commercial rights", available: false },
    { name: "Team seats: 1", available: true },
    { name: "Credit rollover", available: false },
    { name: "Top-up credits", available: true },
    { name: "Early access to new features and models", available: false },
    { name: "Community access", available: false },
  ],
  starter: [
    { name: "Max video length: 3 min", available: true },
    { name: "Video models: Standard + Pro", available: true },
    { name: "Image models: 1K resolution", available: true },
    { name: "Max resolution: 720p", available: true },
    { name: "Vibe Edit: Full", available: true },
    { name: "Watermark: No", available: true },
    { name: "Concurrent generations: 1", available: true },
    { name: "Priority queue", available: false },
    { name: "Commercial rights", available: true },
    { name: "Team seats: 1", available: true },
    { name: "Credit rollover", available: false },
    { name: "Top-up credits", available: true },
    { name: "Early access to new features and models", available: false },
    { name: "Community access", available: true },
  ],
  creator: [
    { name: "Max video length: 5 min", available: true },
    { name: "Video models: All models", available: true },
    { name: "Image models: All models", available: true },
    { name: "Max resolution: 1080p", available: true },
    { name: "Vibe Edit: Full", available: true },
    { name: "Watermark: No", available: true },
    { name: "Concurrent generations: 2", available: true },
    { name: "Priority queue: Priority", available: true },
    { name: "Commercial rights", available: true },
    { name: "Team seats: 1", available: true },
    { name: "Credit rollover", available: false },
    { name: "Top-up credits", available: true },
    { name: "Early access to new features and models", available: false },
    { name: "Community access", available: true },
  ],
  pro: [
    { name: "Max video length: 10 min", available: true },
    { name: "Video models: All models", available: true },
    { name: "Image models: All models", available: true },
    { name: "Max resolution: 1080p", available: true },
    { name: "Vibe Edit: Full", available: true },
    { name: "Watermark: No", available: true },
    { name: "Concurrent generations: 3", available: true },
    { name: "Priority queue: Priority", available: true },
    { name: "Commercial rights", available: true },
    { name: "Team seats: 1", available: true },
    { name: "Credit rollover", available: false },
    { name: "Top-up credits", available: true },
    { name: "Early access to new features and models", available: true },
    { name: "Community access", available: true },
  ],
  business: [
    { name: "Max video length: 10 min", available: true },
    { name: "Video models: All models", available: true },
    { name: "Image models: All models", available: true },
    { name: "Max resolution: 1080p", available: true },
    { name: "Vibe Edit: Full", available: true },
    { name: "Watermark: No", available: true },
    { name: "Concurrent generations: 5", available: true },
    { name: "Priority queue: Highest priority", available: true },
    { name: "Commercial rights", available: true },
    { name: "Team seats: Custom (Contact Us)", available: true },
    { name: "Credit rollover: 1 month", available: true },
    { name: "Top-up credits", available: true },
    { name: "Early access to new features and models", available: true },
    { name: "Community access", available: true },
  ],
};

const annualPlanDetails: Record<
  string,
  { price: string; bonusLine: string; monthlyRelease: string; features: Feature[] }
> = {
  starter: {
    price: "$275",
    bonusLine: "1 month free + 900 credits bonus",
    monthlyRelease: "1,875",
    features: [
      { name: "Max video length: 5 min", available: true },
      { name: "Video models: Standard + Pro", available: true },
      { name: "Image models: 1K resolution", available: true },
      { name: "Max resolution: 720p", available: true },
      { name: "Vibe Edit: Full", available: true },
      { name: "Watermark: No", available: true },
      { name: "Concurrent generations: 1", available: true },
      { name: "Priority queue: Priority", available: true },
      { name: "Commercial rights", available: true },
      { name: "Team seats: 1", available: true },
      { name: "Monthly credit release (extra one month release on request): 1,875", available: true },
      { name: "Credit rollover", available: true },
      { name: "Quarterly extra bonus credits", available: true },
      { name: "Early access to new features and models", available: true },
      { name: "Discounted top-up credits: 10%", available: true },
      { name: "Community access", available: true },
      { name: "Priority support", available: true },
    ],
  },
  creator: {
    price: "$660",
    bonusLine: "1 month free + 2,160 credits bonus",
    monthlyRelease: "4,500",
    features: [
      { name: "Max video length: 8 min", available: true },
      { name: "Video models: All models", available: true },
      { name: "Image models: All models", available: true },
      { name: "Max resolution: 1080p", available: true },
      { name: "Vibe Edit: Full", available: true },
      { name: "Watermark: No", available: true },
      { name: "Concurrent generations: 2", available: true },
      { name: "Priority queue: Priority", available: true },
      { name: "Commercial rights", available: true },
      { name: "Team seats: 1", available: true },
      { name: "Monthly credit release (extra one month release on request): 4,500", available: true },
      { name: "Credit rollover", available: true },
      { name: "Quarterly extra bonus credits", available: true },
      { name: "Early access to new features and models", available: true },
      { name: "Discounted top-up credits: 10%", available: true },
      { name: "Community access", available: true },
      { name: "Priority support", available: true },
    ],
  },
  pro: {
    price: "$1,650",
    bonusLine: "1 month free + 8,200 credits bonus",
    monthlyRelease: "12,083",
    features: [
      { name: "Max video length: 10 min", available: true },
      { name: "Video models: All models", available: true },
      { name: "Image models: All models", available: true },
      { name: "Max resolution: 1080p", available: true },
      { name: "Vibe Edit: Full", available: true },
      { name: "Watermark: No", available: true },
      { name: "Concurrent generations: 3", available: true },
      { name: "Priority queue: Priority", available: true },
      { name: "Commercial rights", available: true },
      { name: "Team seats: 1", available: true },
      { name: "Monthly credit release (extra one month release on request): 12,083", available: true },
      { name: "Credit rollover", available: true },
      { name: "Quarterly extra bonus credits", available: true },
      { name: "Early access to new features and models", available: true },
      { name: "Discounted top-up credits: 12%", available: true },
      { name: "Community access", available: true },
      { name: "Priority support", available: true },
    ],
  },
  business: {
    price: "$2,750",
    bonusLine: "1 month free + 13,000 credits bonus",
    monthlyRelease: "21,083",
    features: [
      { name: "Max video length: 10 min", available: true },
      { name: "Video models: All models", available: true },
      { name: "Image models: All models", available: true },
      { name: "Max resolution: 1080p", available: true },
      { name: "Vibe Edit: Full", available: true },
      { name: "Watermark: No", available: true },
      { name: "Concurrent generations: 5", available: true },
      { name: "Priority queue: Highest priority", available: true },
      { name: "Commercial rights", available: true },
      { name: "Team seats: Custom (Contact Us)", available: true },
      { name: "Monthly credit release (extra one month release on request): 21,083", available: true },
      { name: "Credit rollover", available: true },
      { name: "Quarterly extra bonus credits", available: true },
      { name: "Early access to new features and models", available: true },
      { name: "Discounted top-up credits: 15%", available: true },
      { name: "Community access", available: true },
      { name: "Priority support", available: true },
    ],
  },
};

const monthlyCredits: Record<string, string> = {
  free: "300 (one-time)",
  starter: "1,800",
  creator: "4,320",
  pro: "11,400",
  business: "20,000",
};

const annualCreditBreakdown: Record<
  string,
  { base: string; bonus: string; total: string }
> = {
  starter: { base: "21,600", bonus: "900", total: "22,500" },
  creator: { base: "51,840", bonus: "2,160", total: "54,000" },
  pro: { base: "136,800", bonus: "8,200", total: "145,000" },
  business: { base: "240,000", bonus: "13,000", total: "253,000" },
};

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const isAnnual = billingCycle === "annual";

  return (
    <section className="pricing-section" id="vivi-pricing" style={{ scrollMarginTop: "88px" }}>
      <div className="pricing-inner">
        <header className="pricing-header">
          <div className="section-overline">Pricing</div>
          <h2 className="pricing-heading">Start free. Scale when ready.</h2>
          <p className="pricing-subheading">
            Pick the plan that fits your workflow. Switch billing any time.
          </p>

          <div className="billing-switch" role="group" aria-label="Choose billing cycle">
            <button
              type="button"
              className={`billing-option ${!isAnnual ? "active" : ""}`}
              aria-pressed={!isAnnual}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`billing-option ${isAnnual ? "active" : ""}`}
              aria-pressed={isAnnual}
              onClick={() => setBillingCycle("annual")}
            >
              Annual
              <span className="billing-save">Yearly</span>
            </button>
          </div>
          <p className="billing-caption" aria-live="polite">
            {isAnnual
              ? "Annual plans include enhanced generation limits and bonus credits."
              : "Flexible monthly billing. Upgrade or change your plan as you grow."}
          </p>
        </header>

        <div className={`pricing-grid ${isAnnual ? "annual-view" : "monthly-view"}`}>
          {pricingPlans.map((plan) => {
            const annualDetails = annualPlanDetails[plan.id];
            const isFree = plan.id === "free";
            const displayPrice = isAnnual
              ? (isFree ? "$0" : annualDetails?.price ?? plan.price)
              : plan.price;
            const displayPeriod = isAnnual
              ? (isFree ? "" : "/year")
              : plan.period;
            const displayFeatures = isAnnual && annualDetails
              ? annualDetails.features
              : monthlyFeatures[plan.id] ?? plan.features;
            const credits = isAnnual && !isFree
              ? annualCreditBreakdown[plan.id]?.total ?? ""
              : monthlyCredits[plan.id] ?? "";

            return (
              <article key={plan.id} className={`price-card ${plan.featured ? "featured" : ""}`}>
                {plan.badge && <div className="price-badge">{plan.badge}</div>}

                <div className="price-card-top">
                  <div className="price-tier">{plan.name}</div>

                  <div className="price-value" key={`${plan.id}-${billingCycle}`}>
                    <span className="price-amount">{displayPrice}</span>
                    {displayPeriod && <span className="price-period">{displayPeriod}</span>}
                  </div>

                  <p className="price-desc">{plan.description}</p>

                  <div className="credits-highlight" key={`${plan.id}-credits-${billingCycle}`}>
                    <span className="credits-label">
                      {isAnnual && !isFree
                        ? "TOTAL ANNUAL CREDITS"
                        : isFree
                          ? "ONE-TIME CREDITS"
                          : "MONTHLY CREDITS"}
                    </span>
                    <div className="credits-amount">
                      <span className="credits-spark" aria-hidden="true">✦</span>
                      {credits}
                      <span className="credits-unit">credits</span>
                    </div>

                    {isAnnual && isFree && (
                      <p className="one-time-credit-note">
                        300 credits are granted once, not annually.
                      </p>
                    )}

                    {isAnnual && annualDetails && (
                      <>
                        <p className="annual-bonus-line">{annualDetails.bonusLine}</p>
                        <div className="annual-credit-breakdown">
                          <span>Base: {annualCreditBreakdown[plan.id].base}</span>
                          <span>Bonus: +{annualCreditBreakdown[plan.id].bonus}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <ul className="price-features">
                  {displayFeatures.map((item) => (
                    <li
                      key={item.name}
                      className={[
                        item.available ? "available" : "dim",
                        item.name.toLowerCase().includes("credit") ? "credits-feature" : "",
                      ].filter(Boolean).join(" ")}
                    >
                      <span className="feature-icon" aria-hidden="true">
                        {item.available ? "✓" : "×"}
                      </span>
                      <span className="feature-name">{item.name}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`btn-plan ${plan.featured ? "btn-plan-fill" : "btn-plan-outline"} btn-plan-disabled`}
                  disabled
                  aria-disabled="true"
                  tabIndex={-1}
                >
                  Coming Soon
                </button>
              </article>
            );
          })}
        </div>

        <p className="pricing-note">
          Annual totals include 12 months of base credits plus the stated bonus credits. Free-plan credits are one-time only, not annual. Taxes extra if any.
        </p>
      </div>
    </section>
  );
}
