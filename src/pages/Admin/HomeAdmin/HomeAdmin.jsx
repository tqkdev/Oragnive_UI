import className from 'classnames/bind';
import styles from './HomeAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons/faSackDollar';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import TickPlacementBars from './TickPlacementBars/TickPlacementBars';
import BasicPie from './BasicPie/BasicPie';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createAxiosAdmin } from '../../../components/axiosJWT/axiosJWT';
import { loginSuccess } from '../../../redux/Admin/adminSlice';

const cx = className.bind(styles);

function HomeAdmin() {
    const isAdmin = useSelector((state) => state.admin.login.currentAdmin);
    const [productPrice, setProductPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [basicPie, setBasicPie] = useState([]);
    const [tickPlacementBars, setTickPlacementBars] = useState([]);

    const dispatch = useDispatch();
    let axiosJWT = createAxiosAdmin(isAdmin, dispatch, loginSuccess);

    // lấy sản phẩm giỏ hàng
    useEffect(() => {
        const handleFetchData = async () => {
            if (isAdmin) {
                try {
                    const res = await axiosJWT.get(`${import.meta.env.VITE_URL_BACKEND}/placedOrder/numberCategory`, {
                        headers: { token: `Bearer ${isAdmin?.data.accessToken}` },
                    });
                    setProductPrice(res.data.data.product_price);
                    setQuantity(res.data.data.quantity);
                    setBasicPie(res.data.data.BasicPie);
                    setTickPlacementBars(res.data.data.TickPlacementBars);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        handleFetchData();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    function formatPrice(productPrice) {
        if (productPrice >= 1000000) {
            return (productPrice / 1000000).toFixed(1) + ' triệu';
        } else if (productPrice >= 1000) {
            return (productPrice / 1000).toFixed(0) + ' nghìn';
        }
        return productPrice.toLocaleString('vi-VN'); // Hiện số gốc nếu nhỏ hơn 1,000
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('container-card')}>
                    <div className={cx('total-product')}>
                        <div className={cx('card-content')}>
                            <div className={cx('card-title')}>Tổng doanh thu</div>
                            <div className={cx('card-value')}> {formatPrice(productPrice)}</div>
                            <div className={cx('card-footer')}>
                                {/* <span className={cx('card-percentage')}>tăng 12%</span> */}
                                <span className={cx('since-last-month')}>within 7 days</span>
                            </div>
                        </div>
                        <div className={cx('card-icon')}>
                            <FontAwesomeIcon className={cx('icon-dollar')} icon={faSackDollar} />
                        </div>
                    </div>
                    <div className={cx('total-price')}>
                        <div className={cx('card-content')}>
                            <div className={cx('card-title')}>Tổng số lượng sản phẩm</div>
                            <div className={cx('card-value')}> {quantity}</div>
                            <div className={cx('card-footer')}>
                                {/* <span className={cx('card-percentage')}>tăng 12%</span> */}
                                <span className={cx('since-last-month')}>within 7 days</span>
                            </div>
                        </div>
                        <div className={cx('card-icon')}>
                            <FontAwesomeIcon className={cx('icon-shopping')} icon={faCartShopping} />
                        </div>
                    </div>
                </div>
                <div className={cx('container-circle')}>
                    <BasicPie basicPie={basicPie} />
                </div>
                <div className={cx('container-chart')}>
                    <TickPlacementBars tickPlacementBars={tickPlacementBars} />
                </div>
            </div>
        </div>
    );
}
export default HomeAdmin;
