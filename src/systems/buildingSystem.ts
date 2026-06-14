import { getBuildingDefinition } from '../data/buildings';
import type { BuildingState } from '../types/buildings';
import type { ResourceKey, ResourceMap } from '../types/resources';

const RESOURCE_KEYS: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'research'];

export const getUpgradeCost = (building: BuildingState): Partial<ResourceMap> => {
  const definition = getBuildingDefinition(building.id);
  const nextLevel = building.level + 1;
  const multiplier = nextLevel * nextLevel;

  return Object.fromEntries(
    Object.entries(definition.baseCost).map(([resource, amount]) => [
      resource,
      Math.ceil((amount ?? 0) * multiplier),
    ]),
  ) as Partial<ResourceMap>;
};

export const canAfford = (resources: ResourceMap, cost: Partial<ResourceMap>): boolean =>
  RESOURCE_KEYS.every((resource) => resources[resource] >= (cost[resource] ?? 0));

export const spendResources = (resources: ResourceMap, cost: Partial<ResourceMap>): ResourceMap => ({
  gold: resources.gold - (cost.gold ?? 0),
  wood: resources.wood - (cost.wood ?? 0),
  stone: resources.stone - (cost.stone ?? 0),
  food: resources.food - (cost.food ?? 0),
  research: resources.research - (cost.research ?? 0),
});
