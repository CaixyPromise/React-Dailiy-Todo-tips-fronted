export interface Task
{
    id: string;
    title: string;
    dir: number;
    description: string;
    date: string;
    completed: boolean;
    important: boolean;
    alarm: boolean
}

export interface Directory
{
    id: number;
    name: string;
}
