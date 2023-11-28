import className from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

const cx = className.bind(styles);

function Footer() {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className={cx('wrapper')}>
            <div className={cx('sec-subscribe')}>
                <div className={cx('container')}>
                    <div className={cx('follow')}>
                        <h3>SUBSCRIBE NEWSLETTER.</h3>
                        <p>Get e-mail updates about our latest shop and special offers.</p>
                    </div>
                    <div className={cx('sub')}>
                        <form className={cx('form')}>
                            <input placeholder="Your email address" />
                            <button>SUBSCRIBE</button>
                        </form>
                    </div>
                </div>
            </div>

            <div>
                <div className={cx('footer')}>
                    <div className={cx('ft-container')}>
                        <div className={cx('ft-col1')}>
                            <div>
                                <Link className={cx('logo-left')}>
                                    <img
                                        src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779896/ORGAVIVE/icons/logo-01_eq5eig.png"
                                        alt="logo"
                                    />
                                </Link>
                            </div>
                            <p className={cx('p')}>
                                There are many variations of passages of Lorem Ipsum available, but the majority have
                                suffered alteration
                            </p>
                            <ul>
                                <li className={cx('list-col1')}>
                                    <div>
                                        <img
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779888/ORGAVIVE/icons/icon-mail_xpsqh4.png"
                                            alt="mail"
                                        />
                                    </div>
                                    <p>markrussell@example.com</p>
                                </li>

                                <li className={cx('list-col1')}>
                                    <div>
                                        <img
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779892/ORGAVIVE/icons/icon-pin_vremnb.png"
                                            alt="pin"
                                        />
                                    </div>
                                    <p>No 40 Baria Sreet 133/2, NewYork</p>
                                </li>

                                <li className={cx('list-col1')}>
                                    <div>
                                        <img
                                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779891/ORGAVIVE/icons/icon-phone_cpg1yg.png"
                                            alt="phone"
                                        />
                                    </div>
                                    <p>(785) 977 5767</p>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('ft-col2')}>
                            <div>
                                <h4>Information</h4>
                            </div>
                            <ul>
                                <li className={cx('list-col2-3')}>
                                    <Link className={cx('link-col2-3')}>About our shop</Link>
                                </li>
                                <li className={cx('list-col2-3')}>
                                    <Link className={cx('link-col2-3')}>Top sellers</Link>
                                </li>
                                <li className={cx('list-col2-3')}>
                                    <Link className={cx('link-col2-3')}>Our blog</Link>
                                </li>
                                <li className={cx('list-col2-3')}>
                                    <Link className={cx('link-col2-3')}>New products</Link>
                                </li>
                                <li className={cx('list-col2-3')}>
                                    <Link className={cx('link-col2-3')}>Secure shopping</Link>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('ft-col3')}>
                            <div>
                                <h4>My Account</h4>
                            </div>
                            <ul>
                                <li className={cx('list-col2-3')}>
                                    <Link className={cx('link-col2-3')}>My account</Link>
                                </li>
                                <li className={cx('list-col2-3')}>
                                    <Link className={cx('link-col2-3')}>Discount</Link>
                                </li>
                                <li className={cx('list-col2-3')}>
                                    <Link className={cx('link-col2-3')}>Personal information</Link>
                                </li>
                                <li className={cx('list-col2-3')}>
                                    <Link className={cx('link-col2-3')}>My address</Link>
                                </li>
                                <li className={cx('list-col2-3')}>
                                    <Link className={cx('link-col2-3')}>Order history</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={cx('last')}>
                    <div className={cx('inner')}>
                        <div className={cx('copyright')}>
                            <p>Copyright © 2017 Organive. All rights reserved.</p>
                        </div>
                        <div className={cx('pay')}>
                            <div className={cx('list-pay')}>
                                <img
                                    src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779889/ORGAVIVE/icons/icon-pay-01_aznhsg.png"
                                    alt=""
                                />
                            </div>
                            <div className={cx('list-pay')}>
                                <img
                                    src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779889/ORGAVIVE/icons/icon-pay-02_emjhwk.png"
                                    alt=""
                                />
                            </div>
                            <div className={cx('list-pay')}>
                                <img
                                    src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779890/ORGAVIVE/icons/icon-pay-03_co04nk.png"
                                    alt=""
                                />
                            </div>
                            <div className={cx('list-pay')}>
                                <img
                                    src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779890/ORGAVIVE/icons/icon-pay-04_mbdrov.png"
                                    alt=""
                                />
                            </div>
                            <div className={cx('list-pay1')}>
                                <img
                                    src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779890/ORGAVIVE/icons/icon-pay-05_fwnqii.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>

                    <div onClick={handleScrollToTop} className={cx('icon-angleUp')}>
                        <FontAwesomeIcon icon={faAngleUp} />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
