import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {tasksActions} from "@/store/modules/Task/Tasks.store";
import ModalDirectory from "@/components/Utilities/ModalDirectory";
import ItemDirectory from "./ItemDirectory";
import {Directory} from "@/interfaces";
import {DirectoryControllerService} from "@/services/requests/services/DirectoryControllerService";
import {message} from "antd";

const ContentDirectories: React.FC<{ classActive: string }> = ({
    classActive,
}) =>
{
    const directories:Directory[] = useAppSelector((store) => store.tasks.directories);
    const [ modalDirIsShown, setModalDirIsShown ] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const createNewDirectoryHandler = async (inputValue: string) =>
    {
        const newDirectoryName: string = inputValue.trim();

        if (newDirectoryName.length === 0) return;

        const directoryDoesNotExist = directories.every(
            (dir: Directory) => dir.name !== newDirectoryName
        );

        if (directoryDoesNotExist)
        {
            try {
                const response = await DirectoryControllerService.addTaskDirectoriesUsingPOST({
                    tagName: newDirectoryName
                })
                if (response && response.data)
                {
                    dispatch(tasksActions.createDirectory({
                        name: newDirectoryName,
                        id: response.data
                    }));
                    message.success("创建分组信息成功!!")
                }
            }
            catch (e: any)
            {
                message.error("创建分组信息失败!!")
            }
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
                {directories.map((dir: Directory) => (
                    <ItemDirectory key={dir.id} classActive={classActive} content={dir.name} id={dir.id}/>
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
