import React, {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {getUserLogin} from "../../store/modules/User/User.store";
import {useAppDispatch, useAppSelector} from "../../store/hooks";

interface CheckLoginProps
{
    // 传入组件类型
    children: React.ReactNode;
}

const CheckLogin: React.FC<CheckLoginProps> = ({ children }) =>
{
    const dispatch = useAppDispatch();
    useEffect(() =>
    {
        dispatch(getUserLogin());
    }, [ dispatch ]);

    const token = useAppSelector((state) => state.user.loginUser)
    // 检查token是否存在
    if (!token)
    {
        // 如果token不存在，重定向到登录页面
        return <Navigate to="/login" replace/>;
    }
    // 如果token存在，渲染子组件
    return <>{children}</>;
}

export default CheckLogin;