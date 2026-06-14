import { BuildingPanel } from '../components/BuildingPanel';
import { calculateTurnProduction } from '../systems/resourceSystem';
import type { BuildingId } from '../types/buildings';
import type { GameState } from '../types/city';
import { resourceLabels, resourceOrder } from '../types/resources';

interface CityScreenProps {
  gameState: GameState;
  onUpgradeBuilding: (buildingId: BuildingId) => void;
}

export function CityScreen({ gameState, onUpgradeBuilding }: CityScreenProps) {
  const production = calculateTurnProduction(gameState);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
        <h2 className="text-2xl font-bold text-white">City Overview</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <Stat label="Population" value={`${gameState.city.population}/${gameState.city.populationCapacity}`} />
          <Stat label="Morale" value={`${gameState.city.morale}%`} />
          <Stat label="Turn" value={gameState.city.turn.toString()} />
          <Stat label="Buildings" value={gameState.buildings.length.toString()} />
        </div>
        <div className="mt-5 rounded-xl bg-slate-950/60 p-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">Projected Next Turn Production</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {resourceOrder.map((resource) => (
              <span key={resource} className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-200">
                +{production[resource]} {resourceLabels[resource]}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-white">Buildings</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {gameState.buildings.map((building) => (
            <BuildingPanel key={building.id} building={building} resources={gameState.resources} onUpgrade={onUpgradeBuilding} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-950/50 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-amber-100">{value}</p>
    </div>
  );
}
