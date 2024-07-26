import className from 'classnames/bind';
import styles from './Search.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import * as request from '../../utils/request';

const cx = className.bind(styles);

function Search() {
    const [isswal, setIsswal] = useState(false);
    const [seach, setSearch] = useState([]);

    const handleShowSwal = () => {
        setIsswal(!isswal);
    };

    const searchParams = useParams();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await request.get('search/keyword', {
                    params: {
                        q: searchParams.q,
                        page: 1,
                        limit: 10,
                    },
                });
                const dataMap = res.data.products;
                setSearch(dataMap);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, [searchParams.q]);

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
                                    <Link>
                                        <img src={product.image_url} alt={product.name} />
                                    </Link>
                                </div>
                                <div className={cx('info-item')}>
                                    <Link>
                                        <h1 className={cx('title-item')}>{product.name}</h1>
                                    </Link>
                                    <p className={cx('price-item')}>{product.price}đ</p>
                                    <p className={cx('description-item')}>{product.description}</p>
                                    <button onClick={handleShowSwal} className={cx('btn-addtocart')}>
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        ))}
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
