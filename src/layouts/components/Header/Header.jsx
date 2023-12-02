import className from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGear, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';

import { logoutUser } from '../../../redux/User/userApiRequest';
import { logoutSuccess } from '../../../redux/User/userSlice';
import { createAxiosUser } from '../../../components/axiosJWT/axiosJWT';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrder, deleteProductOrder } from '../../../redux/User/userApiRequest';
import { getOrderSuccess, deleteOrderSuccess } from '../../../redux/User/OrderSlice';
import Loader from '../../../components/Loader/Loader';

const cx = className.bind(styles);

function Header() {
    const isUser = useSelector((state) => state.user?.login.currentUser);

    const [IsLoader, setIsLoader] = useState(false);
    const [IsLoaderCart, setIsLoaderCart] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [issetting, setIsSetting] = useState(false);
    const [isiconBars, setIsIconBars] = useState(false);
    const [isNavCenter, setIsNavCenter] = useState(true);

    const headerRef = useRef();
    const resultCartRef = useRef();
    const avatarRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toLogin = () => {
        window.location.href = '/login';
    };

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

    // click vào bất kỳ nơi nào khác ngoài cart, đóng result-cart
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

    // ẩn || hiện giỏ hàng
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    // hiện setting
    const toggleSetting = () => {
        setIsSetting(!issetting);
    };
    const handleSettingClick = (event) => {
        event.stopPropagation();
        toggleSetting();
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

    // redux
    // logout
    let axiosJWT = createAxiosUser(isUser, dispatch, logoutSuccess);
    const handleLogOut = () => {
        setIsLoader(true);
        logoutUser(dispatch, navigate, isUser?.accessToken, axiosJWT).finally(() => {
            setIsLoader(false);
        });
        localStorage.removeItem('persist:root');
    };

    // handle giỏ hàng
    const handleCartButtonClick = (event) => {
        // Ngăn chặn sự kiện click lan ra bên ngoài
        event.stopPropagation();
        // kiểm tra nếu đã đăng nhập thì hiện cart || login
        if (isUser) {
            // getOrder(isUser?._id, dispatch, isUser?.accessToken, axiosOrder);
            dispatch(getOrder(isUser?._id, isUser?.accessToken, axiosOrder));
            toggleCart();
        } else {
            toLogin();
        }
    };

    // lấy sản phẩm giỏ hàng
    let axiosOrder = createAxiosUser(isUser, dispatch, getOrderSuccess);
    const isOrdercart = useSelector((state) => state.order?.product.order);
    const productCart = isOrdercart ? isOrdercart.order : [];

    // Tính tổng tiền giỏ hàng
    if (productCart.length > 0) {
        var totalPrice = productCart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.product_price * currentValue.quality;
        }, 0);
    }

    // Xóa sản phẩm giỏ hàng
    let axiosDeleteOrder = createAxiosUser(isUser, dispatch, deleteOrderSuccess);
    const handleDeleteOrder = (productId) => {
        setIsLoaderCart(true);
        const newProductOrder = {
            product_id: productId,
        };
        dispatch(deleteProductOrder(isUser?._id, isUser?.accessToken, newProductOrder, axiosDeleteOrder))
            .then(() => {
                dispatch(getOrder(isUser?._id, isUser?.accessToken, axiosOrder));
            })
            .catch((error) => {
                console.error('Lỗi khi xóa sản phẩm:', error);
            })
            .finally(() => {
                setIsLoaderCart(false);
            });
    };

    return (
        <>
            {IsLoader && <Loader />}
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
                        <button onClick={(e) => handleCartButtonClick(e)} className={cx('icon-cart')}>
                            <img
                                src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779884/ORGAVIVE/icons/icon-cart-3_n8v87o.png"
                                alt="icon-cart"
                            />
                        </button>

                        {isUser ? (
                            <div className={cx('container-avatar')}>
                                <button onClick={(e) => handleSettingClick(e)} className={cx('avatar')}>
                                    <img
                                        src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg"
                                        alt="avatar"
                                    />
                                </button>

                                {issetting && (
                                    <div ref={avatarRef} className={cx('setting')}>
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
                            <div ref={resultCartRef} className={cx('result-cart')}>
                                {IsLoaderCart && <Loader />}
                                <h3 className={cx('cart-title')}>Sản phẩm trong giỏ hàng:</h3>

                                {productCart.length === 0 ? (
                                    <h3 className={cx('giohangtrong')}>Giỏ hàng trống</h3>
                                ) : (
                                    productCart.map((product) => (
                                        <div key={product._id} className={cx('item-cart')}>
                                            <div className={cx('img-cart')}>
                                                <img src={product.product_image} alt={product.product_image} />
                                            </div>
                                            <div className={cx('info-cart')}>
                                                <div className={cx('info-name')}>
                                                    <h3>{product.product_name}</h3>
                                                    <h4>{product.product_price}đ</h4>
                                                </div>
                                                <div className={cx('quality')}>
                                                    <h5>X</h5>
                                                    <h3>{product.quality}</h3>
                                                </div>

                                                <div className={cx('info-quality')}>
                                                    <h4>{product.product_price * product.quality}đ</h4>
                                                </div>
                                            </div>
                                            <div
                                                onClick={() => handleDeleteOrder(product.product_id)}
                                                className={cx('icon-delete')}
                                            >
                                                <FontAwesomeIcon icon={faXmark} />
                                            </div>
                                        </div>
                                    ))
                                )}

                                <div className={cx('chitiet')}>
                                    <Link onClick={toggleCart} to={'/cart'}>
                                        Xem chi tiết
                                    </Link>
                                </div>

                                <div className={cx('thanhtoan')}>
                                    <div className={cx('total-rice')}>
                                        <h5>Tổng:</h5>
                                        {productCart.length === 0 ? <h4>0đ</h4> : <h4>{totalPrice}đ</h4>}
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
        </>
    );
}

export default Header;
