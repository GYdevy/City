import type { ReactNode } from 'react';
import { ResourceBar } from './ResourceBar';
import type { GameState } from '../types/city';

export type TabId = 'city' | 'ideology' | 'army' | 'battlePlanner';

const tabs: { id: TabId; label: string }[] = [
  { id: 'city', label: 'City' },
  { id: 'ideology', label: 'Ideology' },
  { id: 'army', label: 'Army' },
  { id: 'battlePlanner', label: 'Battle Planner' },
];

interface LayoutProps {
  activeTab: TabId;
  children: ReactNode;
  gameState: GameState;
  onChangeTab: (tab: TabId) => void;
  onNextTurn: () => void;
  onResetSave: () => void;
}

export function Layout({ activeTab, children, gameState, onChangeTab, onNextTurn, onResetSave }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-stone-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-amber-200/20 bg-slate-900/80 p-6 shadow-2xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-amber-300/80">Island Polis</p>
              <h1 className="mt-2 text-4xl font-black text-white">City Strategy MVP</h1>
              <p className="mt-2 text-slate-400">Turn {gameState.city.turn} · Population {gameState.city.population}/{gameState.city.populationCapacity} · Morale {gameState.city.morale}%</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 hover:bg-emerald-400" onClick={onNextTurn} type="button">
                Next Turn
              </button>
              <button className="rounded-xl border border-red-400/50 px-5 py-3 font-bold text-red-200 hover:bg-red-500/10" onClick={onResetSave} type="button">
                Reset Save
              </button>
            </div>
          </div>

          <nav className="mt-6 flex flex-wrap gap-2 border-t border-slate-700 pt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab.id ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                onClick={() => onChangeTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        <ResourceBar resources={gameState.resources} />
        <main>{children}</main>
      </div>
    </div>
  );
}
