import className from 'classnames/bind';
import styles from './Create.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addProduct } from '../../../redux/Admin/adminApiRequest';
import { loginSuccess } from '../../../redux/Admin/adminSlice';
import { createAxiosAdmin } from '../../../components/axiosJWT/axiosJWT';
import Loader from '../../../components/Loader/Loader';

const cx = className.bind(styles);

function Create() {
    const isAdmin = useSelector((state) => state.admin.login.currentAdmin);

    const [IsLoader, setIsLoader] = useState(false);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [khoiLuong, setKhoiLuong] = useState('');
    const [nguonGoc, setNguonGoc] = useState('');
    const [slug, setSlug] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let axiosJWT = createAxiosAdmin(isAdmin, dispatch, loginSuccess);

    function handleCreate(e) {
        e.preventDefault();
        setIsLoader(true);
        const newProduct = {
            name: name,
            category: category,
            image_url: image,
            description: description,
            price: price,
            khoiluong: khoiLuong,
            nguongoc: nguonGoc,
            slug: slug,
        };
        addProduct(newProduct, dispatch, navigate, isAdmin?.data.accessToken, axiosJWT).finally(() => {
            setIsLoader(false);
        });
    }
    return (
        <>
            {IsLoader && <Loader />}
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('container')}>
                        <div className={cx('line')}>
                            <div className={cx('header-path')}>
                                <Link to={'/admin/main'}>
                                    <FontAwesomeIcon className={cx('path-iconback')} icon={faArrowLeft} />
                                </Link>
                                <div className={cx('path')}>
                                    <FontAwesomeIcon className={cx('path-iconhouse')} icon={faHouse} />
                                    <FontAwesomeIcon className={cx('path-iconright')} icon={faAngleRight} />
                                    <p className={cx('path-lv1')}>Products</p>
                                    <FontAwesomeIcon className={cx('path-iconright2')} icon={faAngleRight} />
                                    <p className={cx('path-lv2')}>Create</p>
                                </div>
                            </div>
                        </div>
                        <h2 className={cx('title')}>Create</h2>
                        <div className={cx('create')}>
                            <form onSubmit={handleCreate} className={cx('form')}>
                                <div className={cx('form-input')}>
                                    <p className={cx('txt-input')}>Name</p>
                                    <input onChange={(e) => setName(e.target.value)} className={cx('name', 'more')} />
                                </div>

                                <div className={cx('form-input')}>
                                    <p className={cx('txt-input')}>Category &#10088; Rau, Củ, Quả, Trái cây &#10089;</p>
                                    <input
                                        onChange={(e) => setCategory(e.target.value)}
                                        className={cx('category', 'more')}
                                    />
                                </div>

                                <div className={cx('form-input')}>
                                    <p className={cx('txt-input')}>image_url</p>
                                    <input
                                        onChange={(e) => setImage(e.target.value)}
                                        className={cx('image_url', 'more')}
                                    />
                                </div>

                                <div className={cx('form-input')}>
                                    <p className={cx('txt-input')}>Description</p>
                                    <textarea
                                        onChange={(e) => setDescription(e.target.value)}
                                        className={cx('description', 'more')}
                                    />
                                </div>

                                <div className={cx('form-input')}>
                                    <p className={cx('txt-input')}>Price &#10088; Đồng &#10089;</p>
                                    <input
                                        onChange={(e) => setPrice(e.target.value)}
                                        className={cx('price', 'more')}
                                        type="number"
                                    />
                                </div>

                                <div className={cx('form-input')}>
                                    <p className={cx('txt-input')}>Khối lượng &#10088; Kg &#10089; </p>
                                    <input
                                        onChange={(e) => setKhoiLuong(e.target.value)}
                                        className={cx('khoiluong', 'more')}
                                    />
                                </div>

                                <div className={cx('form-input')}>
                                    <p className={cx('txt-input')}>Nguồn gốc</p>
                                    <input
                                        onChange={(e) => setNguonGoc(e.target.value)}
                                        className={cx('nguongoc', 'more')}
                                    />
                                </div>

                                <div className={cx('form-input')}>
                                    <p className={cx('txt-input')}>Slug</p>
                                    <input onChange={(e) => setSlug(e.target.value)} className={cx('slug', 'more')} />
                                </div>

                                <button className={cx('btn-create')}>POST</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Create;
