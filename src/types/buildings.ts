import type { ResourceMap } from './resources';

export type BuildingId =
  | 'townHall'
  | 'barracks'
  | 'archeryRange'
  | 'stable'
  | 'market'
  | 'academy'
  | 'propagandaOffice';

export interface BuildingDefinition {
  id: BuildingId;
  name: string;
  description: string;
  baseCost: Partial<ResourceMap>;
  effectDescription: (level: number) => string;
}

export interface BuildingState {
  id: BuildingId;
  level: number;
}
