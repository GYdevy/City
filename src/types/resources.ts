export type ResourceKey = 'gold' | 'wood' | 'stone' | 'food' | 'research';

export type ResourceMap = Record<ResourceKey, number>;

export const resourceLabels: Record<ResourceKey, string> = {
  gold: 'Gold',
  wood: 'Wood',
  stone: 'Stone',
  food: 'Food',
  research: 'Research',
};

export const resourceOrder: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'research'];
