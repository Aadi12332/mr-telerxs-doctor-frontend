export default function UrgentTasks() {
  return (
    <div className="bg-white rounded-xl p-4">
      <h3 className="font-semibold mb-3">Urgent Tasks</h3>
      {[
        "Foundation Inspection",
        "Manual Delivery",
        "Safety Audit",
      ].map((task) => (
        <div
          key={task}
          className="flex justify-between text-sm py-2 border-b last:border-0"
        >
          <span>{task}</span>
          <span className="text-red-500">High</span>
        </div>
      ))}
    </div>
  );
}
