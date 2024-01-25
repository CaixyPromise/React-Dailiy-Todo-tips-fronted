import React from "react";
import {NavLink, useLocation} from "react-router-dom";

const links = [
    {
        name: "全部任务",
        path: "/",
    },
    {
        name: "今日待办",
        path: "/today",
    },
    {
        name: "重要任务",
        path: "/important",
    },
    {
        name: "已完成任务",
        path: "/completed",
    },
    {
        name: "未完成的任务",
        path: "/uncompleted",
    },
];

const NavLinks: React.FC<{ classActive: string }> = ({ classActive }) =>
{
    const route = useLocation();
    const currentPath = route.pathname;
    return (
        <nav>
            <ul className="grid gap-2">
                {links.map((link) =>
                    (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                className={`px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200 ${
                                    currentPath === link.path ? classActive : ""
                                }`}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
            </ul>
        </nav>
    );
};

export default NavLinks;
