import className from 'classnames/bind';
import styles from './Update.module.scss';
import { useEffect, useState } from 'react';
import * as request from '../../../utils/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faHouse, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { updateSuccess } from '../../../redux/Admin/productSlice';
import { createAxiosAdmin } from '../../../components/axiosJWT/axiosJWT';
import { updateProduct } from '../../../redux/Admin/adminApiRequest';

const cx = className.bind(styles);

function Update() {
    const isAdmin = useSelector((state) => state.admin.login.currentAdmin);

    const [productDetail, setDroductDetail] = useState([]);
    const params = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await request.get(`product/${params.slug}`);
                setDroductDetail(res);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, [params.slug]);

    const nameDefault = productDetail.name;
    const categoryDefault = productDetail.category;
    const imageDefault = productDetail.image_url;
    const descriptionDefault = productDetail.description;
    const priceDefault = productDetail.price;
    const khoiLuongDefault = productDetail.khoiluong;
    const nguonGocDefault = productDetail.nguongoc;
    const slugDefault = productDetail.slug;

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
    let axiosJWT = createAxiosAdmin(isAdmin, dispatch, updateSuccess);

    function handleUpdate(e) {
        e.preventDefault();
        const newProduct = {
            name: name === '' ? nameDefault : name,
            category: category === '' ? categoryDefault : category,
            image_url: image === '' ? imageDefault : image,
            description: description === '' ? descriptionDefault : description,
            price: price === '' ? priceDefault : price,
            khoiluong: khoiLuong === '' ? khoiLuongDefault : khoiLuong,
            nguongoc: nguonGoc === '' ? nguonGocDefault : nguonGoc,
            slug: slug === '' ? slugDefault : slug,
        };

        updateProduct(params.slug, dispatch, navigate, isAdmin.accessToken, newProduct, axiosJWT);
    }

    return (
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
                                <p className={cx('path-lv2')}>Update</p>
                            </div>
                        </div>
                    </div>
                    <h2 className={cx('title')}>Update: {params.slug}</h2>
                    <div className={cx('update')}>
                        <form onSubmit={handleUpdate} className={cx('form')}>
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
                                <input onChange={(e) => setImage(e.target.value)} className={cx('image_url', 'more')} />
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

                            <button className={cx('btn-update')}>POST</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Update;
