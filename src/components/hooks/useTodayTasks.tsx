import {useState, useEffect} from "react";
import {Task} from "../../interfaces";
import {useAppSelector} from "@/store/hooks";

const useTodayTasks = (): Task[] =>
{
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);

    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = todayDate.getMonth() + 1; // 月份是从0开始的
    const day = todayDate.getDate();

    // 格式化今天的日期为 YYYY-MM-DD 格式
    const todayDateFormat = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

    useEffect(() =>
    {
        const filteredTasks = tasks.filter((task: Task) =>
        {
            // 假设 task.date 包含时间，我们需要提取日期部分
            const taskDate = task.date.split("T")[0];
            return taskDate === todayDateFormat;
        });
        setTodaysTasks(filteredTasks);
    }, [todayDateFormat, tasks]);

    return todaysTasks;
};


export default useTodayTasks;
