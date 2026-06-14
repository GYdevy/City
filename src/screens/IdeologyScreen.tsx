export function IdeologyScreen() {
  return <Placeholder title="Ideology" description="Future policies, civic bonuses, and ideological paths will live here." />;
}

function Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <section className="rounded-2xl border border-dashed border-slate-600 bg-slate-900/60 p-8 text-center">
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-slate-400">{description}</p>
    </section>
  );
}
