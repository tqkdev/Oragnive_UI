import { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faChartPie,
    faExclamation,
    faTag,
    faThumbTack,
    faTicket,
    faUser,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';

import styles from './Sidebar.module.scss';

const cx = className.bind(styles);

function Sidebar() {
    const [isAside, setIsAside] = useState(true);
    const [islopphu, setIslopphu] = useState(false);
    const [isToast, setIsToast] = useState(false);
    let timeoutId;
    // Kiểm tra URL hiện tại và trả về class 'active' cho các liên kết tương ứng
    const location = useLocation();
    const isActive = (path) => location.pathname.startsWith(path);

    // set bars and navcenter
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 740) {
                setIsAside(false);
                setIslopphu(true);
            } else {
                setIsAside(true);
                setIslopphu(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleOpenNavCenter = () => {
        setIsAside(!isAside);
    };

    // toast mess
    const handleOpenToast = () => {
        if (isToast) {
            clearTimeout(timeoutId);
            setIsToast(false);
        } else {
            setIsToast(true);
            timeoutId = setTimeout(() => {
                setIsToast(false);
            }, 3000);
        }
    };
    const handleCloseToast = () => {
        clearTimeout(timeoutId);
        setIsToast(false);
    };
    return (
        <>
            {isToast && (
                <div className={cx('toast-mess')}>
                    <div className={cx('icon-Exclamation')}>
                        <FontAwesomeIcon icon={faExclamation} />
                    </div>
                    <div className={cx('txt-toast')}>Đang cập nhật!</div>
                    <button
                        onClick={handleCloseToast}
                        type="button"
                        className={cx('btn-close')}
                        data-dismiss-target="#toast-default"
                        aria-label="Close"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            )}

            <div onClick={handleOpenNavCenter} className={cx('icon-bars')}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            {isAside && islopphu && <div onClick={handleOpenNavCenter} className={cx('lopphu')}></div>}
            {isAside && (
                <aside className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <div className={cx('container')}>
                            <div className={cx('box-logo')}>
                                <div className={cx('logo')}>
                                    <img
                                        src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779897/ORGAVIVE/icons/logo-02_dntnhy.png"
                                        alt="logo"
                                    />
                                </div>
                            </div>
                            <div className={cx('option')}>
                                <ul className={cx('ul')}>
                                    <li className={cx('option-li', { active: isActive('/admin/main') })}>
                                        <Link to={'/admin/main'}>
                                            <FontAwesomeIcon className={cx('icon-option')} icon={faChartPie} />
                                            <p className={cx('option-link')}> Tổng Quan</p>
                                        </Link>
                                    </li>
                                    <li className={cx('option-li', { active: isActive('/admin/product') })}>
                                        <Link to={'/admin/product'}>
                                            <FontAwesomeIcon className={cx('icon-option')} icon={faThumbTack} />
                                            <p className={cx('option-link')}> Sản phẩm</p>
                                        </Link>
                                    </li>
                                    <li className={cx('option-li', { active: isActive('/admin/order') })}>
                                        <Link to={'/admin/order'}>
                                            <FontAwesomeIcon className={cx('icon-option')} icon={faNewspaper} />
                                            <p className={cx('option-link')}>Đơn đặt hàng</p>
                                        </Link>
                                    </li>
                                    <li className={cx('option-li')} onClick={handleOpenToast}>
                                        <FontAwesomeIcon className={cx('icon-option')} icon={faTicket} />
                                        <Link className={cx('option-link')}>Kho Voucher</Link>
                                    </li>

                                    <li className={cx('option-li')} onClick={handleOpenToast}>
                                        <FontAwesomeIcon className={cx('icon-option')} icon={faTag} />
                                        <Link className={cx('option-link')}>Dịch vụ</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('setting')} onClick={handleOpenToast}>
                            <button className={cx('btn-setting')}>
                                <FontAwesomeIcon className={cx('icon-setting')} icon={faUser} />
                                <p className={cx('text')}>Tài khoản của tôi</p>
                            </button>
                        </div>
                    </div>
                </aside>
            )}
        </>
    );
}

export default Sidebar;
