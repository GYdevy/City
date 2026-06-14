import { useEffect, useState } from 'react';
import { defaultBuildings } from '../data/buildings';
import { canAfford, getUpgradeCost, spendResources } from '../systems/buildingSystem';
import { advanceTurn, calculateMorale, calculatePopulationCapacity } from '../systems/resourceSystem';
import type { BuildingId } from '../types/buildings';
import type { GameState } from '../types/city';

const SAVE_KEY = 'city-strategy-mvp-save';

export const createInitialGameState = (): GameState => ({
  resources: {
    gold: 120,
    wood: 120,
    stone: 90,
    food: 100,
    research: 0,
  },
  city: {
    population: 25,
    populationCapacity: calculatePopulationCapacity(defaultBuildings),
    morale: calculateMorale(defaultBuildings),
    turn: 1,
  },
  buildings: defaultBuildings,
});

const loadGameState = (): GameState => {
  const saved = localStorage.getItem(SAVE_KEY);

  if (!saved) {
    return createInitialGameState();
  }

  try {
    return JSON.parse(saved) as GameState;
  } catch {
    localStorage.removeItem(SAVE_KEY);
    return createInitialGameState();
  }
};

export interface GameStore {
  state: GameState;
  nextTurn: () => void;
  upgradeBuilding: (buildingId: BuildingId) => void;
  resetSave: () => void;
}

export const useGameStore = (): GameStore => {
  const [state, setState] = useState<GameState>(loadGameState);

  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }, [state]);

  const nextTurn = (): void => {
    setState((current) => advanceTurn(current));
  };

  const upgradeBuilding = (buildingId: BuildingId): void => {
    setState((current) => {
      const building = current.buildings.find((item) => item.id === buildingId);

      if (!building) {
        return current;
      }

      const cost = getUpgradeCost(building);

      if (!canAfford(current.resources, cost)) {
        return current;
      }

      const buildings = current.buildings.map((item) =>
        item.id === buildingId ? { ...item, level: item.level + 1 } : item,
      );

      return {
        ...current,
        resources: spendResources(current.resources, cost),
        city: {
          ...current.city,
          populationCapacity: calculatePopulationCapacity(buildings),
          morale: calculateMorale(buildings),
        },
        buildings,
      };
    });
  };

  const resetSave = (): void => {
    localStorage.removeItem(SAVE_KEY);
    setState(createInitialGameState());
  };

  return { state, nextTurn, upgradeBuilding, resetSave };
};
