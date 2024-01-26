import styles from "./index.module.scss";
import React, {useRef} from "react";
import {message} from "antd";
import {useAppDispatch} from "@/store/hooks";
import {UserControllerService} from "@/services/requests";
import {setUserLogin} from "@/store/modules/User/User.store";
import {useNavigate} from "react-router-dom";

const Login = () =>
{
    const accountRef: React.LegacyRef<HTMLInputElement> | undefined = useRef(null);
    const passwordRef: React.LegacyRef<HTMLInputElement> | undefined = useRef(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const doLogin = async (event: any,) =>
    {
        event.preventDefault();
        if (accountRef !== null && passwordRef !== null)
        {
            const account = accountRef?.current?.value;
            const password = passwordRef?.current?.value;
            try
            {
                const response = await UserControllerService.userLoginUsingPOST({
                    userAccount: account,
                    userPassword: password
                });
                if (response && response.data)
                {
                    dispatch(setUserLogin(response.data))
                    navigate("/");
                }
            }
            catch (error: any)
            {
                message.error("登录失败，请检查账号或密码是否正确!!");
            }
        }
    }

    return (
        <div className={styles.loginPage}>
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