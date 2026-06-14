import { resourceLabels, resourceOrder } from '../types/resources';
import type { ResourceMap } from '../types/resources';

interface ResourceBarProps {
  resources: ResourceMap;
}

export function ResourceBar({ resources }: ResourceBarProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {resourceOrder.map((resource) => (
        <div key={resource} className="rounded-xl border border-amber-200/20 bg-slate-900/80 p-4 shadow-lg">
          <p className="text-xs uppercase tracking-wide text-amber-200/70">{resourceLabels[resource]}</p>
          <p className="mt-1 text-2xl font-bold text-amber-100">{resources[resource]}</p>
        </div>
      ))}
    </section>
  );
}
