import React, {useState} from "react";
import {useAppDispatch} from "@/store/hooks";
import {tasksActions} from "@/store/modules/Task/Tasks.store";
import ModalConfirm from "../../Utilities/ModalConfirm";
import {ReactComponent as Trash} from "@/assets/trash.svg";
import {TaskControllerService} from "@/services/requests/services/TaskControllerService";
import {message} from "antd";

const BtnDeleteTask: React.FC<{ taskId: string }> = ({ taskId }) =>
{
    const [ showModal, setIsModalShown ] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const removeTaskHandler = () =>
    {
        try
        {
            TaskControllerService.deleteTasksUsingPOST({ id: Number(taskId) })
            dispatch(tasksActions.removeTask(taskId));
            message.success("删除任务成功")
        }
        catch (e: any)
        {
            message.error("删除任务失败");
        }
    };
    return (
        <>
            {showModal && (
                <ModalConfirm
                    onClose={() => setIsModalShown(false)}
                    text="该任务将被永久删除。"
                    onConfirm={removeTaskHandler}
                />
            )}
            <button
                onClick={() => setIsModalShown(true)}
                title="删除任务"
                className="ml-2 transition hover:text-slate-700 dark:hover:text-slate-200"
            >
                <Trash className="w-5 h-5 sm:w-6 sm:h-6"/>
            </button>
        </>
    );
};

export default React.memo(BtnDeleteTask);
