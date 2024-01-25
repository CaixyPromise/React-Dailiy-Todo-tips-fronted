import React from "react";
import {ReactComponent as IconBell} from "@/assets/bell.svg";
import {TaskControllerService} from "@/services/requests/services/TaskControllerService";
import {tasksActions} from "@/store/modules/Task/Tasks.store";
import {useAppDispatch} from "@/store/hooks";
import {message} from "antd";
import {NotificationManager} from "@/utils/NotificationManager";

export interface RemindProps
{
    taskId: string;
    taskRemind: boolean
    targetTime: number
    title: string
}

const BtnSettingRemind: React.FC<RemindProps> = ({ taskId, taskRemind, targetTime, title }) =>
{
    const dispatch = useAppDispatch();

    const registerReminder = async () =>
    {
        const result = new NotificationManager().registerNotification({
            taskId: taskId,
            eventTime: targetTime,
            title: title
        });
        if (!result)
        {
            throw new Error("注册提醒失败");
        }
        return "注册提醒成功; ";
    }

    const cancelReminder = async () =>
    {
        const result = new NotificationManager().cancelNotification(taskId);
        if (!result)
        {
            throw new Error("取消提醒失败");
        }
        return "取消提醒成功; ";
    }

    const updateTaskStatus = async () =>
    {
        await TaskControllerService.updateStatusUsingPOST({
            taskId: Number(taskId),
            status: 2
        });
        dispatch(tasksActions.toggleTaskNeedRemind(taskId));
    }

    const toggleTaskNeedRemindHandler = async () =>
    {
        let messageText = "提示: ";
        try
        {
            if (!taskRemind)
            {
                messageText += await registerReminder();
            }
            else
            {
                messageText += await cancelReminder();
            }
            await updateTaskStatus();
            messageText += "上传更新提醒状态成功";
            message.success(messageText);
        }
        catch (e)
        {
            message.error(`错误信息: 无法注册通知, 可能预定通知时间已过或没有通知权限`);
        }
    };
    return <>
        <button
            // ref={refBtnNotification}
            onClick={toggleTaskNeedRemindHandler}
            // className={`relative ${tasksToShow.length ? classHasNotification : ""}`}
            title="设置提醒事件"
        >
            <IconBell className="w-5 h-5 md:w-6 md:h-6"
                      style={{
                          fill: taskRemind ? "red" : "white",
                          borderColor: "black",
                          borderStyle: "solid",
                          border: "3px"
                      }}/>
        </button>
    </>
}

export default BtnSettingRemind;