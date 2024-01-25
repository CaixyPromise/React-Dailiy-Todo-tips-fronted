import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {tasksActions} from "@/store/modules/Task/Tasks.store";
import ModalDirectory from "@/components/Utilities/ModalDirectory";
import ItemDirectory from "./ItemDirectory";

const ContentDirectories: React.FC<{ classActive: string }> = ({
    classActive,
}) =>
{
    const directories = useAppSelector((store) => store.tasks.directories);
    const [ modalDirIsShown, setModalDirIsShown ] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const createNewDirectoryHandler = (inputValue: string) =>
    {
        const newDirectoryName: string = inputValue.trim();

        if (newDirectoryName.length === 0) return;

        const directoryDoesNotExist = directories.every(
            (dir: string) => dir !== newDirectoryName
        );

        if (directoryDoesNotExist)
        {
            // todo: 实现分组目录的增删查改
            dispatch(tasksActions.createDirectory(newDirectoryName));
        }
    };

    const closeModalDirectoryHandler = () =>
    {
        setModalDirIsShown(false);
    };

    return (
        <>
            {modalDirIsShown && (
                <ModalDirectory
                    onClose={closeModalDirectoryHandler}
                    onConfirm={createNewDirectoryHandler}
                    btnText="新建分类"
                    title="创建新的分类"
                />
            )}

            <ul className="max-h-36 overflow-auto">
                {directories.map((dir: string) => (
                    <ItemDirectory key={dir} classActive={classActive} dir={dir}/>
                ))}
            </ul>
            <button
                onClick={() => setModalDirIsShown(true)}
                className="px-3 py-1 border-slate-300 dark:border-slate-700 border-2 ml-9 mt-2 rounded-md border-dashed hover:text-violet-500"
            >
                + 新建分类
            </button>
        </>
    );
};

export default ContentDirectories;
