import React from "react";
import useDescriptionTitle from "../components/hooks/useDescriptionTitle";
import useTodayTasks from "../components/hooks/useTodayTasks";
import LayoutRoutes from "../components/Utilities/LayoutRoutes";

const TodaysTasks: React.FC = () => {
  const todaysTasks = useTodayTasks();

  useDescriptionTitle("今日任务", "今日待办");

  return (
    <LayoutRoutes title="今日待办任务" tasks={todaysTasks}></LayoutRoutes>
  );
};

export default TodaysTasks;
