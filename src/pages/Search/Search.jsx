import className from 'classnames/bind';
import styles from './Search.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import * as request from '../../utils/request';
import { Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createAxiosUser } from '../../components/axiosJWT/axiosJWT';
import { loginSuccess } from '../../redux/User/userSlice';

const cx = className.bind(styles);

function Search() {
    const isUser = useSelector((state) => state.user.login.currentUser);

    const [isswal, setIsswal] = useState(false);
    const [seach, setSearch] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    let axiosJWT = createAxiosUser(isUser, dispatch, loginSuccess);

    const handleShowSwal = () => {
        setIsswal(!isswal);
    };

    // Thêm sản phẩm vào giỏ hàng
    const handleAddOrder = async (product) => {
        const newProductOrder = {
            product_id: product._id,
            product_name: product.name,
            product_image: product.image_url,
            product_price: product.price,
            product_category: product.category,
            quantity: 1,
        };
        if (isUser) {
            try {
                await axiosJWT.put(`${import.meta.env.VITE_URL_BACKEND}/order/${isUser?.data._id}`, newProductOrder, {
                    headers: { token: `Bearer ${isUser?.data.accessToken}` },
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    // xử lí phân trang
    const handleChange = (event, value) => {
        setPage(value);
    };

    const searchParams = useParams();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await request.get('search/keyword', {
                    params: {
                        q: searchParams.q,
                        page: page,
                        limit: 8,
                    },
                });
                const totalPages = res.data.totalPages;
                const dataMap = res.data.products;
                setSearch(dataMap);
                setTotalPages(totalPages);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, [searchParams.q, page]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg-header')}></div>
            <div className={cx('bg-about-us')}>
                <h1 className={cx('title')}>Tìm kiếm: {searchParams.q}</h1>
            </div>

            <div className={cx('inner')}>
                <div className={cx('container')}>
                    <div className={cx('shop-list')}>
                        {seach?.map((product) => (
                            <div key={product._id} className={cx('item')}>
                                <div className={cx('img-item')}>
                                    <Link to={`/detail/${product._id}`}>
                                        <img src={product.image_url} alt={product.name} />
                                    </Link>
                                </div>
                                <div className={cx('info-item')}>
                                    <Link to={`/detail/${product._id}`}>
                                        <h1 className={cx('title-item')}>{product.name}</h1>
                                    </Link>
                                    <p className={cx('price-item')}>{product.price}đ</p>
                                    <p className={cx('description-item')}>{product.description}</p>
                                    <button
                                        onClick={() => {
                                            handleAddOrder(product);
                                            handleShowSwal();
                                        }}
                                        className={cx('btn-addtocart')}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        ))}
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

            {isswal && (
                <div className={cx('swal-overlay')}>
                    <div onClick={handleShowSwal} className={cx('swal-overlay1')}></div>
                    <div className={cx('swal-modal')}>
                        <div className={cx('swal-icon')}>
                            <div className={cx('spinner')}>
                                <div className={cx('success')}>
                                    <FontAwesomeIcon className={cx('icon-success')} icon={faCheck} />
                                </div>
                            </div>
                        </div>
                        <h5 className={cx('swal-title')}>Name product</h5>
                        <p className={cx('swal-text')}>is added to cart !</p>
                        <div className={cx('swal-footer')}>
                            <button onClick={handleShowSwal} className={cx('btn-oke')}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
