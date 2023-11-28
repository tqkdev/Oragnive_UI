/* eslint-disable react-hooks/exhaustive-deps */
import className from 'classnames/bind';
import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCoins, faTrash } from '@fortawesome/free-solid-svg-icons';
// import Counter from './Counter/Counter';

const cx = className.bind(styles);

function Cart() {
    const handleDeleteOrder = (productId) => {
        const newProductOrder = {
            product_id: productId,
        };
        console.log(newProductOrder);
    };

    const increaseQuantity = (product) => {
        const increase = product.quality + 1;
        const productOrder = {
            quality: increase,
            product_id: product.product_id,
        };
        console.log(productOrder);
    };

    const decreaseQuantity = (product) => {
        if (product.quality > 1) {
            const increase = product.quality - 1;
            const productOrder = {
                quality: increase,
                product_id: product.product_id,
            };
            console.log(productOrder);
        }
    };

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

                            {/* ow day */}

                            {/*  */}

                            <div className={cx('item-cart')}>
                                <div className={cx('info-cart', 'col1')}>
                                    <div className={cx('img-cart')}>
                                        <img
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779867/ORGAVIVE/AvatarProduct/bacha3_woxj9c.jpg"
                                            alt="aaa"
                                        />
                                    </div>
                                    <div className={cx('name')}>
                                        <h3>taooo</h3>
                                    </div>
                                </div>

                                <div className={cx('price', 'col')}>
                                    <p>2222 đ</p>
                                </div>

                                {/* <Counter product={product} handleReload={handleReload} /> */}

                                <div className={cx('numer-product')}>
                                    <div className={cx('counter-product')}>
                                        <button className={cx('btn-decrease')}>-</button>
                                        <p className={cx('quantity')}>3</p>

                                        <button className={cx('btn-increase')}>+</button>
                                    </div>
                                </div>

                                {/*  */}

                                <div className={cx('total-price', 'col')}>
                                    <p>10000 đ</p>
                                </div>

                                <div className={cx('btn-delete', 'col', 'repon')}>
                                    <FontAwesomeIcon className={cx('icon-delete')} icon={faTrash} />
                                </div>
                            </div>
                            {/*  */}
                        </div>
                        <div className={cx('pay')}>
                            <div className={cx('tamtinh')}>
                                <FontAwesomeIcon className={cx('icon-coins')} icon={faCoins} />
                                Tạm tính
                            </div>
                            <div className={cx('border-pay')}></div>
                            <div className={cx('total')}>
                                <p className={cx('total-txt')}>Tổng cộng</p>

                                {/* {productCart.length === 0 ? (
                                    <p className={cx('total-number')}>0 đ</p>
                                ) : (
                                    <p className={cx('total-number')}>{totalPrice} đ</p>
                                )} */}

                                <p className={cx('total-number')}>0 đ</p>

                                {/*  */}
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
