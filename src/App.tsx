import React from "react";
import AccountData from "./components/AccountSection/AccountData";
import Menu from "./components/Menu/Menu";
import TasksSection from "./components/TasksSection/TasksSection";
import ModalCreateTask from "./components/Utilities/ModalTask";
import {Task} from "./interfaces";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {modalActions} from "./store/modules/Modal/Modal.store";
import {tasksActions} from "./store/modules/Task/Tasks.store";
import {TaskControllerService} from "@/services/requests/services/TaskControllerService";
import {TaskAddRequest} from "@/services/requests/models/TaskAddRequest";
import { Outlet } from "react-router-dom";
import {message} from "antd";


const App: React.FC = () =>
{
    const modal = useAppSelector((state) => state.modal);

    const dispatch = useAppDispatch();

    const closeModalCreateTask = () =>
    {
        dispatch(modalActions.closeModalCreateTask());
    };

    const createNewTaskHandler = async (task: Task) =>
    {
        try
        {
            const requestTaskBody: TaskAddRequest = {
                alarm: task.alarm,
                title: task.title,
                dir: task.dir,
                date: task.date,
                description: task.description,
                completed: task.completed,
                important: task.important,
            }
            const response = await TaskControllerService.addTasksUsingPOST(requestTaskBody);
            if (response && response.data)
            {
                dispatch(tasksActions.addNewTask({
                    id: response.data,
                    ...requestTaskBody
                } as Task));
                message.success("添加成功！！")
            }
        }
        catch (e: any)
        {
            message.error("添加失败！！");
        }
    };

    return (
        <div>

            <div
                className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">

                {modal.modalCreateTaskOpen && (
                    <ModalCreateTask
                        onClose={closeModalCreateTask}
                        nameForm="新建任务"
                        onConfirm={createNewTaskHandler}
                    />
                )}
                <Menu/>
                <TasksSection/>
                <AccountData/>
            </div>
        </div>
    );
};

export default App;
