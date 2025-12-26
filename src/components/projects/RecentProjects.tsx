export default function RecentProjects() {
  return (
    <div className="bg-white rounded-xl p-4 border-2 border-blue-400">
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">Recent Projects</h3>
        <span className="text-blue-600 text-sm">View All</span>
      </div>

      {[
        { name: "Automation Suite Setup", progress: 85 },
        { name: "Residential Tower A", progress: 55 },
        { name: "Shopping Mall Renovation", progress: 90 },
      ].map((p) => (
        <div key={p.name} className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{p.name}</span>
            <span>{p.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{ width: `${p.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
