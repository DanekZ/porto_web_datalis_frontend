export default function ProjectFilter({ activeFilter, onFilterChange, projectCounts }) {
  const filteredOptions = [
    {
      id: "all",
      label: "All Projects",
      count: projectCounts.all,
    },
    {
      id: "web",
      label: "Web Development",
      count: projectCounts.web,
    },
    {
      id: "data",
      label: "Data Science",
      count: projectCounts.data,
    },
  ];

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-4 justify-center">
        {filteredOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onFilterChange(option.id)}
            className={`cursor-pointer px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 ${
              activeFilter == option.id ? "bg-blue-600 text-white border-blue-600" : "border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
            }`}
          >
            <span>{option.label}</span>
            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${activeFilter === option.id ? "bg-blue-500 text-white" : "bg-slate-600 text-slate-300"}`}>{option.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
