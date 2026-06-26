export default function Loading({ className = "" }) {
  if (!className) {
    className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
  }

  return (
    <div
      className={`${className}`}
    >
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="p-6 border rounded-xl backdrop-blur-sm animate-pulse bg-slate-800/50 border-slate-700/50"
        >
          <div className="h-48 mb-6 rounded-lg bg-slate-700"></div>
          <div className="h-6 mb-3 rounded bg-slate-700"></div>
          <div className="h-4 mb-4 rounded bg-slate-700"></div>

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