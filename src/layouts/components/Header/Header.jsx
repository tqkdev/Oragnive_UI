import className from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGear, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = className.bind(styles);

function Header() {
    let isUser = true;

    const [isScrolled, setIsScrolled] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [issetting, setIsSetting] = useState(false);
    const [isiconBars, setIsIconBars] = useState(false);
    const [isNavCenter, setIsNavCenter] = useState(true);

    const headerRef = useRef();
    const resultCartRef = useRef();
    const avatarRef = useRef();

    // cuộn đổi màu bg
    const handleScroll = () => {
        const top = window.scrollY;
        setIsScrolled(top > 0);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // click vào bất kỳ nơi nào khác ngoài header, đóng result-cart
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (resultCartRef.current && !resultCartRef.current.contains(event.target)) {
                setIsCartOpen(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

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

    // sản phẩm trong cart
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    // hiện setting
    const toggleSetting = () => {
        setIsSetting(!issetting);
    };

    // set bars and navcenter
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 740) {
                setIsIconBars(true);
                setIsNavCenter(false);
            } else {
                setIsIconBars(false);
                setIsNavCenter(true);
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
        setIsNavCenter(true);
    };

    const handleCloseNavCenter = () => {
        setIsIconBars(true);
        setIsNavCenter(false);
    };
    return (
        <header
            ref={headerRef}
            className={cx('wrapper', {
                [styles.transparentBackground]: !isScrolled,
                [styles.replaceBackground]: isScrolled,
            })}
        >
            <div className={cx('inner')}>
                <Link className={cx('logo-left')}>
                    <img
                        src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779897/ORGAVIVE/icons/logo-02_dntnhy.png"
                        alt="logo"
                    />
                </Link>

                {isNavCenter && (
                    <div className={cx('nav-center')}>
                        <Link className={cx('nav-link')} to="/">
                            HOME
                        </Link>
                        <Link className={cx('nav-link')} to="/shop">
                            SHOP
                        </Link>
                        <Link className={cx('nav-link')} to="/about">
                            ABOUT
                        </Link>
                        <Link className={cx('nav-link')} to="/contact">
                            CONTACT
                        </Link>
                    </div>
                )}

                <div className={cx('action')}>
                    <button ref={resultCartRef} onClick={toggleCart} className={cx('icon-cart')}>
                        <img
                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779884/ORGAVIVE/icons/icon-cart-3_n8v87o.png"
                            alt="icon-cart"
                        />
                    </button>

                    {isUser ? (
                        <div className={cx('container-avatar')}>
                            <button ref={avatarRef} onClick={toggleSetting} className={cx('avatar')}>
                                <img
                                    src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg"
                                    alt="avatar"
                                />
                            </button>

                            {issetting && (
                                <div className={cx('setting')}>
                                    <div className={cx('setting-option')}>
                                        <FontAwesomeIcon className={cx('option-icon')} icon={faGear} />
                                        <h3 className={cx('option-title')}>Setting</h3>
                                    </div>
                                    <div className={cx('setting-option')}>
                                        <FontAwesomeIcon className={cx('option-icon')} icon={faRightFromBracket} />
                                        <h3 className={cx('option-title')}>Log out</h3>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className={cx('dangnhap')}>
                            Log in
                        </Link>
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

                    {isCartOpen && (
                        <div className={cx('result-cart')}>
                            <h3 className={cx('cart-title')}>Sản phẩm trong giỏ hàng:</h3>

                            <div className={cx('item-cart')}>
                                <div className={cx('img-cart')}>
                                    <img
                                        src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779869/ORGAVIVE/AvatarProduct/cam3_sjabbg.jpg"
                                        alt="a"
                                    />
                                </div>
                                <div className={cx('info-cart')}>
                                    <div className={cx('info-name')}>
                                        <h3>taos</h3>
                                        <h4>10000 đ</h4>
                                    </div>

                                    <div className={cx('info-quality')}>
                                        <div className={cx('quality')}>
                                            <h5>X</h5>
                                            <h3>5</h3>
                                        </div>
                                    </div>
                                    <div className={cx('total_oneSP')}>
                                        <h4>10000 đ</h4>
                                    </div>
                                </div>
                                <div className={cx('icon-delete')}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </div>
                            </div>

                            <div className={cx('chitiet')}>
                                <Link onClick={toggleCart} to={'/cart'}>
                                    Xem chi tiết
                                </Link>
                            </div>

                            <div className={cx('thanhtoan')}>
                                <div className={cx('total-rice')}>
                                    <h5>Tổng:</h5>
                                    <h4>100000 đ</h4>
                                </div>
                                <Link to="/" className={cx('btn-thanhtoan')}>
                                    Thanh Toán
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
