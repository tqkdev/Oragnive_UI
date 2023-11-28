import className from 'classnames/bind';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as request from '../../utils/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const cx = className.bind(styles);

function Home() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [products, setProducts] = useState([]);
    const [isswal, setIsswal] = useState(false);

    const handleShowSwal = () => {
        setIsswal(!isswal);
    };

    useEffect(() => {
        // Mặc định lấy tất cả sản phẩm khi trang được tải lần đầu
        fetchApi('all');
    }, []);

    const fetchApi = async (type) => {
        let category = '';

        if (type === 'all') {
            try {
                const res = await request.get('product');
                setProducts(res);
            } catch (error) {
                console.log('error');
            }
        } else {
            if (type === 'rau') {
                category = 'rau';
            } else if (type === 'cu') {
                category = 'cu';
            } else if (type === 'qua') {
                category = 'qua';
            } else if (type === 'trai-cay') {
                category = 'trai-cay';
            }
            try {
                const res = await request.get(`category/${category}`);
                setProducts(res.id_product);
                // console.log(res.id_product);
            } catch (error) {
                console.log('error');
            }
        }
    };

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    return (
        <div className={cx('wapper')}>
            <div className={cx('top')}>
                <div className={cx('container-top')}>
                    <div className={cx('img-since')}>
                        <img
                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779902/ORGAVIVE/icons/symbol-19_ju7tmo.png"
                            alt=""
                        />
                    </div>
                    <div className={cx('name')}>
                        <h1>Farm Fresh</h1>
                    </div>
                    <div className={cx('img-organic')}>
                        <img
                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779902/ORGAVIVE/icons/symbol-18_ggv0k7.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <div className={cx('product')}>
                <div className={cx('container-product')}>
                    <div className={cx('txt-center')}>
                        <img
                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779898/ORGAVIVE/icons/symbol-02_cwgmab.png"
                            alt=""
                        />
                        <p>Featured Products</p>
                        <h1>OUR PRODUCTS</h1>
                    </div>
                    <div className={cx('filter')}>
                        <button
                            className={cx({ active: activeFilter === 'all' })}
                            onClick={() => {
                                fetchApi('all');
                                handleFilterClick('all');
                            }}
                        >
                            Tất cả
                        </button>
                        <button
                            className={cx({ active: activeFilter === 'rau' })}
                            onClick={() => {
                                fetchApi('rau');
                                handleFilterClick('rau');
                            }}
                        >
                            Rau
                        </button>
                        <button
                            className={cx({ active: activeFilter === 'qua' })}
                            onClick={() => {
                                fetchApi('qua');
                                handleFilterClick('qua');
                            }}
                        >
                            Quả
                        </button>
                        <button
                            className={cx({ active: activeFilter === 'trai-cay' })}
                            onClick={() => {
                                fetchApi('trai-cay');
                                handleFilterClick('trai-cay');
                            }}
                        >
                            Trái Cây
                        </button>
                        <button
                            className={cx({ active: activeFilter === 'cu' })}
                            onClick={() => {
                                fetchApi('cu');
                                handleFilterClick('cu');
                            }}
                        >
                            Củ
                        </button>
                    </div>
                    <div className={cx('grid-product')}>
                        {products.map((product) => (
                            <div key={product._id} className={cx('item-product')}>
                                <img className={cx('item-product-img')} src={product.image_url} alt={product.name} />
                                <div className={cx('info-product')}>
                                    <Link to={`/detail/${product.slug}`} className={cx('name-product')}>
                                        {product.name}
                                    </Link>
                                    <h4 className={cx('price-product')}>{product.price}đ</h4>
                                    <div
                                        onClick={() => {
                                            handleShowSwal();
                                        }}
                                        className={cx('icon-cart-product')}
                                    >
                                        <img
                                            className={cx('img')}
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779884/ORGAVIVE/icons/icon-cart_x3j1qo.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={cx('whychose')}>
                <div className={cx('container-whychose')}>
                    <div className={cx('quality')}>
                        <div className={cx('txt-quality')}>
                            <img
                                src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779898/ORGAVIVE/icons/symbol-02_cwgmab.png"
                                alt=""
                            />
                            <p>Quality Assurance</p>
                            <h1>WHY CHOOSE US</h1>
                        </div>

                        <div className={cx('reason')}>
                            <div className={cx('container-pic')}>
                                <div>
                                    <img
                                        className={cx('pic')}
                                        src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779901/ORGAVIVE/icons/symbol-15_wkdj5l.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className={cx('container-txt')}>
                                <h2 className={cx('txt-h2')}>100% HỮU CƠ TƯƠI</h2>
                                <p className={cx('txt-p')}>
                                    Lorem Ipsum chỉ đơn giản là văn bản giả của ngành in ấn và sắp chữ. Nó đã rất tốt.
                                </p>
                            </div>
                        </div>

                        <div className={cx('reason')}>
                            <div className={cx('container-pic')}>
                                <div>
                                    <img
                                        className={cx('pic')}
                                        src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779901/ORGAVIVE/icons/symbol-16_y42owy.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className={cx('container-txt')}>
                                <h2 className={cx('txt-h2')}>KINH NGHIỆM</h2>
                                <p className={cx('txt-p')}>
                                    Một thực tế đã được chứng minh từ lâu là người đọc sẽ bị phân tâm bởi nội dung dễ
                                    đọc của một trang khi nhìn vào bố cục của nó.
                                </p>
                            </div>
                        </div>

                        <div className={cx('reason')}>
                            <div className={cx('container-pic')}>
                                <div>
                                    <img
                                        className={cx('pic')}
                                        src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779901/ORGAVIVE/icons/symbol-17_hwghqj.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className={cx('container-txt')}>
                                <h2 className={cx('txt-h2')}>CHUYỂN PHÁT NHANH</h2>
                                <p className={cx('txt-p')}>
                                    Mục đích của việc sử dụng Lorem Ipsum là nó có sự phân bố chữ cái ít nhiều bình
                                    thường, trái ngược với việc sử dụng
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('picture')}>
                        <img
                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691596777/ORGAVIVE/other-08_e7s1qk.jpg"
                            alt=""
                        />
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

export default Home;
