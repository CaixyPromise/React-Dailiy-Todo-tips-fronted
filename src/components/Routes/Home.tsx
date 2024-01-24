import React, {useEffect} from "react";
import LayoutRoutes from "../Utilities/LayoutRoutes";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import {RootState} from "@/store";
import {TaskControllerService} from "@/services/requests/services/TaskControllerService";
import {tasksActions} from "@/store/modules/Task/Tasks.store";
import {TaskVO} from "@/services/requests/models/TaskVO";
import {Task} from "@/interfaces";
import {TaskDirectoriesVO} from "../../../generated";

const Home: React.FC = () =>
{
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const user = useAppSelector((state: RootState) => state.user.loginUser);
    const dispatch = useAppDispatch();
    const fetchTasks = async () =>
    {
        if (user && user.id)
        {
            // 获取任务列表
            const response = await TaskControllerService.fetchTasksUsingGET();
            if (response && response.data)
            {
                const convertedTasks: Task[] = response.data.tasks?.map(
                    (task: TaskVO) => ({
                        id: task.id?.toString() || 'unknown-id',
                        title: task.title || 'unknown-title',
                        dir: task.dir || 'unknown-dir',
                        description: task.description || 'unknown-description',
                        date: task.date || Date.now().toString(),
                        completed: task.completed || false,
                        important: task.important || false,
                        alarm: task.alarm || false
                    })
                ) || [];
                const convertedDirectories: string[] = []
                response.data.directories?.forEach(
                    (dir: TaskDirectoriesVO)=> {
                        // @ts-ignore
                        convertedDirectories.push(dir.name)
                    }
                )
                console.log("convertedTasks", convertedTasks);
                dispatch(tasksActions.addNewTaskArray(convertedTasks));
                dispatch(tasksActions.addNewDirectory(convertedDirectories));
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
