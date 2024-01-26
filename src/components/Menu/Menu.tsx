import React from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {menusActions} from "@/store/modules/Menu/Menu.store";
import BtnAddTask from "../Utilities/BtnAddTask";
import Directories from "./Directories/Directories";
import NavLinks from "./NavLinks";
import LayoutMenus from "../Utilities/LayoutMenus";
import Footer from "../Footer";


const classLinkActive =
    "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200";

const Menu: React.FC = () =>
{
    const menuOpen = useAppSelector((state) => state.menu.menuHeaderOpened);
    const dispatch = useAppDispatch();

    const closeMenuHandler = () =>
    {
        dispatch(menusActions.closeMenuHeader());
    };
    return (
        <LayoutMenus
            menuOpen={menuOpen}
            closeMenuHandler={closeMenuHandler}
            className="left-0"
        >
            <header className="h-full flex flex-col">
                <h1 className="font-bold uppercase text-center mt-8 text-lg tracking-wide hidden xl:block flex items-center "
                    style={{ paddingLeft: "70px", paddingBottom: "5px", paddingTop: "10px" }}
                >
                    <div style={{
                        width: "182px",
                        height: "50px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                    }}>
                        <img src="/todo-logo.png" alt="logo" className="mr-2"/>
                    </div>
                </h1>
                <BtnAddTask className="my-8 mx-4"/>
                <NavLinks classActive={classLinkActive}/>
                <Directories classActive={classLinkActive}/>
            </header>
            <Footer/>
        </LayoutMenus>
    );
};

export default Menu;
