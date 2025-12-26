import { Card, LinearProgress } from "@mui/material";

export default function ProgressCard() {
  return (
    <Card className="rounded-xl p-4 space-y-4">
      <h3 className="font-semibold">Recent Projects</h3>

      {["Automation Suite", "Manual Review", "Security Audit"].map(
        (name, i) => (
          <div key={name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{name}</span>
              <span>{[75, 50, 90][i]}%</span>
            </div>
            <LinearProgress
              variant="determinate"
              value={[75, 50, 90][i]}
            />
          </div>
        )
      )}
    </Card>
  );
}
