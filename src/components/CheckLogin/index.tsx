import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {getUserLogin} from "@/store/modules/User/User.store";
import {useAppDispatch, useAppSelector} from "@/store/hooks";

interface CheckLoginProps
{
    // 传入组件类型
    children: React.ReactNode;
}

const CheckLogin: React.FC<CheckLoginProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(getUserLogin())
            .finally(() => setIsLoading(false));
    }, [dispatch]);

    const user = useAppSelector((state) => state.user.loginUser);

    if (isLoading) {
        return <div>Loading...</div>; // 或者使用更复杂的加载指示符
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default CheckLogin;