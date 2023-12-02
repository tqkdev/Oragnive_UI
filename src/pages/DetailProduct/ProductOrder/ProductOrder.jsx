import { useState } from 'react';
import className from 'classnames/bind';
import styles from './ProductOrder.module.scss';

import { createAxiosUser } from '../../../components/axiosJWT/axiosJWT';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../../../redux/User/userApiRequest';
import { updateOderSuccess } from '../../../redux/User/OrderSlice';

const cx = className.bind(styles);

// eslint-disable-next-line react/prop-types
function ProductOrder({ handleShowSwal, productDetail }) {
    const isUser = useSelector((state) => state.user.login.currentUser);

    const [quantity, setQuantity] = useState('1');
    const dispatch = useDispatch();

    const toLogin = () => {
        window.location.href = '/login';
    };

    // sử lý chỉ cho nhập số
    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity)) {
            setQuantity(newQuantity);
        } else {
            setQuantity('');
        }
    };

    // xử lý tăng
    const increaseQuantity = () => {
        setQuantity(quantity === '1' ? 2 : quantity + 1);
    };

    // xử lý giảm
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            setQuantity(1);
        }
    };

    // thêm sản phẩm vào giỏ hàng
    let axiosOrder = createAxiosUser(isUser, dispatch, updateOderSuccess);
    const handleAddOrder = (product) => {
        const newProductOrder = {
            product_id: product._id,
            product_name: product.name,
            product_image: product.image_url,
            product_price: product.price,
            product_slug: product.slug,
            quality: Number(quantity),
        };
        dispatch(updateOrder(isUser?._id, isUser?.accessToken, newProductOrder, axiosOrder));
    };
    const handleAddToCart = () => {
        if (isUser) {
            handleAddOrder(productDetail);
            handleShowSwal();
        } else {
            toLogin();
        }
    };

    return (
        <div className={cx('numer-product')}>
            <div className={cx('counter-product')}>
                <button className={cx('btn-decrease')} onClick={decreaseQuantity}>
                    -
                </button>
                <input className={cx('quantity')} value={quantity} onChange={handleQuantityChange} min="1" />
                <button className={cx('btn-increase')} onClick={increaseQuantity}>
                    +
                </button>
            </div>
            <button onClick={handleAddToCart} className={cx('btn-addtocart')}>
                Thêm vào giỏ hàng
            </button>
        </div>
    );
}

export default ProductOrder;
