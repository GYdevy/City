import type { BuildingState } from './buildings';
import type { ResourceMap } from './resources';

export interface CityStats {
  population: number;
  populationCapacity: number;
  morale: number;
  turn: number;
}

export interface GameState {
  resources: ResourceMap;
  city: CityStats;
  buildings: BuildingState[];
}
