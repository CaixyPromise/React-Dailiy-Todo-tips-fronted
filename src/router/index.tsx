import {createBrowserRouter, Navigate} from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import RequiredLogin from "../components/CheckLogin";
import App from "../App";
import Directory from "@/pages/Directory";
import TaskOnly from "@/pages/TaskOnly";
import SearchResults from "@/pages/SearchResults";
import DoneTasks from "@/pages/DoneTasks";
import React from "react";
import TodaysTasks from "@/pages/TodaysTasks";
import ImportantTasks from "@/pages/ImportantTasks";
import Home from "@/pages/Home";


const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginForm/>
    },
    {
        path: "/",
        element: <RequiredLogin children={<App/>}/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "home",
                element: <Home/>
            },
            {
                path: "today",
                element: <TodaysTasks/>
            },
            {
                path: "important",
                element: <ImportantTasks/>
            },
            {
                path: "completed",
                element: <DoneTasks done={true} title="已完成任务列表"/>
            },
            {
                path: "uncompleted",
                element: <DoneTasks done={false} title="未完成任务列表"/>
            },
            {
                path: "results",
                element: <SearchResults/>
            },
            {
                path: "dir/:dir",
                element: <Directory/>
            },
            {
                path: "task/:taskId",
                element: <TaskOnly/>
            },
        ]
    }
])


export default router;