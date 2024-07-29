import className from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faAngleRight, faArrowLeft, faHouse, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '@mui/material';

import styles from './HomeAdmin.module.scss';
import * as request from '../../../utils/request';
import { createAxiosAdmin } from '../../../components/axiosJWT/axiosJWT';
import { loginSuccess } from '../../../redux/Admin/adminSlice';
import Loader from '../../../components/Loader/Loader';

const cx = className.bind(styles);

function HomeAdmin() {
    const isAdmin = useSelector((state) => state.admin.login.currentAdmin);

    const [allProducts, setallProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [IsLoader, setIsLoader] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    let axiosJWT = createAxiosAdmin(isAdmin, dispatch, loginSuccess);

    // xử lí phân trang
    const handleChange = (event, value) => {
        setPage(value);
    };

    // get product
    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoader(true);
                const res = await request.get('product', {
                    params: {
                        page: page,
                        limit: 10,
                    },
                });
                const totalPages = res.data.pagination.totalPages;
                setTotalPages(totalPages);
                const productmap = res.data.products;
                setallProducts(productmap);
                setIsLoader(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, [refresh, page]);

    // delete product
    const handleDelete = async (id) => {
        try {
            await axiosJWT.delete(`${import.meta.env.VITE_URL_BACKEND}/product/` + id, '', {
                headers: { token: `Bearer ${isAdmin?.data.accessToken}` },
            });
            setRefresh(!refresh);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {IsLoader && <Loader />}
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('container')}>
                        <div className={cx('line')}>
                            <div className={cx('header-path')}>
                                <FontAwesomeIcon className={cx('path-iconback')} icon={faArrowLeft} />
                                <div className={cx('path')}>
                                    <FontAwesomeIcon className={cx('path-iconhouse')} icon={faHouse} />
                                    <FontAwesomeIcon className={cx('path-iconright')} icon={faAngleRight} />
                                    <p className={cx('path-lv1')}>Products</p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('box-create')}>
                            <h2 className={cx('title')}>List of Products</h2>
                            <Link className={cx('btn-create')} to={'/admin/main/create'}>
                                <FontAwesomeIcon className={cx('icon-plus')} icon={faPlus} />
                                <p className={cx('text-add')}>Add</p>
                            </Link>
                        </div>
                        <div className={cx('list-product')}>
                            <div className={cx('header')}>
                                <div className={cx('header-name')}>Name</div>
                                <div className={cx('header-category')}>Category</div>
                                <div className={cx('header-des')}>description</div>
                                <div className={cx('header-action')}>Action</div>
                            </div>

                            {allProducts?.map((product) => (
                                <div key={product._id} className={cx('product')}>
                                    <div className={cx('header-name', 'product-name')}>{product.name}</div>
                                    <div className={cx('header-category', 'product-category')}> {product.category}</div>
                                    <div className={cx('header-des', 'product-des')}>{product.description}</div>
                                    <div className={cx('header-action')}>
                                        <Link to={`/admin/main/read/${product._id}`} className={cx('btn-read')}>
                                            Read
                                        </Link>
                                        <Link to={`/admin/main/update/${product._id}`} className={cx('btn-edit')}>
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(product._id)} className={cx('btn-delete')}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={cx('shop-page')}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                // size="large"
                                variant="outlined"
                                shape="rounded"
                                onChange={handleChange}
                            ></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default HomeAdmin;
