import type { BuildingDefinition, BuildingId, BuildingState } from '../types/buildings';

export const buildingDefinitions: BuildingDefinition[] = [
  {
    id: 'townHall',
    name: 'Town Hall',
    description: 'The administrative heart of the city.',
    baseCost: { wood: 40, stone: 25, gold: 20 },
    effectDescription: (level) => `Population capacity +${level * 25}.`,
  },
  {
    id: 'barracks',
    name: 'Barracks',
    description: 'Training grounds for future infantry.',
    baseCost: { wood: 35, stone: 20, gold: 15 },
    effectDescription: (level) => `Adds +${level} gold from military contracts each turn.`,
  },
  {
    id: 'archeryRange',
    name: 'Archery Range',
    description: 'A dedicated range for missile troops.',
    baseCost: { wood: 45, stone: 15, gold: 15 },
    effectDescription: (level) => `Adds +${level} wood from fletching workshops each turn.`,
  },
  {
    id: 'stable',
    name: 'Stable',
    description: 'Infrastructure for cavalry and mounts.',
    baseCost: { wood: 30, stone: 25, food: 20 },
    effectDescription: (level) => `Adds +${level} food from animal husbandry each turn.`,
  },
  {
    id: 'market',
    name: 'Market',
    description: 'Merchants gather here to exchange goods.',
    baseCost: { wood: 30, stone: 20, gold: 30 },
    effectDescription: (level) => `Gold production +${level * 4} each turn.`,
  },
  {
    id: 'academy',
    name: 'Academy',
    description: 'Scholars convert prosperity into discoveries.',
    baseCost: { wood: 25, stone: 35, gold: 25 },
    effectDescription: (level) => `Research production +${level * 3} each turn.`,
  },
  {
    id: 'propagandaOffice',
    name: 'Propaganda Office',
    description: 'Public messaging keeps citizens confident.',
    baseCost: { wood: 20, stone: 20, gold: 35 },
    effectDescription: (level) => `Morale +${level * 2} and +${level} gold each turn.`,
  },
];

export const defaultBuildings: BuildingState[] = buildingDefinitions.map((building) => ({
  id: building.id,
  level: building.id === 'townHall' ? 1 : 0,
}));

export const getBuildingDefinition = (id: BuildingId): BuildingDefinition => {
  const definition = buildingDefinitions.find((building) => building.id === id);

  if (!definition) {
    throw new Error(`Unknown building id: ${id}`);
  }

  return definition;
};
