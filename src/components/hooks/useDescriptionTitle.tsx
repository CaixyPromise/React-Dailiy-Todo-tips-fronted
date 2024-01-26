import {useEffect} from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';
const useDescriptionTitle = (description: string, title: string): JSX.Element =>
{
    useEffect(() => {
    }, [description, title]);

    return (
        <Helmet>
            <meta name="description" content={description} />
            <title>每日待办TodoList | {title}</title>
        </Helmet>
    );
};

export default useDescriptionTitle;
