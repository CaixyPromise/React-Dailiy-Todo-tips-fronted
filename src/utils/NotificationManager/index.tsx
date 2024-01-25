// import {NotificationTableType, Notification} from "./typings";

import {message} from "antd";
import boolean from "async-validator/dist-types/validator/boolean";
import {bool} from "prop-types";

export interface NotificationTableType
{
    [key: string]: NodeJS.Timeout;
}

// 提醒任务的结构定义
export interface Notification
{
    taskId: string;  // 任务ID
    eventTime: number;  // 任务触发时间，格式为 "YYYY-MM-DD HH:mm:ss"
    title: string; // 任务标题
    iconUrl?: string; // 任务图标URL，用于在通知中心显示
    linkUrl?: string; // 任务关联链接，点击可跳转
    content?: string; // 任务详细内容，用于在通知中心显示
    callback?: () => void; // 任务完成后的回调函数
}

// 通知中心管理的通知项结构定义
export interface NotificationItem
{
    taskId: string;  // 任务ID
    eventTimeFormatted: string;  // 格式化后的任务触发时间
    eventDateTime: Date;  // 任务触发时间（Date对象）
    eventId: string;  // 通知ID
    title: string;  // 通知标题
    type: string;  // 事件类型，如 "任务完成"、"任务失败"
    status?: string;  // 事件状态，如 "已读"、"未读"
    iconUrl?: string;  // 事件图标URL，用于在通知中心显示
    linkUrl?: string;  // 事件关联链接，点击可跳转
    content: string;  // 事件详细内容
    isNotified?: boolean;  // 是否已向用户发送了通知
}


function Singleton<T extends { new(...args: any[]): {} }>(constructor: T)
{
    return class extends constructor
    {
        private static _instance: T;
        constructor(...args: any[])
        {
            super(...args);
            if (!(constructor as any)._instance)
            {
                (constructor as any)._instance = this;
            }
            return (constructor as any)._instance;
        }
    } as unknown as T & { _instance: T };
}

@Singleton
class Index
{
    /**
     * 是否通知权限标志位
     * */
    private readonly Permission: boolean = false;
    /**
     *  通知定时器table: 任务id -> 定时器id
     */
    private NotificationTable: NotificationTableType = {}
    /**
     * 任务id集合，用于管理任务是否被托管
     * */
    private TaskIdSet: Set<string> = new Set<string>()

    // region 通知功能初始化
    constructor()
    {
        this.Permission = this._checkNotificationPermission()
    }

    private _checkNotificationPermission(): boolean
    {
        if (!("Notification" in window))
        {
            // 检查浏览器是否支持桌面通知
            message.error("此浏览器不支持桌面通知");
            return false;
        }
        if (Notification.permission !== "granted")
        {
            // 我们需要请求用户的许可
            Notification.requestPermission().catch((error:any) =>
            {
                message.error("无法获取通知权限，无法发送待办通知");
            });
            return false;
        }
        return true;
    }

    // endregion
    // region 任务注册与销毁
    /**
     * 删除任务
     * @param taskId 任务id
     * @author CAIXYPROMISE
     * @since 2024/1/25 17:15
     * @version 1.0
     */
    public cancelNotification(taskId: string): boolean
    {
        //  清除定时器
        if (this.NotificationTable[taskId])
        {
            clearTimeout(this.NotificationTable[taskId])
            // 删除定时器map里的定时器
            delete this.NotificationTable[taskId];
            // 删除任务id集合里的任务id
            this.TaskIdSet.delete(taskId)
            return true
        }
        else {
            return false
        }
    }

    /**
     * 注册任务
     * @param notifications 任务数组：批量注册
     * @author CAIXYPROMISE
     * @since 2024/1/25 17:16
     * @version 1.0
     */
    public registerNotificationAsArray(notifications: Notification[]): boolean
    {

        for (const notification of notifications)
        {
            const result: boolean = this.registerNotification(notification);
            if (!result)
            {
                return false;
            }
        }
        return true;
    }

    /**
     * 注册任务
     * @param notification 待注册任务
     * @author CAIXYPROMISE
     * @since 2024/1/25 17:16
     * @version 1.0
     */
    public registerNotification(notification: Notification): boolean
    {
        // 如果无法获得通知权限，则不进行通知
        // 如果任务已经被托管，则不进行通知
        // 如果时间已经过了，则不进行通知
        const currentTime = new Date().getTime();
        if (!this.Permission || this.TaskIdSet.has(notification.taskId) || notification.eventTime <= currentTime)
        {
            // message.error("错误: 无法注册通知, 可能通知时间已过或没有通知权限")
            return false;
        }
        // 注册通知的逻辑
        // 计算定时器需要的时间
        const delay = notification.eventTime - currentTime;
        // 然后用setTimeout来设置定时器
        this.NotificationTable[notification.taskId] = setTimeout(() =>
        {
            this.sendNotification(notification);
        }, delay);
        this.TaskIdSet.add(notification.taskId);
        console.log(this.TaskIdSet);
        console.log("register notification taskId: " + notification.taskId + "on delay: " + delay);
        return true;
        // 注意：settimeout的回调函数的this指向的是window，所以需要用bind来绑定this
    }
    // endregion

    // region 任务发送逻辑
    /**
     * 发送通知方法
     *
     * @author CAIXYPROMISE
     * @since 2024/1/25 17:17
     * @version 1.0
     */
    public sendNotification(notification: Notification): void
    {
        const notice = new Notification(`待办提醒-${notification.title}`, {
            body: notification.content ? notification.content :
                "Todo-Remind: 你有一条任务待办到达了提醒时间, 点击查看详情:)",
            icon: notification.iconUrl ? notification.iconUrl : "/favicon.ico",
            lang: "zh-CN",
            tag: `待办提醒-${notification.title}`,
            // requireInteraction: true
        });
        // 当用户点击通知时触发。
        notice.onclick = () =>
        {
            this.notificationCallback(notification)
        };
        // 当通知显示给用户时触发。
        notice.onshow = () =>
        {
            // todo: 实现发送后端（已提醒）的逻辑
        }
        // 当通知发生错误（如无法显示）时触发。
        notice.onerror = () =>
        {
            // todo: 实现发送后端（提醒失败）的逻辑
        }
        // 当通知被关闭时触发，无论是自动关闭还是用户手动关闭。
        notice.onclose = () =>
        {
            //  todo: 实现发送后端（已关闭）的逻辑
        }
        // 注意：这里需要手动删除定时器，否则定时器会一直存在
        this.cancelNotification(notification.taskId);
    }

    // 任务响应回调函数
    private notificationCallback(notification: Notification): void
    {
        // 执行通知的回调函数
        try
        {
            if (notification.callback)
            {
                notification.callback();
            }
            else
            {
                window.open(notification.linkUrl ? notification.linkUrl : "/");
            }
        }
        catch (error: any)
        {
            console.error(error);
        }
    }

    // endregion
}

export  {
    Index as NotificationManager
};