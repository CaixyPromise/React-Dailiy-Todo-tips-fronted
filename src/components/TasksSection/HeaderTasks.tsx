import React from "react";
import BtnAddTask from "../Utilities/BtnAddTask";
import {ReactComponent as MenuIcon} from "../../assets/menu.svg";
import SearchField from "./SearchField";
import {useAppDispatch} from "@/store/hooks";
import {menusActions} from "@/store/modules/Menu/Menu.store";
import Notification from "./Notification";
import DarkMode from "../AccountSection/DarkMode";
import TasksDone from "../AccountSection/TasksDone";
import DeleteTasks from "../AccountSection/DeleteTasks";

const HeaderTasks: React.FC = () =>
{
    const dispatch = useAppDispatch();

    const openMenuHeaderHandler = () =>
    {
        dispatch(menusActions.openMenuHeader());
    };

    return (
        <header className="items-center grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 md:flex ">
            <button
                className="mr-6 block xl:hidden"
                onClick={openMenuHeaderHandler}
                title="open menu"
            >
                <MenuIcon/>
            </button>
            <SearchField/>
            <div className="text-center">
        <span className="text-slate-600 dark:text-slate-200 uppercase font-bold text-sm block xl:hidden">
          TO-DO LIST
        </span>
                <TasksDone/>
            </div>
            <div className="flex flex-1">
                <Notification/>
                <DeleteTasks/>
                <DarkMode/>
                <BtnAddTask className="hidden xl:block shadow-slate-400  dark:shadow-slate-900 sm:shadow-transparent"/>
            </div>
        </header>
    );
};

export default HeaderTasks;
