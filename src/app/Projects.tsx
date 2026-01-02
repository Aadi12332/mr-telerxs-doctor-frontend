import StatsOverview from "../components/cards/StatCard";
import type {StatItem} from "../components/cards/StatCard";
import ProjectsTable from "../components/common/Table";
import type {Project} from "../components/common/Table";
import FolderIcon from "../assets/activeproject.svg";
import MoneyIcon from "../assets/completionicon.svg";
import BoxIcon from "../assets/pendingmaterialicon.svg";
import ShieldIcon from "../assets/safetyscoreicon.svg";

const stats: StatItem[] = [
  {
    key: "activeProjects",
    title: "Total Projects",
    value: 12,
    icon: FolderIcon,
  },
  {
    key: "completionRate",
    title: "Active",
    value: 9,
    icon: MoneyIcon,
  },
  {
    key: "pendingMaterials",
    title: "Upcoming",
    value: 8,
    icon: BoxIcon,
  },
  {
    key: "safetyScore",
    title: "Completed",
    value: 1,
    icon: ShieldIcon,
  },
];

const projectsData: Project[] = [
  {
    id: "1",
    name: "Downtown Office Complex",
    code: "PRJ-001",
    client: "Metro Corp",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    progress: 65,
    status: "Active",
    team: [
      { role: "Engineer", name: "Mike Johnson" },
      { role: "Supervisor", name: "Sarah Wilson" },
      { role: "Labour", name: "Team Alpha" },
    ],
  },
  {
    id: "2",
    name: "Residential Tower A",
    code: "PRJ-002",
    client: "Urban Builders",
    startDate: "2024-02-01",
    endDate: "2024-09-15",
    progress: 48,
    status: "Active",
    team: [
      { role: "Engineer", name: "David Lee" },
      { role: "Supervisor", name: "Emma Brown" },
      { role: "Labour", name: "Team Beta" },
    ],
  },
  {
    id: "3",
    name: "Shopping Mall Renovation",
    code: "PRJ-003",
    client: "Retail Group",
    startDate: "2023-11-10",
    endDate: "2024-04-20",
    progress: 82,
    status: "Completed",
    team: [
      { role: "Engineer", name: "Chris Martin" },
      { role: "Supervisor", name: "Laura White" },
      { role: "Labour", name: "Team Gamma" },
    ],
  },
  {
    id: "4",
    name: "Industrial Warehouse",
    code: "PRJ-004",
    client: "LogiTech Ltd",
    startDate: "2024-03-05",
    endDate: "2024-12-10",
    progress: 30,
    status: "On Hold",
    team: [
      { role: "Engineer", name: "Andrew Scott" },
      { role: "Supervisor", name: "Natalie Green" },
      { role: "Labour", name: "Team Delta" },
    ],
  },
];


export default function Projects() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-8">
            <h1 className="text-[#111827] lg:text-[30px] text-[24px] font-bold mb-2 leading-[36px]">Projects and Calendar</h1>
            <p className="text-[#4B5563] lg:text-[16px] text-[14px]">Construction Department Performance</p>
        </div>
        <StatsOverview
          stats={stats}
        />
      </div>
      <ProjectsTable projects={projectsData} />
    </div>
  );
}
