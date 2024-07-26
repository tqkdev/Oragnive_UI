import className from 'classnames/bind';
import styles from './Login.module.scss';
import { useState } from 'react';
import Loader from '../../components/Loader/Loader';

import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/User/userApiRequest';
import { useDispatch } from 'react-redux';

const cx = className.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [IsLoader, setIsLoader] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        setIsLoader(true);
        const newUser = {
            email: email,
            password: password,
        };
        loginUser(newUser, dispatch, navigate).finally(() => {
            setIsLoader(false);
        });
    }

    return (
        <>
            {IsLoader && <Loader />}
            <div className={cx('wrapper')}>
                <div className={cx('bg-about-us')}>
                    <h1 className={cx('title')}>LOGIN</h1>
                </div>
                <div className={cx('inner')}>
                    <div className={cx('container')}>
                        <div className={cx('login')}>
                            <form className={cx('form')}>
                                <div className={cx('form-input')}>
                                    <p className={cx('txt-input')}>Email address</p>
                                    <input className={cx('username')} onChange={(e) => setEmail(e.target.value)} />
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
                                    <button onClick={handleLogin} className={cx('btn-login')}>
                                        LOGIN
                                    </button>
                                </div>
                                <div className={cx('btn-register')}>
                                    <div>
                                        <p>Chưa có tài khoản?</p>
                                        <Link className={cx('register')} to={'/register'}>
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
