import type { BuildingState } from '../types/buildings';
import type { CityStats, GameState } from '../types/city';
import type { ResourceMap } from '../types/resources';

const getLevel = (buildings: BuildingState[], id: BuildingState['id']): number =>
  buildings.find((building) => building.id === id)?.level ?? 0;

export const calculatePopulationCapacity = (buildings: BuildingState[]): number =>
  50 + getLevel(buildings, 'townHall') * 25;

export const calculateMorale = (buildings: BuildingState[]): number =>
  Math.min(100, 70 + getLevel(buildings, 'propagandaOffice') * 2);

export const calculateTurnProduction = (state: GameState): ResourceMap => {
  const { buildings, city } = state;
  const populationFactor = Math.max(1, Math.floor(city.population / 10));

  return {
    gold: populationFactor * 3 + getLevel(buildings, 'market') * 4 + getLevel(buildings, 'barracks') + getLevel(buildings, 'propagandaOffice'),
    wood: populationFactor * 2 + getLevel(buildings, 'archeryRange'),
    stone: populationFactor + getLevel(buildings, 'townHall'),
    food: populationFactor * 2 + getLevel(buildings, 'stable'),
    research: getLevel(buildings, 'academy') * 3,
  };
};

export const advanceTurn = (state: GameState): GameState => {
  const production = calculateTurnProduction(state);
  const populationCapacity = calculatePopulationCapacity(state.buildings);
  const morale = calculateMorale(state.buildings);
  const foodSurplus = production.food;
  const populationGrowth = foodSurplus > 0 && state.city.population < populationCapacity ? 1 : 0;

  const city: CityStats = {
    population: Math.min(populationCapacity, state.city.population + populationGrowth),
    populationCapacity,
    morale,
    turn: state.city.turn + 1,
  };

  return {
    ...state,
    city,
    resources: {
      gold: state.resources.gold + production.gold,
      wood: state.resources.wood + production.wood,
      stone: state.resources.stone + production.stone,
      food: state.resources.food + production.food,
      research: state.resources.research + production.research,
    },
  };
};
