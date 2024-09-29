import className from 'classnames/bind';
import styles from './Order.module.scss';
import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxiosAdmin } from '../../../components/axiosJWT/axiosJWT';
import { loginSuccess } from '../../../redux/Admin/adminSlice';

const cx = className.bind(styles);

function Order() {
    const isAdmin = useSelector((state) => state.admin.login.currentAdmin);

    const [don_Dat_hangs, set_Don_Dat_hang] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const dispatch = useDispatch();
    let axiosJWT = createAxiosAdmin(isAdmin, dispatch, loginSuccess);

    // xử lí phân trang
    const handleChange = (event, value) => {
        setPage(value);
    };

    // get data mặc định all
    useEffect(() => {
        fetchApi();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const fetchApi = async () => {
        try {
            const res = await axiosJWT.get(
                `${import.meta.env.VITE_URL_BACKEND}/placedOrder/getAllPlacedOrders?page=${page}&limit=${5}`,
                {
                    headers: { token: `Bearer ${isAdmin?.data.accessToken}` },
                },
            );
            console.log(res);

            const productmap = res.data.data.orders;
            const totalPages = res.data.data.totalPages;
            set_Don_Dat_hang(productmap);
            setTotalPages(totalPages);
        } catch (error) {
            console.log('error');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('container')}>
                    {/* ////////////////////// */}
                    {don_Dat_hangs.map((don_Dat_hang) => (
                        <div key={don_Dat_hang._id} className={cx('baoquanh')}>
                            <div className={cx('title-header')}>
                                <div className={cx('admin')}>
                                    <button className={cx('avatar')}>
                                        <img
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg"
                                            alt="avatar"
                                        />
                                    </button>
                                    <div className={cx('info')}>
                                        <p className={cx('name')}>{don_Dat_hang.user_id.username}</p>
                                    </div>
                                </div>
                                <h3>Đơn hàng: {don_Dat_hang._id}</h3>
                                <p>Tổng tiền: {don_Dat_hang.total_amount}đ</p>
                                <p>Tổng số lượng: {don_Dat_hang.total_quantity}</p>
                                <p>Ngày đặt hàng: {new Date(don_Dat_hang.order_date).toLocaleDateString()}</p>
                            </div>
                            <div className={cx('listproduct')}>
                                <div className={cx('bg-item')}>
                                    {don_Dat_hang.order_items.map((item) => (
                                        <div key={item._id} className={cx('item')}>
                                            <div className={cx('img-item')}>
                                                <img src={item.product_image} alt={item.product_name} />
                                            </div>
                                            <div className={cx('info-item')}>
                                                <h1 className={cx('title-item')}>{item.product_name}</h1>
                                                <p className={cx('price-item')}>{item.product_price}đ</p>
                                                <p className={cx('description-item')}>số lượng: x{item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* /////////////////////// */}
                </div>
                <div className={cx('shop-page')}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        size="large"
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChange}
                    ></Pagination>
                </div>
            </div>
        </div>
    );
}

export default Order;
