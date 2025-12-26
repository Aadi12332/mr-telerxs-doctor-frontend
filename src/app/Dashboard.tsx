import StatCard from "../components/cards/StatCard";
import ProgressCard from "../components/cards/ProgressCard";
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import DonutChart from "../components/charts/DonutChart";
import TaskList from "../components/tables/TaskList";
import { stats } from "../data/dashboard.data";
import RecentProjects from "../components/projects/RecentProjects";
import UrgentTasks from "../components/tasks/UrgentTasks";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>
      <RecentProjects />
      <UrgentTasks />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl p-4">
          <LineChart />
        </div>
        <ProgressCard />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <TaskList />
        <BarChart />
        <DonutChart />
      </div>
    </div>
  );
}
