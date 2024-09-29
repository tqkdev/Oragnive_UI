import className from 'classnames/bind';
import styles from './InfoUser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCoins, faGear, faTag, faTicket } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate } from 'react-router-dom';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxiosUser } from '../../components/axiosJWT/axiosJWT';
import { loginSuccess } from '../../redux/User/userSlice';

const cx = className.bind(styles);

function InfoUser() {
    const isUser = useSelector((state) => state.user.login.currentUser);

    const [don_Dat_hangs, set_Don_Dat_hang] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const dispatch = useDispatch();
    let axiosJWT = createAxiosUser(isUser, dispatch, loginSuccess);

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
                `${import.meta.env.VITE_URL_BACKEND}/placedOrder/getPlacedOrder/${
                    isUser?.data._id
                }?page=${page}&limit=${5}`,
                {
                    headers: { token: `Bearer ${isUser?.data.accessToken}` },
                },
            );
            const productmap = res.data.data.orders;
            const totalPages = res.data.data.totalPages;
            set_Don_Dat_hang(productmap);
            setTotalPages(totalPages);
        } catch (error) {
            console.log(error);
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
                <h1 className={cx('title')}>Thông tin</h1>
            </div>

            <div className={cx('container')}>
                <div className={cx('main')}>
                    <div className={cx('sidebar')}>
                        <div className={cx('sidebar_inner')}>
                            <div className={cx('title-header')}>
                                <div className={cx('admin')}>
                                    <button className={cx('avatar')}>
                                        <img
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg"
                                            alt="avatar"
                                        />
                                    </button>
                                    <div className={cx('info')}>
                                        <p className={cx('name')}>{isUser?.data.username}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('option')}>
                                <ul className={cx('ul')}>
                                    <li className={cx('option-li', 'active')}>
                                        <FontAwesomeIcon className={cx('icon-option')} icon={faNewspaper} />
                                        <Link className={cx('option-link')}>Đơn hàng đã đặt</Link>
                                    </li>
                                    <li className={cx('option-li')}>
                                        <FontAwesomeIcon className={cx('icon-option')} icon={faBell} />
                                        <Link className={cx('option-link')}>Thông báo</Link>
                                    </li>
                                    <li className={cx('option-li')}>
                                        <FontAwesomeIcon className={cx('icon-option')} icon={faTicket} />
                                        <Link className={cx('option-link')}>Kho Voucher</Link>
                                    </li>

                                    <li className={cx('option-li')}>
                                        <FontAwesomeIcon className={cx('icon-option')} icon={faCoins} />
                                        <Link className={cx('option-link')}>Xu</Link>
                                    </li>
                                    <li className={cx('option-li')}>
                                        <FontAwesomeIcon className={cx('icon-option')} icon={faTag} />
                                        <Link className={cx('option-link')}>Dịch vụ</Link>
                                    </li>
                                    <li className={cx('option-li')}>
                                        <FontAwesomeIcon className={cx('icon-option')} icon={faGear} />
                                        <Link className={cx('option-link')}>Cài đặt</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={cx('listproduct')}>
                        {don_Dat_hangs.map((don_Dat_hang) => (
                            <div key={don_Dat_hang._id} className={cx('bg-item')}>
                                <h2>Đơn hàng: {don_Dat_hang._id}</h2>
                                <p>Tổng tiền: {don_Dat_hang.total_amount}đ</p>
                                <p>Tổng số lượng: {don_Dat_hang.total_quantity}</p>
                                <p>Ngày đặt hàng: {new Date(don_Dat_hang.order_date).toLocaleDateString()}</p>
                                {don_Dat_hang.order_items.map((item) => (
                                    <div key={item._id} className={cx('item')}>
                                        <div className={cx('img-item')}>
                                            <Link to={`/detail/$`}>
                                                <img src={item.product_image} alt={item.product_name} />
                                            </Link>
                                        </div>
                                        <div className={cx('info-item')}>
                                            <Link to={`/detail/${item.product_id}`}>
                                                <h1 className={cx('title-item')}>{item.product_name}</h1>
                                            </Link>
                                            <p className={cx('price-item')}>{item.product_price}</p>
                                            <p className={cx('description-item')}>số lượng: x{item.quantity}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className={cx('repurchase')}>
                                    <button className={cx('btn-repurchase')}>Mua lại</button>
                                </div>
                            </div>
                        ))}

                        {/* ////// */}

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
            </div>
        </div>
    );
}

export default InfoUser;
