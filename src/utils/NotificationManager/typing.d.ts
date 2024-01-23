export interface NotificationTableType
{
    [key: string]: Timeout;
}

// 提醒任务的结构定义
export interface Notification
{
    taskId: string;  // 任务ID
    eventTime: string;  // 任务触发时间，格式为 "YYYY-MM-DD HH:mm:ss"
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
    priority?: string;  // 事件优先级，如 "高"、"中"、"低"
    iconUrl?: string;  // 事件图标URL，用于在通知中心显示
    linkUrl?: string;  // 事件关联链接，点击可跳转
    content: string;  // 事件详细内容
    isNotified?: boolean;  // 是否已向用户发送了通知
}
