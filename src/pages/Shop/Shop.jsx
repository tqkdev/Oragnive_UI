import className from 'classnames/bind';
import styles from './Shop.module.scss';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import * as request from '../../utils/request';
import Search from './Search/Search';

const cx = className.bind(styles);

function About() {
    const [isSort, setIsSort] = useState(false);
    const [valueSort, setValueSort] = useState('Sắp xếp');
    const [isShowList, setIsShowList] = useState(true);
    const [isShowGrid, setIsShowGrid] = useState(false);
    const [isswal, setIsswal] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [products, setProducts] = useState([]);

    // chọn cách sắp xếp
    const handleValueSort = (value) => {
        setValueSort(value);
    };
    // open, close option sort
    const handleOptionSort = () => {
        setIsSort(!isSort);
    };

    // click ngoài phần tử optionSort đóng option
    const refOptionSort = useRef();
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (refOptionSort.current && !refOptionSort.current.contains(event.target)) {
                setIsSort(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    // render theo kiểu list
    const handleShowList = () => {
        setIsShowList(true);
        setIsShowGrid(false);
    };

    // render theo kiểu grid
    const handleShowGrid = () => {
        setIsShowGrid(true);
        setIsShowList(false);
    };

    // success add product
    const handleShowSwal = () => {
        setIsswal(!isswal);
    };

    // get data mặc định all
    useEffect(() => {
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
            } catch (error) {
                console.log('error');
            }
        }
    };
    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg-header')}></div>
            <div className={cx('bg-about-us')}>
                <h1 className={cx('title')}>SHOP</h1>
            </div>

            <div className={cx('inner')}>
                <div className={cx('container')}>
                    <div className={cx('leftbar')}>
                        <div className={cx('container-search')}>
                            <Search />
                        </div>
                        <div className={cx('category')}>
                            <h4 className={cx('title-category')}>Thể loại</h4>
                            <ul>
                                <li
                                    className={cx('item-category', { active: activeFilter === 'all' })}
                                    onClick={() => {
                                        fetchApi('all');
                                        handleFilterClick('all');
                                    }}
                                >
                                    Tất cả
                                </li>
                                <li
                                    className={cx('item-category', { active: activeFilter === 'rau' })}
                                    onClick={() => {
                                        fetchApi('rau');
                                        handleFilterClick('rau');
                                    }}
                                >
                                    Rau
                                </li>
                                <li
                                    className={cx('item-category', { active: activeFilter === 'cu' })}
                                    onClick={() => {
                                        fetchApi('cu');
                                        handleFilterClick('cu');
                                    }}
                                >
                                    Củ
                                </li>
                                <li
                                    className={cx('item-category', { active: activeFilter === 'qua' })}
                                    onClick={() => {
                                        fetchApi('qua');
                                        handleFilterClick('qua');
                                    }}
                                >
                                    Quả
                                </li>
                                <li
                                    className={cx('item-category', { active: activeFilter === 'trai-cay' })}
                                    onClick={() => {
                                        fetchApi('trai-cay');
                                        handleFilterClick('trai-cay');
                                    }}
                                >
                                    Trái cây
                                </li>
                            </ul>
                        </div>
                        <div className={cx('best-seller')}>
                            <h4 className={cx('title-bets-seller')}>Bán chạy nhất</h4>
                            <ul>
                                <li className={cx('item-bets-seller')}>
                                    <Link to={'/detail/cam'} className={cx('img-product')}>
                                        <img
                                            className={cx('img')}
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779869/ORGAVIVE/AvatarProduct/cam3_sjabbg.jpg"
                                            alt=""
                                        />
                                    </Link>
                                    <div className={cx('info-product')}>
                                        <Link to={'/detail/cam'} className={cx('name-product')}>
                                            Cam
                                        </Link>
                                        <p className={cx('price-product')}>30000đ</p>
                                    </div>
                                </li>

                                <li className={cx('item-bets-seller')}>
                                    <Link to={'/detail/bac-ha'} className={cx('img-product')}>
                                        <img
                                            className={cx('img')}
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779867/ORGAVIVE/AvatarProduct/bacha3_woxj9c.jpg"
                                            alt=""
                                        />
                                    </Link>
                                    <div className={cx('info-product')}>
                                        <Link to={'/detail/bac-ha'} className={cx('name-product')}>
                                            Bạc hà
                                        </Link>
                                        <p className={cx('price-product')}>30000đ</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('shop')}>
                        <div className={cx('topbar')}>
                            <div className={cx('topbar-container')}>
                                <div ref={refOptionSort} className={cx('topbar-short')}>
                                    <div onClick={handleOptionSort} className={cx('select')}>
                                        <button>{valueSort}</button>
                                    </div>
                                    {isSort && (
                                        <div className={cx('option')}>
                                            <button
                                                onClick={() => {
                                                    handleValueSort('Sắp xếp theo giá');
                                                    handleOptionSort();
                                                }}
                                                value={'Sắp xếp theo giá'}
                                            >
                                                Sắp xếp theo giá
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleValueSort('Sắp xếp theo tên');
                                                    handleOptionSort();
                                                }}
                                                value={'Sắp xếp theo tên'}
                                            >
                                                Sắp xếp theo tên
                                            </button>
                                        </div>
                                    )}
                                    <span className={cx('icon-caret-down')}>
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </span>
                                </div>
                                <div className={cx('topbar-chosse')}>
                                    <button onClick={handleShowList} className={cx('btn-list')}>
                                        <img
                                            className={cx('btn-list-main')}
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779889/ORGAVIVE/icons/icon-menu-list_tuakok.png"
                                            alt=""
                                        />
                                        <img
                                            className={cx('btn-list-active', { active: isShowList })}
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779889/ORGAVIVE/icons/icon-menu-list1_udmgqv.png"
                                            alt=""
                                        />
                                    </button>
                                    <button onClick={handleShowGrid} className={cx('btn-grid')}>
                                        <img
                                            className={cx('btn-grid-main')}
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779886/ORGAVIVE/icons/icon-grid_vyrtf3.png"
                                            alt=""
                                        />
                                        <img
                                            className={cx('btn-grid-active', { active: isShowGrid })}
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779886/ORGAVIVE/icons/icon-grid1_t0xp88.png"
                                            alt=""
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {isShowList && (
                            <div className={cx('shop-list')}>
                                {products.map((product) => (
                                    <div key={product._id} className={cx('item')}>
                                        <div className={cx('img-item')}>
                                            <Link to={`/detail/${product.slug}`}>
                                                <img src={product.image_url} alt={product.name} />
                                            </Link>
                                        </div>
                                        <div className={cx('info-item')}>
                                            <Link to={`/detail/${product.slug}`}>
                                                <h1 className={cx('title-item')}>{product.name}</h1>
                                            </Link>
                                            <p className={cx('price-item')}>{product.price}đ</p>
                                            <p className={cx('description-item')}>{product.description}</p>
                                            <button
                                                onClick={() => {
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
                        )}
                        {isShowGrid && (
                            <div className={cx('shop-grid')}>
                                <div className={cx('grid-product')}>
                                    {products.map((product) => (
                                        <div key={product._id} className={cx('item-grid')}>
                                            <img
                                                className={cx('item-product-img')}
                                                src={product.image_url}
                                                alt={product.name}
                                            />
                                            <div className={cx('info-grid')}>
                                                <Link to={`/detail/${product.slug}`} className={cx('name-grid')}>
                                                    {product.name}
                                                </Link>
                                                <h4 className={cx('price-grid')}>{product.price}đ</h4>
                                                <div className={cx('icon-cart-grid')}>
                                                    <img
                                                        onClick={() => {
                                                            handleShowSwal();
                                                        }}
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
                        )}
                        <div className={cx('shop-page')}></div>
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

export default About;