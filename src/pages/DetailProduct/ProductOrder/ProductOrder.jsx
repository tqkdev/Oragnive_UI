import { useState } from 'react';
import className from 'classnames/bind';
import styles from './ProductOrder.module.scss';

const cx = className.bind(styles);

// eslint-disable-next-line react/prop-types
function ProductOrder({ handleShowSwal }) {
    const [quantity, setQuantity] = useState('1');

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity)) {
            setQuantity(newQuantity);
        } else {
            setQuantity('');
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity === '1' ? 2 : quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            setQuantity(1);
        }
    };

    const handleAddToCart = () => {
        // Thực hiện các xử lý liên quan đến thêm sản phẩm vào giỏ hàng tại đây
        handleShowSwal(); // Gọi hàm handleShowSwal để hiển thị thông báo
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
