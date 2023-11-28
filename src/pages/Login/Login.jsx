import className from 'classnames/bind';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const cx = className.bind(styles);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password,
        };
        console.log(newUser);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg-about-us')}>
                <h1 className={cx('title')}>LOGIN</h1>
            </div>
            <div className={cx('inner')}>
                <div className={cx('container')}>
                    <div className={cx('login')}>
                        <form className={cx('form')}>
                            <div className={cx('form-input')}>
                                <p className={cx('txt-input')}>Username or email address</p>
                                <input className={cx('username')} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className={cx('form-input')}>
                                <p className={cx('txt-input')}>Password</p>
                                <input
                                    className={cx('password')}
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className={cx('action')}>
                                <div className={cx('btn-register')}>
                                    <Link to={'/register'}>Register</Link>
                                </div>
                                <button onClick={handleLogin} className={cx('btn-login')}>
                                    LOGIN
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
