import React, { useState } from "react";
import DailyLogModel from "../dailyLogModel";
import NewTaskModel from "../newTaskModel";
import RightCheckIcon from "../../assets/RightTickIcon";
type TaskPriority = "High" | "Medium" | "Low";

type Task = {
  id: string;
  title: string;
  project: string;
  description: string;
  priority: TaskPriority;
  due?: string;
  assignee: string;
  progress?: number;
};

const tasks: {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
} = {
  todo: [
    {
      id: "1",
      title: "Steel Frame Installation",
      project: "Downtown Office Complex",
      description: "Install steel frame structure for floors 1-5",
      priority: "High",
      due: "2024-02-15",
      assignee: "Sarah Wilson",
    },
  ],

  inProgress: [
    {
      id: "2",
      title: "Steel Frame Installation",
      project: "Downtown Office Complex",
      description:
        "Complete excavation for building foundation according to architectural plans",
      priority: "High",
      due: "2024-02-15",
      assignee: "Sarah Wilson",
      progress: 75,
    },
    {
      id: "3",
      title: "Plumbing Installation",
      project: "Residential Tower A",
      description: "Install plumbing systems for residential units",
      priority: "Medium",
      due: "2024-02-15",
      assignee: "Sarah Wilson",
      progress: 75,
    },
  ],

  done: [
    {
      id: "4",
      title: "Electrical Wiring - Floor 1",
      project: "Residential Tower A",
      description:
        "Complete electrical wiring installation for first floor units",
      priority: "Low",
      due: "NA",
      assignee: "Robert Chen",
    },
  ],
};

const priorityStyles: Record<TaskPriority, string> = {
  High: "bg-red-100 text-red-500",
  Medium: "bg-yellow-100 text-yellow-600",
  Low: "bg-green-100 text-green-600",
};

export default function TaskBoard() {
    const [openDailyLogModel, setDailyLogModel] = useState(false);
    const [openNewTaskModel, setNewTaskModel] = useState(false);
  
  return (
    <div className="bg-white rounded-[8px] lg:p-6 p-3 border border-[#F3F4F6]
      shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex sm:flex-row flex-col gap-3 sm:justify-between sm:items-center mb-6">
        <h2 className="text-[17px] font-semibold">Task Board</h2>
        <div className="flex gap-4">
          <button onClick={() => setDailyLogModel(true)} className="bg-[#3AB449] text-white px-6 py-2 rounded-[8px] text-[16px] font-normal">
            Daily Work Log
          </button>
          <button onClick={() => setNewTaskModel(true)} className="bg-[#2563EB] text-white px-6 py-2 rounded-[8px] text-[16px] font-normal">
            Add Task
          </button>
          <DailyLogModel
            open={openDailyLogModel}
            onClose={() => setDailyLogModel(false)}
          />
          <NewTaskModel
            open={openNewTaskModel}
            onClose={() => setNewTaskModel(false)}
          />
        </div>
      </div>

      <div className="overflow-auto scroll-hide w-[calc(100vw-50px)] lg:w-[calc(100vw-388px)]">
        <div className="grid grid-cols-3 lg:gap-6 gap-3 min-w-[800px]">
          <Column title={`To Do (${tasks.todo.length})`} bg="bg-[#F9FAFB]">
            {tasks.todo.map(renderTask)}
          </Column>

          <Column
            title={`In Progress (${tasks.inProgress.length})`}
            bg="bg-[#EFF6FF]"
          >
            {tasks.inProgress.map(renderTask)}
          </Column>

          <Column title={`Done (${tasks.done.length})`} bg="bg-[#F0FDF4]">
            {tasks.done.map(renderTask)}
          </Column>
        </div>
      </div>
    </div>
  );
}

function renderTask(task: Task) {
  return (
    <div key={task.id} className="bg-white rounded-xl p-4 shadow-sm mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-[14px] text-[#111827]">{task.title}</h3>
        {
          task.due !== "NA" ?
          <span
            className={`px-3 py-1 rounded-full text-sm ${priorityStyles[task.priority]}`}
          >
            {task.priority}
          </span> :
          <>
            <RightCheckIcon />
          </>
        }
      </div>

      <p className="text-[#6B7280] text-xs mb-2">{task.project}</p>
      <p className="text-[#6B7280] text-xs mb-4">{task.description}</p>

      {typeof task.progress === "number" && (
        <>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded mb-3">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </>
      )}

      <div className="flex justify-between text-xs ">
        <span className="text-[#6B7280]">
          {task.due && task.due !== "NA" ? `Due ${task.due}` : "Completed"}
        </span>

        <span className="text-[#000000]">{task.assignee}</span>
      </div>
    </div>
  );
}

function Column({
  title,
  bg,
  children,
}: {
  title: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`${bg} rounded-[8px] p-4 min-h-[600px]`}>
      <h3 className="font-semibold mb-4 text-sm text-[#111827]">{title}</h3>
      {children}
    </div>
  );
}
