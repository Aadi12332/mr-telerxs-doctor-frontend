import { Card } from "@mui/material";

type Props = {
  title: string;
  value: string;
  color: string;
};

export default function StatCard({ title, value, color }: Props) {
  return (
    <Card className="rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-lg ${color}`} />
    </Card>
  );
}
