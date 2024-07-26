import className from 'classnames/bind';
import styles from './AdminLogin.module.scss';
import { useState } from 'react';

import { loginAdmin } from '../../../redux/Admin/adminApiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';

const cx = className.bind(styles);

function AminLogin() {
    const [IsLoader, setIsLoader] = useState(false);
    const [emailAdmin, setEmailAdmin] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        setIsLoader(true);
        const newAdmin = {
            email: emailAdmin,
            password: password,
        };
        loginAdmin(newAdmin, dispatch, navigate).finally(() => {
            setIsLoader(false);
        });
    }

    return (
        <div className={cx('wrapper')}>
            {IsLoader && <Loader />}
            <div className={cx('bg-about-us')}>
                <h1 className={cx('title')}> ADMIN LOGIN</h1>
            </div>
            <div className={cx('inner')}>
                <div className={cx('container')}>
                    <div className={cx('login')}>
                        <form onSubmit={handleLogin} className={cx('form')}>
                            <div className={cx('form-input')}>
                                <p className={cx('txt-input')}>Email address</p>
                                <input className={cx('username')} onChange={(e) => setEmailAdmin(e.target.value)} />
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
