import {Notification, NotificationTableType} from "./typings";

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
            alert("此浏览器不支持桌面通知");
            return false;
        }
        if (Notification.permission !== "granted")
        {
            // 我们需要请求用户的许可
            Notification.requestPermission().catch((error:any) =>
            {
                alert("无法获取通知权限，无法发送待办通知");
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
    private _deleteTask(taskId: string): void
    {
        //  清除定时器
        if (this.NotificationTable[taskId])
        {
            clearTimeout(this.NotificationTable[taskId])
        }
        // 删除定时器map里的定时器
        delete this.NotificationTable[taskId];
        // 删除任务id集合里的任务id
        this.TaskIdSet.delete(taskId)
        console.log("删除任务: " + taskId + "on: " + Date.now().toString())
    }

    /**
     * 注册任务
     * @param notifications 任务数组：批量注册
     * @author CAIXYPROMISE
     * @since 2024/1/25 17:16
     * @version 1.0
     */
    public registerNotificationAsArray(notifications: Notification[]): void
    {
        for (const notification of notifications)
        {
            this.registerNotification(notification);
        }
    }

    /**
     * 注册任务
     * @param notification 待注册任务
     * @author CAIXYPROMISE
     * @since 2024/1/25 17:16
     * @version 1.0
     */
    public registerNotification(notification: Notification): void
    {
        // 如果无法获得通知权限，则不进行通知
        // 如果任务已经被托管，则不进行通知
        // 如果时间已经过了，则不进行通知
        console.log(this.Permission)
        console.log(this.TaskIdSet)
        const currentTime = new Date().getTime();
        if (!this.Permission || this.TaskIdSet.has(notification.taskId) || notification.eventTime <= currentTime)
        {
            return;
        }
        // 注册通知的逻辑
        // 计算定时器需要的时间
        const delay = notification.eventTime - currentTime;
        // 然后用setTimeout来设置定时器
        this.NotificationTable[notification.taskId] = setTimeout(() =>
        {
            this.sendNotification(notification)
        }, delay);
        this.TaskIdSet.add(notification.taskId)
        console.log(this.TaskIdSet)
        console.log("register notification taskId: " + notification.taskId + "on delay: " + delay)
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
        this._deleteTask(notification.taskId);
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

export default Index;