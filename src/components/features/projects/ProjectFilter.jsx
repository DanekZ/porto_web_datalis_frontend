export default function ProjectFilter({ activeFilter, onFilterChange, projectCounts }) {
  const filteredOptions = [
    { id: "all",  label: "All Projects",    count: projectCounts.all  },
    { id: "web",  label: "Web Development", count: projectCounts.web  },
    { id: "data", label: "Data Analytics",  count: projectCounts.data },
  ];

  return (
    <div className="mb-10">
      <div className="flex flex-wrap gap-3 justify-center">
        {filteredOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onFilterChange(option.id)}
            className={`cursor-pointer px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeFilter === option.id
                ? "bg-blue-600 border-blue-500 text-white"
                : "bg-transparent border-[#2d2d2d] text-[#737373] hover:border-[#404040] hover:text-white"
            }`}
          >
            {option.label}
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
              activeFilter === option.id
                ? "bg-blue-700 text-blue-200"
                : "bg-[#262626] text-[#737373]"
            }`}>
              {option.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}