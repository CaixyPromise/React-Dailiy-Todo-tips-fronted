import React from "react";
import { Outlet } from "react-router-dom";
import {Navigate, Route, Routes} from "react-router-dom";
import Directory from "../Routes/Directory";
import DoneTasks from "../Routes/DoneTasks";
import Home from "../Routes/Home";
import ImportantTasks from "../Routes/ImportantTasks";
import SearchResults from "../Routes/SearchResults";
import TaskOnly from "../Routes/TaskOnly";
import TodaysTasks from "../Routes/TodaysTasks";
import HeaderTasks from "./HeaderTasks";


const TasksSection: React.FC = () =>
{
    return (
        <main className=" pt-5 pb-8 sm:pb-16 px-3 md:px-8 md:w-full xl:w-8/12 m-auto min-h-screen">
            <HeaderTasks/>
            <Outlet />
        </main>
    );
};

export default TasksSection;
