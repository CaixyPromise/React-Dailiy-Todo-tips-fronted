import React from "react";
import {useAppDispatch} from "@/store/hooks";
import {tasksActions} from "@/store/modules/Task/Tasks.store";
import {ReactComponent as StarLine} from "@/assets/star-line.svg";
import {TaskControllerService} from "@/services/requests/services/TaskControllerService";

const BtnMarkAsImportant: React.FC<{
    taskId: string;
    taskImportant: boolean;
}> = ({ taskId, taskImportant }) =>
{
    const dispatch = useAppDispatch();

    // 标记为重要任务
    const markAsImportantHandler = () =>
    {
        try
        {
            TaskControllerService.updateStatusUsingPOST({
                taskId: Number(taskId),
                status: 1
            });
            dispatch(tasksActions.markAsImportant(taskId));
        }
        catch (e: any)
        {
            console.error(e);
        }
    };

    return (
        <button
            title={taskImportant ? "取消标记为重要任务" : "标记为重要任务"}
            onClick={markAsImportantHandler}
            className="transition hover:text-slate-700 dark:hover:text-slate-200 ml-auto"
        >
            <StarLine
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    taskImportant ? "fill-rose-500 stroke-rose-500 " : "fill-none"
                }`}
            />
        </button>
    );
};

export default React.memo(BtnMarkAsImportant);
