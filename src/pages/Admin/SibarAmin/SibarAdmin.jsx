import { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faExclamation,
    faGauge,
    faGear,
    faHouse,
    faTag,
    faThumbTack,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faFile, faNewspaper } from '@fortawesome/free-regular-svg-icons';

import styles from './SibarAdmin.module.scss';

const cx = className.bind(styles);

function SibarAdmin() {
    const [isiconBars, setIsIconBars] = useState(false);
    const [isAside, setIsAside] = useState(true);
    const [isToast, setIsToast] = useState(false);
    let timeoutId;

    // set bars and navcenter
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 740) {
                setIsIconBars(true);
                setIsAside(false);
            } else {
                setIsIconBars(false);
                setIsAside(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleOpenNavCenter = () => {
        setIsIconBars(false);
        setIsAside(true);
    };

    const handleCloseNavCenter = () => {
        setIsIconBars(true);
        setIsAside(false);
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
            {isiconBars ? (
                <div onClick={handleOpenNavCenter} className={cx('icon-bars')}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            ) : (
                <div onClick={handleCloseNavCenter} className={cx('icon-Xmark')}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
            )}
            {isAside && (
                <aside className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <div className={cx('container')}>
                            <div className={cx('title-header')}>
                                <FontAwesomeIcon className={cx('icon-house')} icon={faHouse} />
                                <h3 className={cx('title')}>ADMIN PANEL</h3>
                            </div>
                            <div className={cx('option')}>
                                <ul className={cx('ul')}>
                                    <li className={cx('option-li', 'active')}>
                                        <FontAwesomeIcon className={cx('icon-option')} icon={faThumbTack} />
                                        <Link className={cx('option-link')}>Products</Link>
                                    </li>
                                    <li className={cx('option-li')} onClick={handleOpenToast}>
                                        <FontAwesomeIcon className={cx('icon-option')} icon={faNewspaper} />
                                        <Link className={cx('option-link')}>Templates</Link>
                                    </li>
                                    <li className={cx('option-li')} onClick={handleOpenToast}>
                                        <FontAwesomeIcon className={cx('icon-option')} icon={faGauge} />
                                        <Link className={cx('option-link')}>Dashboard</Link>
                                    </li>

                                    <li className={cx('option-li')} onClick={handleOpenToast}>
                                        <FontAwesomeIcon className={cx('icon-option')} icon={faTag} />
                                        <Link className={cx('option-link')}>Sales</Link>
                                    </li>
                                    <li className={cx('option-li')} onClick={handleOpenToast}>
                                        <FontAwesomeIcon className={cx('icon-option')} icon={faFile} />
                                        <Link className={cx('option-link')}>Service</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('setting')} onClick={handleOpenToast}>
                            <button className={cx('btn-setting')}>
                                <FontAwesomeIcon className={cx('icon-setting')} icon={faGear} />
                                <p className={cx('text')}>Setting</p>
                            </button>
                        </div>
                    </div>
                </aside>
            )}
        </>
    );
}

export default SibarAdmin;
