import { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faHouse, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

import styles from './Read.module.scss';
import * as request from '../../../../utils/request';

const cx = className.bind(styles);

function Read() {
    const [productDetail, setDroductDetail] = useState([]);
    const params = useParams();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await request.get(`product/${params.slug}`);
                setDroductDetail(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, [params.slug]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('container')}>
                    <div className={cx('line')}>
                        <div className={cx('header-path')}>
                            <Link to={'/admin/product'}>
                                <FontAwesomeIcon className={cx('path-iconback')} icon={faArrowLeft} />
                            </Link>
                            <div className={cx('path')}>
                                <FontAwesomeIcon className={cx('path-iconhouse')} icon={faHouse} />
                                <FontAwesomeIcon className={cx('path-iconright')} icon={faAngleRight} />
                                <p className={cx('path-lv1')}>Products</p>
                                <FontAwesomeIcon className={cx('path-iconright2')} icon={faAngleRight} />
                                <p className={cx('path-lv2')}>Read</p>
                            </div>
                        </div>
                    </div>
                    <h2 className={cx('title')}>Read</h2>
                    <div className={cx('read')}>
                        <form className={cx('form')}>
                            <div className={cx('form-input')}>
                                <p className={cx('txt-input')}>Name</p>
                                <div className={cx('more')}>{productDetail.name}</div>
                            </div>

                            <div className={cx('form-input')}>
                                <p className={cx('txt-input')}>Category</p>
                                <div className={cx('more')}>{productDetail.category}</div>
                            </div>

                            <div className={cx('form-input')}>
                                <p className={cx('txt-input')}>Image</p>
                                <div className={cx('more', 'image-product')}>
                                    <img src={productDetail.image_url} alt={productDetail.name} />
                                </div>
                            </div>

                            <div className={cx('form-input')}>
                                <p className={cx('txt-input')}>Description</p>
                                <div className={cx('more', 'description')}>{productDetail.description}</div>
                            </div>
                            <div className={cx('form-input')}>
                                <p className={cx('txt-input')}>Price &#10088; Đồng &#10089;</p>
                                <div className={cx('more')}>{productDetail.price}</div>
                            </div>

                            <div className={cx('form-input')}>
                                <p className={cx('txt-input')}>Khối lượng </p>
                                <div className={cx('more')}>{productDetail.khoiluong}</div>
                            </div>

                            <div className={cx('form-input')}>
                                <p className={cx('txt-input')}>Nguồn gốc</p>
                                <div className={cx('more')}>{productDetail.nguongoc}</div>
                            </div>

                            <div className={cx('form-input')}>
                                <p className={cx('txt-input')}>Slug</p>
                                <div className={cx('more')}>{productDetail.slug}</div>
                            </div>

                            <Link to={`/admin/product/update/${productDetail._id}`} className={cx('btn-edit')}>
                                EDIT
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Read;
