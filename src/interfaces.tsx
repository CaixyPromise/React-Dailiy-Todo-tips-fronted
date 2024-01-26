export interface Task
{
    id: string;
    title: string;
    dir: string;
    description: string;
    date: string;
    completed: boolean;
    important: boolean;
    alarm: boolean
}

export interface DirectoriesItem
{
    id: string;
    name: string;
}
