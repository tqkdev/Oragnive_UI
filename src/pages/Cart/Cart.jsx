/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCoins, faTrash } from '@fortawesome/free-solid-svg-icons';

import styles from './Cart.module.scss';
import { createAxiosUser } from '../../components/axiosJWT/axiosJWT';
import { loginSuccess } from '../../redux/User/userSlice';
import Loader from '../../components/Loader/Loader';

const cx = className.bind(styles);

function Cart() {
    const isUser = useSelector((state) => state.user.login.currentUser);

    const [IsLoader, setIsLoader] = useState(false);
    const [productCart, setProductCart] = useState([]);

    const dispatch = useDispatch();

    let axiosJWT = createAxiosUser(isUser, dispatch, loginSuccess);

    const toLogin = () => {
        window.location.href = '/login';
    };

    // lấy sản phẩm giỏ hàng
    useEffect(() => {
        const handleOrderCart = async () => {
            if (isUser) {
                try {
                    const res = await axiosJWT.get(`${import.meta.env.VITE_URL_BACKEND}/order/${isUser?.data._id}`, {
                        headers: { token: `Bearer ${isUser?.data.accessToken}` },
                    });
                    // console.log(res);
                    const setProductCartmap = res.data.data.order;
                    setProductCart(setProductCartmap);
                } catch (error) {
                    console.log(error);
                }
            } else {
                toLogin();
            }
        };
        handleOrderCart();
    }, []);

    // Tính tổng tiền
    let totalPrice = 0;
    if (productCart?.length > 0) {
        totalPrice = productCart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.product_price * currentValue.quality;
        }, 0);
    }

    // Xóa sản phẩm
    const handleDeleteOrder = async (productId) => {
        setIsLoader(true);
        const newProductOrder = {
            product_id: productId,
        };
        // kiểm tra nếu đã đăng nhập thì hiện cart || login
        if (isUser) {
            try {
                const res = await axiosJWT.put(
                    `${import.meta.env.VITE_URL_BACKEND}/order/delete/` + isUser?.data._id,
                    newProductOrder,
                    {
                        headers: { token: `Bearer ${isUser?.data.accessToken}` },
                    },
                );
                const setProductCartmap = res.data.data.order;
                setProductCart(setProductCartmap);
                setIsLoader(false);
            } catch (error) {
                setIsLoader(false);
                console.log(error);
            }
        } else {
            toLogin();
        }
    };

    // tăng số lượng sản phẩm
    const increaseQuantity = async (product) => {
        setIsLoader(true);
        const increase = product.quality + 1;
        const productOrder = {
            quality: increase,
            product_id: product.product_id,
        };
        try {
            const res = await axiosJWT.put(
                `${import.meta.env.VITE_URL_BACKEND}/order/quality/${isUser?.data._id}`,
                productOrder,
                {
                    headers: { token: `Bearer ${isUser?.data.accessToken}` },
                },
            );
            const productCartmap = res.data.data.order;
            setProductCart(productCartmap);
            setIsLoader(false);
        } catch (error) {
            console.log(error);
        }
    };

    // giảm số lượng sản phẩm
    const decreaseQuantity = async (product) => {
        if (product.quality > 1) {
            setIsLoader(true);
            const increase = product.quality - 1;
            const productOrder = {
                quality: increase,
                product_id: product.product_id,
            };
            try {
                const res = await axiosJWT.put(
                    `${import.meta.env.VITE_URL_BACKEND}/order/quality/${isUser?.data._id}`,
                    productOrder,
                    {
                        headers: { token: `Bearer ${isUser?.data.accessToken}` },
                    },
                );
                const productCartmap = res.data.data.order;
                setProductCart(productCartmap);
                setIsLoader(false);
            } catch (error) {
                console.log(error);
            }
        }
    };
    // check user
    if (!isUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg-header')}></div>
            <div className={cx('bg-about-us')}>
                <h1 className={cx('title')}>Giỏ hàng</h1>
            </div>

            <div className={cx('main')}>
                <div className={cx('inner')}>
                    <Link to={'/'} className={cx('back')}>
                        <FontAwesomeIcon className={cx('icon-back')} icon={faArrowLeft} />
                        Quay lai
                    </Link>
                    <div className={cx('container')}>
                        {IsLoader && <Loader />}
                        <div className={cx('product')}>
                            <div className={cx('header')}>
                                <div className={cx('col1')}>
                                    <h4>Tên sản phẩm</h4>
                                </div>
                                <div className={cx('col')}>
                                    <h4>Đơn giá</h4>
                                </div>
                                <div className={cx('col')}>
                                    <h4>Số lượng</h4>
                                </div>
                                <div className={cx('col', 'colthanhtien')}>
                                    <h4>Thành tiền</h4>
                                </div>
                                <div className={cx('col')}>
                                    <h4>Thao tác</h4>
                                </div>
                            </div>

                            <div className={cx('border')}></div>

                            {productCart?.length === 0 ? (
                                <h3 className={cx('giohangtrong')}>Giỏ hàng trống</h3>
                            ) : (
                                productCart?.map((product) => (
                                    <div key={product._id} className={cx('item-cart')}>
                                        <div className={cx('info-cart', 'col1')}>
                                            <div className={cx('img-cart')}>
                                                <div className={cx('img-cart-border')}>
                                                    <img src={product.product_image} alt={product.product_name} />
                                                </div>
                                            </div>
                                            <div className={cx('name')}>
                                                <h3>{product.product_name}</h3>
                                            </div>
                                        </div>

                                        <div className={cx('price', 'col')}>
                                            <p>{product.product_price} đ</p>
                                        </div>

                                        <div className={cx('numer-product')}>
                                            <div className={cx('counter-product')}>
                                                <button
                                                    className={cx('btn-decrease')}
                                                    onClick={() => {
                                                        decreaseQuantity(product);
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <p className={cx('quantity')}>{product.quality}</p>

                                                <button
                                                    className={cx('btn-increase')}
                                                    onClick={() => {
                                                        increaseQuantity(product);
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/*  */}

                                        <div className={cx('total-price', 'col')}>
                                            <p>{product.product_price * product.quality} đ</p>
                                        </div>

                                        <div className={cx('btn-delete', 'col', 'repon')}>
                                            <FontAwesomeIcon
                                                onClick={() => handleDeleteOrder(product.product_id)}
                                                className={cx('icon-delete')}
                                                icon={faTrash}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className={cx('pay')}>
                            <div className={cx('tamtinh')}>
                                <FontAwesomeIcon className={cx('icon-coins')} icon={faCoins} />
                                Tạm tính
                            </div>
                            <div className={cx('border-pay')}></div>
                            <div className={cx('total')}>
                                <p className={cx('total-txt')}>Tổng cộng</p>

                                {productCart?.length === 0 ? (
                                    <p className={cx('total-number')}>0 đ</p>
                                ) : (
                                    <p className={cx('total-number')}>{totalPrice} đ</p>
                                )}
                            </div>
                            <div className={cx('dathang')}>
                                <button className={cx('btn-dathang')}>Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
