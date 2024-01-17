import React from "react";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import useTodayTasks from "../hooks/useTodayTasks";
import LayoutRoutes from "../Utilities/LayoutRoutes";

const TodaysTasks: React.FC = () => {
  const todaysTasks = useTodayTasks();

  useDescriptionTitle("今日任务", "今日待办");

  return (
    <LayoutRoutes title="今日待办任务" tasks={todaysTasks}></LayoutRoutes>
  );
};

export default TodaysTasks;
