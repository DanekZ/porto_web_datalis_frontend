export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="p-6 rounded-xl border backdrop-blur-sm animate-pulse bg-slate-800/50 border-slate-700/50">
          <div className="mb-6 h-48 rounded-lg bg-slate-700"></div>
          <div className="mb-3 h-6 rounded bg-slate-700"></div>
          <div className="mb-4 h-4 rounded bg-slate-700"></div>
          <div className="flex gap-2 mb-6">
            <div className="w-16 h-6 rounded-full bg-slate-700"></div>
            <div className="w-20 h-6 rounded-full bg-slate-700"></div>
          </div>
          <div className="h-10 rounded bg-slate-700"></div>
        </div>
      ))}
    </div>
  );
}
