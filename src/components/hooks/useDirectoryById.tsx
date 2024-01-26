import {useAppSelector} from "@/store/hooks";
import {DirectoriesItem} from "@/interfaces";


const useDirectoryById = (id: string) : DirectoriesItem =>
{
    const directory = useAppSelector((state) => state.tasks.directories);
    return directory.find((d:DirectoriesItem) => d.id === id); // 返回与给定id匹配的目录对象
}

export default useDirectoryById