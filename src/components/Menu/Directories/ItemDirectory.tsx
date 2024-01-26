import React, {useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {useAppDispatch} from "@/store/hooks";
import {tasksActions} from "@/store/modules/Task/Tasks.store";
import {ReactComponent as Trash} from "@/assets/trash.svg";
import {ReactComponent as Edit} from "@/assets/edit.svg";
import ModalConfirm from "../../Utilities/ModalConfirm";
import ModalDirectory from "../../Utilities/ModalDirectory";
import {message} from "antd";
import {DirectoryControllerService} from "@/services/requests/services/DirectoryControllerService";

const ItemDirectory: React.FC<{ id: number; content: string; classActive: string }> = ({
    content,
    classActive,
    id
}) =>
{
    const route = useLocation();
    const currentPath = route.pathname;

    const dispatch = useAppDispatch();

    const [ modalIsShown, setModalIsShown ] = useState<boolean>(false);
    const [ modalDirIsShown, setModalDirIsShown ] = useState<boolean>(false);

    const closeModalDirectoryHandler = () =>
    {
        setModalDirIsShown(false);
    };

    const deleteDirectoryHandler = async () =>
    {
        if (id < 0)
        {
            message.error("错误的操作");
        }
        try
        {
            const response = await DirectoryControllerService.deleteTasksUsingPOST({ id })
            if (response && response.data)
            {
                dispatch(tasksActions.deleteDirectory(id));
                message.success(`删除${content}分组成功:`)
            }
        }
        catch (e: any)
        {
            message.error("删除失败");
        }
    };

    const confirmEditDirNameHandler = async (dirName: string) =>
    {
        const newDir = dirName.trim()
        if (newDir === "" || newDir.length < 1 || newDir.length > 32)
        {
            message.error("目录名长度为1-32")
        }
        try {
            const response = await DirectoryControllerService.updateTasksUsingPOST({ id, tagName: newDir })
            if (response && response.data)
            {
                dispatch(
                    tasksActions.editDirectoryName({
                        id: id,
                        newName: newDir,
                    })
                );
                message.success(`修改${content}分组成功:`)
            }
        }
        catch (e: any)
        {
            message.error("修改失败")
        }
    };

    return (
        <>
            {modalDirIsShown && (
                <ModalDirectory
                    onClose={closeModalDirectoryHandler}
                    onConfirm={confirmEditDirNameHandler}
                    dirName={content}
                    title="修改目录名称"
                    btnText="提交"
                />
            )}
            {modalIsShown && (
                <ModalConfirm
                    onClose={() => setModalIsShown(false)}
                    onConfirm={deleteDirectoryHandler}
                    text="这个目录下的所有任务都会被删除"
                />
            )}
            <li
                className={`flex items-center pr-4 pl-9 py-2 itemDirectory ${
                    currentPath === "/dir/" + content ? classActive : ""
                }`}
            >
                <NavLink
                    to={`/dir/${content}`}
                    title={content}
                    className="hover:text-rose-600 dark:hover:text-slate-200 transition text-ellipsis whitespace-nowrap overflow-hidden max-w-[7rem]"
                >
                    {content}
                </NavLink>

                {content !== "主要" && (
                    <div className="ml-auto buttonsDir">
                        <button
                            title="编辑目录名称"
                            onClick={() => setModalDirIsShown(true)}
                        >
                            <Edit className="w-5 h-5 mr-2"/>
                        </button>
                        <button
                            title="删除目录"
                            onClick={() => setModalIsShown(true)}
                        >
                            <Trash className="w-5 h-5"/>
                        </button>
                    </div>
                )}
            </li>
        </>
    );
};

export default ItemDirectory;
