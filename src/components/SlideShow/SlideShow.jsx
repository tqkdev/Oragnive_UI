import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './SlideShow.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import { createAxiosUser } from '../axiosJWT/axiosJWT';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../../redux/User/userApiRequest';
import { updateOderSuccess } from '../../redux/User/OrderSlice';
const cx = className.bind(styles);

const CustomPrevArrow = (props) => (
    //custom slide
    // eslint-disable-next-line react/prop-types
    <div className={cx('custom-prev-arrow')} onClick={props.onClick}>
        <FontAwesomeIcon icon={faCaretLeft} />
    </div>
);

const CustomNextArrow = (props) => (
    // eslint-disable-next-line react/prop-types
    <div className={cx('custom-next-arrow')} onClick={props.onClick}>
        <FontAwesomeIcon icon={faCaretRight} />
    </div>
);

// eslint-disable-next-line react/prop-types
const Slideshow = ({ productSlide, handleShowSwal }) => {
    const slideshowRef = useRef(null);
    const [slidesToShow, setSlidesToShow] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            const containerWidth = slideshowRef.current.clientWidth;
            let newSlidesToShow = 1;

            if (containerWidth < 350) {
                newSlidesToShow = 1;
            } else if (containerWidth < 640) {
                newSlidesToShow = 2;
            } else if (containerWidth < 1024) {
                newSlidesToShow = 3;
            } else {
                newSlidesToShow = 4;
            }

            setSlidesToShow(newSlidesToShow);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 5,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    // redux thêm sản phẩm vào giỏ hàng
    const isUser = useSelector((state) => state.user.login.currentUser);
    const dispatch = useDispatch();
    let axiosOrder = createAxiosUser(isUser, dispatch, updateOderSuccess);

    const toLogin = () => {
        window.location.href = '/login';
    };

    const handleAddOrder = (product) => {
        const newProductOrder = {
            product_id: product._id,
            product_name: product.name,
            product_image: product.image_url,
            product_price: product.price,
            product_slug: product.slug,
            quality: 1,
        };

        if (isUser) {
            dispatch(updateOrder(isUser?._id, isUser?.accessToken, newProductOrder, axiosOrder));
            handleShowSwal();
        } else {
            toLogin();
        }
    };

    return (
        <div ref={slideshowRef}>
            <Slider {...settings}>
                {/* eslint-disable-next-line react/prop-types */}
                {productSlide.map((product) => (
                    <div key={product._id} className={cx('item-slick-container')}>
                        <div className={cx('item-slick')}>
                            <img className={cx('item-product-img')} src={product.image_url} alt={product.name} />
                            <div className={cx('info-slick')}>
                                <Link to={`/detail/${product.slug}`} className={cx('name-slick')}>
                                    {product.name}
                                </Link>
                                <h4 className={cx('price-slick')}>{product.price}đ</h4>
                                <div className={cx('icon-cart-slick')}>
                                    <img
                                        onClick={() => {
                                            handleAddOrder(product);
                                        }}
                                        className={cx('img')}
                                        src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779884/ORGAVIVE/icons/icon-cart_x3j1qo.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Slideshow;
