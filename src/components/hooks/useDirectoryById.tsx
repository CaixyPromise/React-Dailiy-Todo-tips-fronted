import {useAppSelector} from "@/store/hooks";
import {Directory} from "@/interfaces";


const useDirectoryById = (id: string) : Directory =>
{
    const directory = useAppSelector((state) => state.tasks.directories);
    return directory.find((d:Directory) => d.id === id); // 返回与给定id匹配的目录对象
}

export default useDirectoryById