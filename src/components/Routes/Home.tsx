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
// import {Notification} from "@/utils/Index/typings";
import {NotificationManager} from "@/utils/NotificationManager";

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
                const convertedTasks: Task[] = [];
                const needAlarmSet: Array<{
                    taskId: string;  // 任务ID
                    eventTime: number;  // 任务触发时间，格式为 "YYYY-MM-DD HH:mm:ss"
                    title: string; // 任务标题
                    iconUrl?: string; // 任务图标URL，用于在通知中心显示
                    linkUrl?: string; // 任务关联链接，点击可跳转
                    content?: string; // 任务详细内容，用于在通知中心显示
                    callback?: () => void; // 任务完成后的回调函数
                }> = [];
                response.data.tasks?.forEach(
                    (task: TaskVO) =>
                    {
                        const taskItem = {
                            id: task.id?.toString() || 'unknown-id',
                            title: task.title || 'unknown-title',
                            dir: task.dir || 'unknown-dir',
                            description: task.description || 'unknown-description',
                            date: task.date || Date.now().toString(),
                            completed: task.completed || false,
                            important: task.important || false,
                            alarm: task.alarm || false
                        }
                        convertedTasks.push(taskItem)
                        //  设置提醒: 如果需要提醒且当前时间大于任务触发时间，则设置提醒
                        const targetTime =
                            new Date(taskItem.date).getTime();
                        if (task.alarm && targetTime < Date.now())
                        {
                            needAlarmSet.push({
                                taskId: taskItem.id,
                                eventTime: targetTime,
                                title: taskItem.title,
                                content: taskItem.description
                            })
                        }
                    }
                );
                const convertedDirectories: string[] = []
                response.data.directories?.forEach(
                    (dir: TaskDirectoriesVO) =>
                    {
                        // @ts-ignore
                        convertedDirectories.push(dir.name)
                    }
                )
                const notifications = new NotificationManager();
                notifications.registerNotificationAsArray(needAlarmSet);
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
