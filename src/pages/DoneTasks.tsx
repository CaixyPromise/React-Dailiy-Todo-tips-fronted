import React from "react";
import { useAppSelector } from "@/store/hooks";
import useCompletedTasks from "../components/hooks/useCompletedTasks";
import useDescriptionTitle from "../components/hooks/useDescriptionTitle";
import LayoutRoutes from "../components/Utilities/LayoutRoutes";

const DoneTasks: React.FC<{ done: boolean; title: string }> = ({
  done,
  title,
}) => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const { tasks: tasksFiltered } = useCompletedTasks({ tasks, done });

  useDescriptionTitle("全部任务完成:)", title);

  return <LayoutRoutes title={title} tasks={tasksFiltered}></LayoutRoutes>;
};

export default DoneTasks;
