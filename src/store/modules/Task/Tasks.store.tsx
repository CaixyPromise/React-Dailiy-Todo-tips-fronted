import {Action, createSlice, Dispatch, MiddlewareAPI, PayloadAction,} from "@reduxjs/toolkit";
import {Directory, Task} from "@/interfaces";


const initialState: {
    tasks: Task[];
    directories: Directory[];
} = {
    tasks: [],
    directories: [],
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        addNewTask(state, action: PayloadAction<Task>)
        {
            state.tasks = [ action.payload, ...state.tasks ];
        },
        // 传入任务数组，用于从服务器拿到的操作
        addNewTaskArray(state, action: PayloadAction<Task[]>)
        {
            const newTasks: Task[] = action.payload;
            if (newTasks.length < 0)
            {
                return;
            }
            state.tasks = action.payload;
        },
        removeTask(state, action)
        {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
        },
        markAsImportant(state, action: PayloadAction<string>)
        {
            const newTaskFavorited = state.tasks.find(
                (task) => task.id === action.payload
            );
            newTaskFavorited!.important = !newTaskFavorited!.important;
        },
        toggleTaskNeedRemind(state, action)
        {
            const newTaskFavorited = state.tasks.find(
                (task) => task.id === action.payload
            );
            newTaskFavorited!.alarm = !newTaskFavorited!.alarm;
        },
        editTask(state, action: PayloadAction<Task>)
        {
            const taskId = action.payload.id;

            const newTaskEdited: Task = state.tasks.find(
                (task: Task) => task.id === taskId
            )!;
            const indexTask = state.tasks.indexOf(newTaskEdited);
            state.tasks[indexTask] = action.payload;
        },
        toggleTaskCompleted(state, action: PayloadAction<string>)
        {
            const taskId = action.payload;
            const currTask = state.tasks.find((task) => task.id === taskId)!;
            currTask.completed = !currTask.completed;
        },
        deleteAllData(state)
        {
            state.tasks = [];
            state.directories = [];
        },
        addNewDirectory(state, action: PayloadAction<Directory[]>)
        {
            const newDirectories = action.payload;
            newDirectories.forEach((newDir) =>
            {
                if (!state.directories.find(dir => dir.id === newDir.id))
                {
                    state.directories.push(newDir);
                }
            });
        },

        createDirectory(state, action: PayloadAction<Directory>)
        {
            const newDirectory = action.payload;
            const directoryAlreadyExists = state.directories.some(dir => dir.id === newDirectory.id);
            if (!directoryAlreadyExists)
            {
                state.directories.push(newDirectory);
            }
        },

        deleteDirectory(state, action: PayloadAction<number>)
        {
            const dirId = action.payload;
            state.directories = state.directories.filter(dir => dir.id !== dirId);
            state.tasks = state.tasks.filter(task => task.dir !== dirId);
        },

        editDirectoryName(state, action: PayloadAction<{ id: number; newName: string }>)
        {
            const { id, newName } = action.payload;
            const directory = state.directories.find(dir => dir.id === id);
            if (directory)
            {
                directory.name = newName;
            }
        },
    },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;

export const tasksMiddleware =
    (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) =>
    {
        const nextAction = next(action);
        const actionChangeOnlyDirectories =
            tasksActions.createDirectory.match(action);

        const isADirectoryAction: boolean = action.type
            .toLowerCase()
            .includes("directory");

        if (action.type.startsWith("tasks/") && !actionChangeOnlyDirectories)
        {
            const tasksList = store.getState().tasks.tasks;
            localStorage.setItem("tasks", JSON.stringify(tasksList));
        }
        if (action.type.startsWith("tasks/") && isADirectoryAction)
        {
            const dirList = store.getState().tasks.directories;
            localStorage.setItem("directories", JSON.stringify(dirList));
        }

        if (tasksActions.deleteAllData.match(action))
        {
            localStorage.removeItem("tasks");
            localStorage.removeItem("directories");
            localStorage.removeItem("darkmode");
        }

        if (tasksActions.removeTask.match(action))
        {
            if (localStorage.getItem("tasks"))
            {
                const localStorageTasks = JSON.parse(localStorage.getItem("tasks")!);
                if (localStorageTasks.length === 0)
                {
                    localStorage.removeItem("tasks");
                }
            }
        }
        return nextAction;
    };
