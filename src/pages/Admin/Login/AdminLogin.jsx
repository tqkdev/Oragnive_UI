import className from 'classnames/bind';
import styles from './AdminLogin.module.scss';
import { useState } from 'react';

const cx = className.bind(styles);

function AminLogin() {
    const [admin, setAdmin] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        const newAdmin = {
            username: admin,
            password: password,
        };
        console.log(newAdmin);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg-about-us')}>
                <h1 className={cx('title')}> ADMIN LOGIN</h1>
            </div>
            <div className={cx('inner')}>
                <div className={cx('container')}>
                    <div className={cx('login')}>
                        <form onSubmit={handleLogin} className={cx('form')}>
                            <div className={cx('form-input')}>
                                <p className={cx('txt-input')}>Username or email address</p>
                                <input className={cx('username')} onChange={(e) => setAdmin(e.target.value)} />
                            </div>
                            <div className={cx('form-input')}>
                                <p className={cx('txt-input')}>Password</p>
                                <input
                                    className={cx('password')}
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className={cx('btn-login')}>LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AminLogin;
