import React, {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getUserLogin} from "../../store/modules/User/User.store";
import {AddDispatch} from "../../store";
import {useAppDispatch} from "../../store/hooks";

const ProtectedRoute :React.FC<any> = ({children}) =>
{
    const dispatch = useAppDispatch();
    useEffect(() =>
    {
        dispatch(getUserLogin());
    }, [dispatch]);

    const token = localStorage.getItem("token");
    // 检查token是否存在
    if (!token)
    {
        // 如果token不存在，重定向到登录页面
        return <Navigate to="/login" replace />;
    }
    // 如果token存在，渲染子组件
    return <>{children}</>;
}