import React, {useEffect} from "react";
import LayoutRoutes from "../Utilities/LayoutRoutes";
import {useAppSelector} from "@/store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import {RootState} from "@/store";
import {TaskControllerService} from "@/services/requests/services/TaskControllerService";

const Home: React.FC = () =>
{
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const user = useAppSelector((state: RootState) => state.user.loginUser);
    const fetchTasks = async () =>
    {
        if (user && user.id)
        {
            // 获取任务列表
            const response = await TaskControllerService.fetchTasksUsingGET();
            if (response && response.data)
            {
                console.log(response.data)
            }
        }
    }

    useEffect(() =>
    {
        fetchTasks();
    }, []);
    useDescriptionTitle("Organize your tasks", "All tasks");
    return <LayoutRoutes title="全部任务" tasks={tasks}></LayoutRoutes>;
};

export default Home;
