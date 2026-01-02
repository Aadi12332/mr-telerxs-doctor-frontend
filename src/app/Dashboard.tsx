import StatsOverview from "../components/cards/StatCard";
import UsedDeliveryGraph from "../components/cards/UsedDeliveryGraph";
import PlannedVsActualChart from "../components/charts/PlannedVsActualChart";
import ResourceUtilizationDistribution from "../components/charts/ResourceUtilizationDistribution";
import SafetyCompliance from "../components/tables/SafetyCompliance";
import RecentProjects from "../components/projects/RecentProjects";
import UrgentTasks from "../components/tasks/UrgentTasks";
import ExportIcon  from "../assets/exportIcon.svg";
import ProjectFilters from "../components/projects/ProjectFilters";
import DelayComaprisonGraph from "../components/cards/DelayComaprisonGraph";
import DelayProgress from "../components/tables/DelayProgress";
import InfoIcon from "../assets/InfoIcon.svg";
import type {StatItem} from "../components/cards/StatCard";
import FolderIcon from "../assets/activeproject.svg";
import MoneyIcon from "../assets/completionicon.svg";
import BoxIcon from "../assets/pendingmaterialicon.svg";
import ShieldIcon from "../assets/safetyscoreicon.svg";

const stats: StatItem[] = [
  {
    key: "activeProjects",
    title: "Active Projects",
    value: 12,
    icon: FolderIcon,
  },
  {
    key: "completionRate",
    title: "Completion Rate",
    value: "78%",
    icon: MoneyIcon,
  },
  {
    key: "pendingMaterials",
    title: "Pending Materials",
    value: 8, 
    icon: BoxIcon,
  },
  {
    key: "safetyScore",
    title: "Safety Score",
    value: "95%",
    icon: ShieldIcon,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex sm:flex-row flex-col sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-[#111827] lg:text-[30px] text-[24px] font-bold mb-2 leading-[36px]">Dashboard Overview</h1>
            <p className="text-[#4B5563] lg:text-[16px] text-[14px]">Construction Department Performance</p>
          </div>
          <div>
            <button className="bg-[#2563EB] h-[42px] gap-2 text-[16px] flex justify-center items-center text-white px-4 py-2 rounded-[8px]">
              <img src={ExportIcon} alt="" />
              Export Report</button>
          </div>
        </div>
        <StatsOverview
          stats={stats}
          showActions
        />
      </div>

      <ProjectFilters />

      <RecentProjects />

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        <UrgentTasks />
        <PlannedVsActualChart />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        <UsedDeliveryGraph />
        <DelayComaprisonGraph />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        <SafetyCompliance />
        <DelayProgress />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        <ResourceUtilizationDistribution />
      </div>

      <div className="w-full rounded-[8px] border border-[#BFDBFE] bg-[#EFF6FF] px-5 py-4 flex items-center gap-3">
          <div className="flex-shrink-0">
            <img src={InfoIcon} alt="" />
          </div>

          <p className="text-[14px] text-[#1D4ED8]">
            Dashboard automatically refreshes every 30 seconds. Data is sourced
            from live project management systems.
          </p>
      </div>
      </div>
  );
}
