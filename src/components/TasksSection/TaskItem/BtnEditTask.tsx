import React, {useState} from "react";
import {useAppDispatch} from "@/store/hooks";
import {tasksActions} from "@/store/modules/Task/Tasks.store";
import ModalCreateTask from "../../Utilities/ModalTask";
import {ReactComponent as OptionsSvg} from "@/assets/options.svg";
import {DirectoriesItem, Task} from "@/interfaces";
import {TaskUpdateRequest} from "@/services/requests/models/TaskUpdateRequest";
import {TaskControllerService} from "@/services/requests/services/TaskControllerService";
import useDirectoryById from "@/components/hooks/useDirectoryById";
import {message} from "antd";

const BtnEditTask: React.FC<{
    task: Task
}> = ({ task }) =>
{
    const [ modalEditTaskOpen, setModalEditTaskOpen ] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const taskDirectory:DirectoriesItem = useDirectoryById(task.dir);
    const closeModalEditTask = () =>
    {
        setModalEditTaskOpen(false);
    };

    const openModalEditTask = () =>
    {
        setModalEditTaskOpen(true);
    };

    const editTaskHandler = async (task: Task) =>
    {
        try
        {
            const updatedTask: TaskUpdateRequest = {
                id: task.id,
                task: {
                    alarm: task.alarm,
                    title: task.title,
                    dir: task.dir,
                    date: task.date,
                    description: task.description,
                    completed: task.completed,
                    important: task.important,
                }
            }
            await TaskControllerService.updateTasksUsingPOST(updatedTask);
            message.success("任务已成功修改");
            dispatch(tasksActions.editTask(task));
        }
        catch (e: any)
        {
            message.error("任务修改失败，请稍后再试或检查参数是否正确");
            console.error(e)
        }
    };

    return (
        <>
            <button
                title="修改任务"
                className="transition w-7 sm:w-8 h-6 sm:h-8 grid place-items-center dark:hover:text-slate-200 hover:text-slate-700"
                onClick={openModalEditTask}
            >
                <OptionsSvg className="w-4 sm:w-5 h-4 sm:h-5"/>
            </button>
            {modalEditTaskOpen && (
                <ModalCreateTask
                    onClose={closeModalEditTask}
                    task={task}
                    nameForm="修改任务"
                    onConfirm={editTaskHandler}
                />
            )}
        </>
    );
};

export default BtnEditTask;
