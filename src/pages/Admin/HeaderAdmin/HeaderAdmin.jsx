import className from 'classnames/bind';
import styles from './HeaderAdmin.module.scss';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { logoutAdmin } from '../../../redux/Admin/adminApiRequest';
import { createAxiosAdmin } from '../../../components/axiosJWT/axiosJWT';
import { logoutSuccess } from '../../../redux/Admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';

const cx = className.bind(styles);

function HeaderAdmin() {
    const isAdmin = useSelector((state) => state.admin.login.currentAdmin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxiosAdmin(isAdmin, dispatch, logoutSuccess);

    const [issetting, setIsSetting] = useState(false);
    const [IsLoader, setIsLoader] = useState(false);
    const avatarRef = useRef();

    // click vào bất kỳ nơi nào khác ngoài avatar, đóng setting
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (avatarRef.current && !avatarRef.current.contains(event.target)) {
                setIsSetting(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    // hiện setting
    const toggleSetting = () => {
        setIsSetting(!issetting);
    };

    // Logout
    const handleLogOut = () => {
        setIsLoader(true);
        logoutAdmin(dispatch, navigate, isAdmin?.accessToken, axiosJWT).finally(() => {
            setIsLoader(false);
        });
        localStorage.removeItem('persist:root');
    };

    // check admin
    if (!isAdmin) {
        return <Navigate to="/admin" />;
    }

    return (
        <>
            {IsLoader && <Loader />}
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <Link className={cx('logo-left')}>
                        <img
                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779897/ORGAVIVE/icons/logo-02_dntnhy.png"
                            alt="logo"
                        />
                    </Link>

                    <div className={cx('action')}>
                        <div className={cx('container-avatar')}>
                            <div className={cx('admin')} ref={avatarRef} onClick={toggleSetting}>
                                <button className={cx('avatar')}>
                                    <img
                                        src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg"
                                        alt="avatar"
                                    />
                                </button>
                                <div className={cx('info')}>
                                    <p className={cx('name')}>{isAdmin?.username}</p>
                                    <FontAwesomeIcon className={cx('icon-caret')} icon={faCaretDown} />
                                </div>
                            </div>

                            {issetting && (
                                <div className={cx('setting')}>
                                    <div className={cx('setting-option')}>
                                        <FontAwesomeIcon className={cx('option-icon')} icon={faGear} />
                                        <h3 className={cx('option-title')}>Setting</h3>
                                    </div>
                                    <div className={cx('setting-option')} onClick={handleLogOut}>
                                        <FontAwesomeIcon className={cx('option-icon')} icon={faRightFromBracket} />
                                        <h3 className={cx('option-title')}>Log out</h3>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default HeaderAdmin;
