import React, {useEffect, useState} from "react";
import {Task} from "@/interfaces";
import {useAppSelector} from "@/store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";

const ImportantTasks: React.FC = () =>
{
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const [ importantTasks, setImportantTasks ] = useState<Task[]>([]);

    useEffect(() =>
    {
        const filteredTasks: Task[] = tasks.filter((task: Task) => task.important);
        setImportantTasks(filteredTasks);
    }, [ tasks ]);

    useDescriptionTitle("Tasks marked as important", "重要任务");

    return (
        <LayoutRoutes title="重要任务" tasks={importantTasks}></LayoutRoutes>
    );
};

export default ImportantTasks;
