import React, {useEffect, useRef, useState} from 'react';
import styles from "./index.module.scss";

const LoginForm = () =>
{
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [beamDegrees, setBeamDegrees] = useState<string>('0deg');
    const beamRef = useRef<HTMLDivElement>(null); // 使用useRef来引用beam元素

    const handleMouseMove = (e: MouseEvent) =>
    {
        if (beamRef.current)
        {
            const rect = beamRef.current.getBoundingClientRect();
            const mouseX = rect.right + (rect.width / 2);
            const mouseY = rect.top + (rect.height / 2);
            const rad = Math.atan2(mouseX - e.pageX, mouseY - e.pageY);
            const degrees = (rad * (20 / Math.PI) * -1) - 350;
            setBeamDegrees(`${degrees}deg`);
        }
    };

    useEffect(() =>
    {
        window.addEventListener('mousemove', handleMouseMove);
        return () =>
        {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className={styles.loginForm}>
            <div className={`shell ${showPassword ? 'show-password' : ''}`}>
                <form>
                    <h2>LOGIN</h2>
                    <div className="form-item">
                        <label htmlFor="username">Username</label>
                        <div className="input-wrapper">
                            <input type="text" id="username"/>
                        </div>
                    </div>
                    <div className="form-item">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <input type={showPassword ? 'text' : 'password'} id="password"/>
                            <button type="button" id="eyeball" onClick={() => setShowPassword(!showPassword)}>
                                <div className="eye"></div>
                            </button>
                            <div id="beam" ref={beamRef}
                                 style={{transform: `translateY(-50%) rotate(${beamDegrees})`}}></div>
                        </div>
                    </div>
                    <button id="submit">Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
