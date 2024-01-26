import React, {useRef, useState} from "react";
import {DirectoriesItem, Task} from "@/interfaces";
import {useAppSelector} from "@/store/hooks";
import Modal from "./Modal";

const InputCheckbox: React.FC<{
    label: string;
    isChecked: boolean;
    setChecked: (value: React.SetStateAction<boolean>) => void;
}> = ({ isChecked, setChecked, label }) =>
{
    return (
        <label className="mb-0 flex items-center cursor-pointer">
            <div
                className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
                {isChecked && (
                    <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
                )}
            </div>
            <span className="order-1 flex-1">{label}</span>
            <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={() => setChecked((prev: boolean) => !prev)}
            />
        </label>
    );
};

const ModalCreateTask: React.FC<{
    onClose: () => void;
    task?: Task;
    nameForm: string;
    onConfirm: (task: Task) => void;
}> = ({ onClose, task, nameForm, onConfirm }) =>
{
    const directories = useAppSelector((state) => state.tasks.directories);


    const formatDateForInput = (isoDateStr?: string) =>
    {
        const date = isoDateStr ? new Date(isoDateStr) : new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    const formatDateForDateTimeLocal = (dateObj: Date) =>
    {
        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObj.getDate().toString().padStart(2, '0');
        const hours = "00";
        const minutes = "00";

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const todayDate: string = formatDateForDateTimeLocal(new Date());
    const maxDate: string = formatDateForDateTimeLocal(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));

    const [ description, setDescription ] = useState<string>(() =>
    {
        if (task)
        {
            return task.description;
        }
        return "";
    });
    const [ title, setTitle ] = useState<string>(() =>
    {
        if (task)
        {
            return task.title;
        }
        return "";
    });
    const [ date, setDate ] = useState<string>(() =>
    {
        if (task)
        {
            return formatDateForInput(task.date);
        }
        return formatDateForInput();
    });
    const isTitleValid = useRef<Boolean>(false);
    const isDateValid = useRef<Boolean>(false);

    const [ isImportant, setIsImportant ] = useState<boolean>(() =>
    {
        if (task)
        {
            return task.important;
        }
        return false;
    });

    const [ isCompleted, setIsCompleted ] = useState<boolean>(() =>
    {
        if (task)
        {
            return task.completed;
        }
        return false;
    });

    const [ isAlarm, setAlarm ] = useState<boolean>(() =>
    {
        if (task)
        {
            return task.alarm;
        }
        return false
    })

    const [ selectedDirectory, setSelectedDirectory ] = useState<string>(() =>
    {
        if (task && task.dir)
        {
            return task.dir;
        }
        return directories[0]?.id || 0; // 默认选择第一个目录的 ID，如果没有目录则为 0
    });

    const addNewTaskHandler = (event: React.FormEvent): void =>
    {
        event.preventDefault();

        isTitleValid.current = title.trim().length > 0;
        isDateValid.current = date.trim().length > 0;

        if (isTitleValid.current && isDateValid.current)
        {
            const newTask: Task = {
                title: title,
                dir: selectedDirectory,
                description: description,
                date: date,
                completed: isCompleted,
                important: isImportant,
                id: task?.id ? task.id : Date.now().toString(),
                alarm: isAlarm
            };
            onConfirm(newTask);
            onClose();
        }
    };
    return (
        <Modal onClose={onClose} title={nameForm}>
            <form
                className="flex flex-col stylesInputsField"
                onSubmit={addNewTaskHandler}
            >
                <label>
                    任务名称
                    <input
                        type="text"
                        placeholder="学习; 工作任务"
                        required
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        className="w-full"
                    />
                </label>
                <label>
                    日期
                    <input
                        type="datetime-local"
                        className="w-full"
                        value={date}
                        required
                        onChange={({ target }) => setDate(target.value)}
                        min={todayDate}
                        max={maxDate}
                    />
                </label>
                <label>
                    任务描述(可选)
                    <textarea
                        placeholder="任务描述: 学习? 工作任务?"
                        className="w-full"
                        value={description}
                        onChange={({ target }) => setDescription(target.value)}
                    ></textarea>
                </label>
                <label>
                    任务分类
                    <select
                        className="block w-full"
                        value={selectedDirectory}
                        onChange={({ target }) => setSelectedDirectory((target.value))}
                    >
                        {directories.map((dir: DirectoriesItem) => (
                            <option
                                key={dir.id}
                                value={dir.id}
                                className="bg-slate-100 dark:bg-slate-800"
                            >
                                {dir.name}
                            </option>
                        ))}
                    </select>
                </label>
                <InputCheckbox
                    isChecked={isImportant}
                    setChecked={setIsImportant}
                    label="标记为重要的"
                />
                <InputCheckbox
                    isChecked={isCompleted}
                    setChecked={setIsCompleted}
                    label="标记为已完成"
                />
                <InputCheckbox
                    isChecked={isAlarm}
                    setChecked={setAlarm}
                    label="到点提醒"
                />
                <button type="submit" className="btn mt-5">
                    {nameForm}
                </button>
            </form>
        </Modal>
    );
};

export default ModalCreateTask;
