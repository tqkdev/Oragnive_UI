import className from 'classnames/bind';
import styles from './HomeAdmin.module.scss';

import { useEffect, useState } from 'react';
import * as request from '../../../utils/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowLeft, faHouse, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../../../redux/Admin/adminApiRequest';
import { createAxiosAdmin } from '../../../components/axiosJWT/axiosJWT';
import { loginSuccess } from '../../../redux/Admin/adminSlice';
import Loader from '../../../components/Loader/Loader';

const cx = className.bind(styles);

function HomeAdmin() {
    const isAdmin = useSelector((state) => state.admin.login.currentAdmin);

    const [allProducts, setallProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [IsLoader, setIsLoader] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxiosAdmin(isAdmin, dispatch, loginSuccess);

    // get product
    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoader(true);
                const res = await request.get('product');
                setallProducts(res);
                setIsLoader(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, [refresh]);

    // delete product
    const handleDelete = async (id) => {
        try {
            await deleteProduct(id, dispatch, navigate, isAdmin.accessToken, axiosJWT);
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

                            {allProducts.map((product) => (
                                <div key={product._id} className={cx('product')}>
                                    <div className={cx('header-name', 'product-name')}>{product.name}</div>
                                    <div className={cx('header-category', 'product-category')}> {product.category}</div>
                                    <div className={cx('header-des', 'product-des')}>{product.description}</div>
                                    <div className={cx('header-action')}>
                                        <Link to={`/admin/main/read/${product.slug}`} className={cx('btn-read')}>
                                            Read
                                        </Link>
                                        <Link to={`/admin/main/update/${product.slug}`} className={cx('btn-edit')}>
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(product._id)} className={cx('btn-delete')}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default HomeAdmin;
