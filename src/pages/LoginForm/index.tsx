import styles from "./index.module.scss";
import React, {useEffect, useRef, useState} from "react";
import {Alert} from "antd";
import {useAppDispatch} from "@/store/hooks";
import {UserControllerService, UserLoginRequest} from "@/services/requests";
import {setUserLogin} from "@/store/modules/User/User.store";
import {useNavigate} from "react-router-dom";

const Login = () =>
{
    const [ Login, setLogin ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState(null);
    // const accountRef = useRef(null);
    const accountRef: React.LegacyRef<HTMLInputElement> | undefined = useRef(null);
    const passwordRef: React.LegacyRef<HTMLInputElement> | undefined = useRef(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() =>
    {
        const account = localStorage.getItem("account");
        if (account)
        {
            // accountRef.current.value = account;
        }
    }, []);
    // console.log(HaveToken())

    const doLogin = async (event: any,) =>
    {
        event.preventDefault();
        console.log(event)
        if (accountRef !== null && passwordRef !== null)
        {
            const account = accountRef?.current?.value;
            const password = passwordRef?.current?.value;
            const loginForm: UserLoginRequest = {
                userAccount: account,
                userPassword: password
            }
            try
            {
                const response = await UserControllerService.userLoginUsingPOST(loginForm);
                if (response && response.data)
                {
                    dispatch(setUserLogin(response.data))
                    navigate("/");
                }
            }
            catch (error: any)
            {
                console.log(error);
            }
        }
    }


    return (
        <div className={styles.loginPage}>
            {errorMessage && <Alert message="Error" description={errorMessage} type="error"/>}
            <form className={styles.login} onSubmit={doLogin}>
                <h2>用户登录</h2>
                <div className={styles.login_box}>
                    <input type="text"
                           required={true}
                           ref={accountRef}
                           placeholder="请输入账号"
                    />
                    <label>邮箱</label>
                </div>
                <div className={styles.login_box}>
                    <input type="password"
                           required={true}
                           ref={passwordRef}
                           placeholder="请输入密码"
                    />
                    <label>密码</label>
                </div>

                <button className={styles.loginButton} type="submit">
                    登录
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                {/*<button className={styles.registerButton} >*/}
                {/*    注册账号*/}
                {/*</button>*/}
            </form>
        </div>
    )
}

export default Login;