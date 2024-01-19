import {createBrowserRouter} from "react-router-dom";
import LoginForm from "../pages/LoginForm";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginForm />
    },
    {
        path: "/",
        // element:
    }
])


export default router;