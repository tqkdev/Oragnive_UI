import className from 'classnames/bind';
import styles from './Detailproduct.module.scss';
import RatingStars from './RatingStars/RatingStars';
import ProductOrder from './ProductOrder/ProductOrder';
import Slideshow from '../../components/SlideShow/SlideShow';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as request from '../../utils/request';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const cx = className.bind(styles);

function Detailproduct() {
    const [showDescription, setShowDescription] = useState(true);
    const [showInformation, setShowInformation] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [isswal, setIsswal] = useState(false);

    // hiện mô tả
    const handleDescriptionClick = () => {
        setShowDescription(true);
        setShowInformation(false);
        setShowReview(false);
    };

    // hiện thông tin sản phẩm
    const handleInformationClick = () => {
        setShowDescription(false);
        setShowInformation(true);
        setShowReview(false);
    };

    // hiện đánh giá
    const handleReviewClick = () => {
        setShowDescription(false);
        setShowInformation(false);
        setShowReview(true);
    };

    const handleShowSwal = () => {
        setIsswal(!isswal);
    };

    const [productSlide, setProductSlide] = useState([]);
    const [productDetail, setDroductDetail] = useState([]);

    // lấy slide sản phẩm
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await request.get('product');
                setProductSlide(res);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, []);

    // lấy chi tiết sản phẩm
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg-header')}></div>

            <div className={cx('detail-product')}>
                <div className={cx('inner')}>
                    <div className={cx('detail-product-img')}>
                        <img src={productDetail.image_url} alt={productDetail.name} />
                    </div>
                    <div className={cx('detail-product-info')}>
                        <h4 className={cx('detail-product-name')}>{productDetail.name}</h4>
                        <p className={cx('detail-product-price')}>{productDetail.price}đ</p>

                        <RatingStars rating={3.5} />
                        <p className={cx('detail-product-der')}>{productDetail.description}</p>

                        <ProductOrder productDetail={productDetail} handleShowSwal={handleShowSwal} />

                        <p className={cx('detail-product-txt')}>SKU: 156</p>
                        <p className={cx('detail-product-txt')}>CATEGORY: {productDetail.category}</p>
                        <p className={cx('detail-product-txt')}>TAGS: HEALTHY, ORGANIC</p>
                    </div>
                </div>
            </div>

            <div className={cx('three-btn')}>
                <div className={cx('container')}>
                    <div className={cx('tab-item')}>
                        <div className={cx('btn')}>
                            <button className={cx({ active: showDescription })} onClick={handleDescriptionClick}>
                                Mô tả
                            </button>
                            <button className={cx({ active: showInformation })} onClick={handleInformationClick}>
                                Thông tin bổ sung
                            </button>
                            <button className={cx({ active: showReview })} onClick={handleReviewClick}>
                                Đánh giá
                            </button>
                        </div>
                    </div>

                    <div className={cx('tab-content')}>
                        {showDescription && (
                            <div className={cx('description')}>
                                <p>{productDetail.description}</p>
                            </div>
                        )}

                        {showInformation && (
                            <div className={cx('information')}>
                                <ul>
                                    <li className={cx('information-list')}>
                                        <p className={cx('information-p1')}>Khối lượng</p>
                                        <p className={cx('information-p2')}>{productDetail.khoiluong}</p>
                                    </li>
                                    <li className={cx('information-list', 'border')}>
                                        <p className={cx('information-p1')}>Counrty of Origin</p>
                                        <p className={cx('information-p2')}>Imported</p>
                                    </li>
                                    <li className={cx('information-list')}>
                                        <p className={cx('information-p1')}>Chất lượng</p>
                                        <p className={cx('information-p2')}>Oraganic</p>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {showReview && (
                            <div className={cx('review')}>
                                <div className={cx('list-comment')}>
                                    <div className={cx('avatar')}>
                                        <img
                                            src="https://freebw.com/templates/oragnive-v1/images/avatar-03.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('info-user')}>
                                        <h4 className={cx('name')}>Crystal Jimenez</h4>
                                        <p className={cx('comment')}>
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has
                                            roots in a piece of classical Latin literature from 45 BC, making it over
                                            2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
                                            College in Virginia, looked up one of the more obscure Latin words,
                                            consectetur.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={cx('slide')}>
                <div className={cx('item-slick')}>
                    <h1 className={cx('item-slick-title')}>RELATED PRODUCTS</h1>
                    <Slideshow productSlide={productSlide} handleShowSwal={handleShowSwal} />
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
                        <h5 className={cx('swal-title')}>Đã thêm sản phẩm vào giỏ hàng!</h5>
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

export default Detailproduct;
