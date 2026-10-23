export type BillingCycle = 'monthly' | 'annual';
export type Panel = 'notifications' | 'account' | null;
export type StoryCategory = 'micro' | 'history' | 'kids' | 'animation';
export interface CreditTier { name: 'Basic' | 'Pro' | 'Max'; resolutions: string[]; rates: Record<string, number>; }

