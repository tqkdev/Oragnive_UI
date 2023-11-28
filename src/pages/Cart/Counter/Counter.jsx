import { useState } from 'react';
import className from 'classnames/bind';
import styles from './Counter.module.scss';

import { createAxios } from '../../CRUD/axiosJWT/axiosJWT';
import { useDispatch, useSelector } from 'react-redux';
import { updateQualityOrder } from '../../../redux/User/userApiRequest';
import { updateQualitySuccess } from '../../../redux/User/OrderSlice';

const cx = className.bind(styles);

// eslint-disable-next-line react/prop-types
function ProductOrder({ product, handleReload }) {
    // eslint-disable-next-line react/prop-types
    const [quantity, setQuantity] = useState(product.quality);

    const isUser = useSelector((state) => state.user.login.currentUser);
    const dispatch = useDispatch();
    let axiosOrder = createAxios(isUser, dispatch, updateQualitySuccess);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
        const productOrder = {
            quality: quantity + 1,
            // eslint-disable-next-line react/prop-types
            product_id: product.product_id,
        };
        updateQualityOrder(isUser?._id, dispatch, isUser?.accessToken, productOrder, axiosOrder);
        handleReload();
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            const newProductOrder = {
                quality: quantity - 1,
                // eslint-disable-next-line react/prop-types
                product_id: product.product_id,
            };
            updateQualityOrder(isUser?._id, dispatch, isUser?.accessToken, newProductOrder, axiosOrder);
            handleReload();
        } else {
            setQuantity(1);
        }
    };
    console.log(quantity);

    return (
        <div className={cx('numer-product')}>
            <div className={cx('counter-product')}>
                <button
                    className={cx('btn-decrease')}
                    onClick={() => {
                        decreaseQuantity();
                    }}
                >
                    -
                </button>
                <p className={cx('quantity')}>{quantity}</p>

                <button
                    className={cx('btn-increase')}
                    onClick={() => {
                        increaseQuantity();
                    }}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default ProductOrder;
