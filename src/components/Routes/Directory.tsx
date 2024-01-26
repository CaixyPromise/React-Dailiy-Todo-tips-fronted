import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {DirectoriesItem, Task} from "@/interfaces";
import {useAppSelector} from "@/store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";
import useDirectoryById from "@/components/hooks/useDirectoryById";

const Directory: React.FC = () =>
{
    const tasks:Task[] = useAppSelector((state) => state.tasks.tasks);
    const directories: DirectoriesItem[] = useAppSelector((state) => state.tasks.directories);
    const params = useParams();
    const navigate = useNavigate();
    const currentDirectory = useDirectoryById(params.dir as string);
    useDescriptionTitle(
        `任务分类: "${params.dir}"`,
        params.dir ? params.dir + " directory" : ""
    );
    console.log("params.dir: ", params.dir)

    const [ tasksInCurrentDirectory, setTasksInCurrentDirectory ] = useState<
        Task[]
    >([]);

    useEffect(() =>
    {
        const dirExists = directories.some(dir => dir.id === params.dir);
        if (!dirExists)
        {
            navigate("/");
        }
        else
        {
            const tasksFiltered = tasks.filter(task => task.dir === params.dir);
            setTasksInCurrentDirectory(tasksFiltered);
        }
    }, [ directories, navigate, params.dir, tasks ]);

    return (
        <LayoutRoutes
            title={`${currentDirectory?.name && ""} 任务`}
            tasks={tasksInCurrentDirectory}
        />
    );
};

export default Directory;
