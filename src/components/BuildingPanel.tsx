import { getBuildingDefinition } from '../data/buildings';
import { canAfford, getUpgradeCost } from '../systems/buildingSystem';
import type { BuildingState } from '../types/buildings';
import type { ResourceMap } from '../types/resources';
import { resourceLabels, resourceOrder } from '../types/resources';

interface BuildingPanelProps {
  building: BuildingState;
  resources: ResourceMap;
  onUpgrade: (buildingId: BuildingState['id']) => void;
}

export function BuildingPanel({ building, resources, onUpgrade }: BuildingPanelProps) {
  const definition = getBuildingDefinition(building.id);
  const cost = getUpgradeCost(building);
  const affordable = canAfford(resources, cost);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-700 bg-slate-900/70 p-5 shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{definition.name}</h3>
          <p className="text-sm text-slate-400">Level {building.level}</p>
        </div>
        <span className="rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-200">
          Next: {building.level + 1}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-300">{definition.description}</p>
      <p className="mt-3 rounded-lg bg-slate-800 p-3 text-sm text-emerald-200">
        {definition.effectDescription(building.level)}
      </p>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">Upgrade Cost</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {resourceOrder
            .filter((resource) => cost[resource])
            .map((resource) => (
              <span key={resource} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
                {resourceLabels[resource]} {cost[resource]}
              </span>
            ))}
        </div>
      </div>

      <button
        className="mt-auto rounded-xl bg-amber-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        disabled={!affordable}
        onClick={() => onUpgrade(building.id)}
        type="button"
      >
        {affordable ? 'Upgrade Building' : 'Insufficient Resources'}
      </button>
    </article>
  );
}
