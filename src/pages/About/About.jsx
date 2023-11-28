import className from 'classnames/bind';
import styles from './About.module.scss';

const cx = className.bind(styles);

function About() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg-header')}></div>
            <div className={cx('bg-about-us')}>
                <h1 className={cx('title')}>ABOUT US</h1>
            </div>
            <div className={cx('ax')}>
                <div className={cx('welcome')}>
                    <div className={cx('welcome-container')}>
                        <div className={cx('txt-center')}>
                            <img
                                src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779898/ORGAVIVE/icons/symbol-02_cwgmab.png"
                                alt=""
                            />
                            <p>Green Agriculture</p>
                            <h1>WELCOME TO ORGANIVE</h1>
                        </div>

                        <div className={cx('ay')}>
                            <img
                                className={cx('img-center')}
                                src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691765210/ORGAVIVE/other-01_lfpnrd.jpg"
                                alt=""
                            />
                            <div className={cx('item-welcome', 'one')}>
                                <div className={cx('welcome-pic')}>
                                    <div className={cx('wrap')}>
                                        <img
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779894/ORGAVIVE/icons/icon1.1_ezxbis.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className={cx('welcome-txt')}>
                                    <h4>100% ORGANIC</h4>
                                    <p>lorem Ipsum chỉ đơn giản là văn bản giả của việc in ấn và sắp chữ.</p>
                                </div>
                            </div>
                            <div className={cx('item-welcome', 'two')}>
                                <div className={cx('welcome-pic')}>
                                    <div className={cx('wrap')}>
                                        <img
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779894/ORGAVIVE/icons/icon1.1_ezxbis.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className={cx('welcome-txt')}>
                                    <h4>GIA ĐÌNH KHỎE MẠNH</h4>
                                    <p>Lorem Ipsum chỉ đơn giản là văn bản giả của việc in ấn và sắp chữ.</p>
                                </div>
                            </div>
                            <div className={cx('item-welcome', 'three')}>
                                <div className={cx('welcome-pic')}>
                                    <div className={cx('wrap')}>
                                        <img
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779894/ORGAVIVE/icons/icon1.1_ezxbis.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className={cx('welcome-txt')}>
                                    <h4>LUÔN TƯƠI</h4>
                                    <p>Lorem Ipsum chỉ đơn giản là văn bản giả của việc in ấn và sắp chữ.</p>
                                </div>
                            </div>
                            <div className={cx('item-welcome', 'four')}>
                                <div className={cx('welcome-pic')}>
                                    <div className={cx('wrap')}>
                                        <img
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779894/ORGAVIVE/icons/icon1.1_ezxbis.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className={cx('welcome-txt')}>
                                    <h4>AN TOÀN THỰC PHẨM</h4>
                                    <p>Lorem Ipsum chỉ đơn giản là văn bản giả của việc in ấn và sắp chữ.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
