import className from 'classnames/bind';
import styles from './Register.module.scss';
import { useState } from 'react';
import Loader from '../../components/Loader/Loader';

import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/User/userApiRequest';
import { useDispatch } from 'react-redux';

const cx = className.bind(styles);

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [IsLoader, setIsLoader] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleRegister(e) {
        e.preventDefault();
        setIsLoader(true);
        const newUser = {
            username: username,
            email: email,
            password: password,
        };
        registerUser(newUser, dispatch, navigate).finally(() => {
            setIsLoader(false);
        });
    }

    return (
        <>
            {IsLoader && <Loader />}
            <div className={cx('wrapper')}>
                <div className={cx('bg-about-us')}>
                    <h1 className={cx('title')}>REGISTER</h1>
                </div>
                <div className={cx('inner')}>
                    <div className={cx('container')}>
                        <div className={cx('register')}>
                            <form className={cx('form')}>
                                <div className={cx('form-input')}>
                                    <p className={cx('txt-input')}>Username</p>
                                    <input className={cx('username')} onChange={(e) => setUsername(e.target.value)} />
                                </div>
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
                                    <div className={cx('btn-pre')}>
                                        <Link className={cx('link')} to={'/login'}>
                                            Back
                                        </Link>
                                    </div>
                                    <button onClick={handleRegister} className={cx('btn-register')}>
                                        REGISTER
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
