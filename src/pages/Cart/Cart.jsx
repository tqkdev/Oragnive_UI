/* eslint-disable react-hooks/exhaustive-deps */
import className from 'classnames/bind';
import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCoins, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import { Link, Navigate } from 'react-router-dom';
import { createAxiosUser } from '../../components/axiosJWT/axiosJWT';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, deleteProductOrder, updateQualityOrder } from '../../redux/User/userApiRequest';
import { getOrderSuccess, deleteOrderSuccess, updateQualitySuccess } from '../../redux/User/OrderSlice';
import Loader from '../../components/Loader/Loader';

const cx = className.bind(styles);

function Cart() {
    const isUser = useSelector((state) => state.user.login.currentUser);

    const [IsLoader, setIsLoader] = useState(false);

    const dispatch = useDispatch();

    // lấy sản phẩm giỏ hàng
    let axiosOrder = createAxiosUser(isUser, dispatch, getOrderSuccess);
    const handleOrderCart = () => {
        dispatch(getOrder(isUser?._id, isUser?.accessToken, axiosOrder));
    };
    useEffect(() => {
        handleOrderCart();
    }, []);

    // Tính tổng tiền
    const isOrdercart = useSelector((state) => state.order.product.order);
    const productCart = isOrdercart.order;
    if (productCart.length > 0) {
        var totalPrice = productCart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.product_price * currentValue.quality;
        }, 0);
    }

    // Xóa sản phẩm
    let axiosDeleteOrder = createAxiosUser(isUser, dispatch, deleteOrderSuccess);
    const handleDeleteOrder = (productId) => {
        setIsLoader(true);
        const newProductOrder = {
            product_id: productId,
        };
        dispatch(deleteProductOrder(isUser?._id, isUser?.accessToken, newProductOrder, axiosDeleteOrder))
            .then(() => {
                dispatch(getOrder(isUser?._id, isUser?.accessToken, axiosOrder));
            })
            .catch((error) => {
                console.error('Lỗi khi xóa sản phẩm:', error);
                setIsLoader(false);
            })
            .finally(() => {
                setIsLoader(false);
            });
    };

    // tăng số lượng sản phẩm
    let axiosUpdateQuality = createAxiosUser(isUser, dispatch, updateQualitySuccess);
    const increaseQuantity = (product) => {
        setIsLoader(true);
        const increase = product.quality + 1;
        const productOrder = {
            quality: increase,
            product_id: product.product_id,
        };
        dispatch(updateQualityOrder(isUser?._id, isUser?.accessToken, productOrder, axiosUpdateQuality))
            .then(() => {
                dispatch(getOrder(isUser?._id, isUser?.accessToken, axiosOrder));
            })
            .catch((error) => {
                console.error('Lỗi khi tăng số lượng sản phẩm:', error);
                setIsLoader(false);
            })
            .finally(() => {
                setIsLoader(false);
            });
    };
    // giảm số lượng sản phẩm
    const decreaseQuantity = (product) => {
        if (product.quality > 1) {
            setIsLoader(true);
            const increase = product.quality - 1;
            const productOrder = {
                quality: increase,
                product_id: product.product_id,
            };
            dispatch(updateQualityOrder(isUser?._id, isUser?.accessToken, productOrder, axiosOrder))
                .then(() => {
                    dispatch(getOrder(isUser?._id, isUser?.accessToken, axiosOrder));
                })
                .catch((error) => {
                    console.error('Lỗi khi giảm số lượng sản phẩm:', error);
                })
                .finally(() => {
                    setIsLoader(false);
                });
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

                            {productCart.length === 0 ? (
                                <h3 className={cx('giohangtrong')}>Giỏ hàng trống</h3>
                            ) : (
                                productCart.map((product) => (
                                    <div key={product._id} className={cx('item-cart')}>
                                        <div className={cx('info-cart', 'col1')}>
                                            <div className={cx('img-cart')}>
                                                <img src={product.product_image} alt={product.product_name} />
                                            </div>
                                            <div className={cx('name')}>
                                                <h3>{product.product_name}</h3>
                                            </div>
                                        </div>

                                        <div className={cx('price', 'col')}>
                                            <p>{product.product_price} đ</p>
                                        </div>

                                        {/* <Counter product={product} handleReload={handleReload} /> */}

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

                                {productCart.length === 0 ? (
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
