import { Card } from "@mui/material";

export default function TaskList() {
  return (
    <Card className="rounded-xl p-4 space-y-3">
      <h3 className="font-semibold">Urgent Tasks</h3>
      {["Inspection", "Manual Delivery", "Safety Audit"].map((task) => (
        <div key={task} className="flex justify-between text-sm">
          <span>{task}</span>
          <span className="text-red-500">High</span>
        </div>
      ))}
    </Card>
  );
}
