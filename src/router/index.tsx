import {createBrowserRouter} from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import RequiredLogin from "../components/CheckLogin";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginForm />
    },
    {
        path: "/",
        element: <RequiredLogin children={<App />} />,
        children: [
            {
                path: "",
                element: <div>Home</div>
            }
        ]
        // element:
    }
])


export default router;