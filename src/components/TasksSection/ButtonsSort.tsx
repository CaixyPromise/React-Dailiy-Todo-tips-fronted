import React from "react";
import {ReactComponent as IconView1} from "../../assets/view-1.svg";
import {ReactComponent as IconView2} from "../../assets/view-2.svg";

const sortValues = [
    { value: "order-added", title: "已添加的任务" },
    { value: "min-date", title: "更早的时间排序" },
    { value: "max-date", title: "更晚的时间排序" },
    { value: "completed-first", title: "最先完成排序" },
    { value: "uncompleted-first", title: "未完成排序" },
];

const ButtonsSort: React.FC<{
    isListInView1: boolean;
    sortedBy: string;
    setSortedBy: (option: string) => void;
    setIsListInView1: (status: boolean) => void;
}> = ({ isListInView1, setIsListInView1, sortedBy, setSortedBy }) =>
{
    const setViewStatus = (status: boolean) =>
    {
        localStorage.setItem("view-mode", JSON.stringify(status))
        setIsListInView1(status);
    }
    return (
        <div className="flex children-styles">
            <button onClick={() => setViewStatus(true)} title="列表展示">
                <IconView1 className={isListInView1 ? "text-violet-600" : ""}/>
            </button>
            <button onClick={() => setViewStatus(false)} title="块状展示">
                <IconView2 className={!isListInView1 ? "text-violet-600" : ""}/>
            </button>
            <select
                className="ml-auto inputStyles"
                value={sortedBy}
                onChange={({ target }) => setSortedBy(target.value)}
            >
                <option value="" disabled>
                    排序
                </option>
                {sortValues.map((val) => (
                    <option
                        key={val.value}
                        value={val.value}
                        className="bg-slate-100 dark:bg-slate-800"
                    >
                        {val.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ButtonsSort;
