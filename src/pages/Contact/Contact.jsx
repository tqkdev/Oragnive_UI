import className from 'classnames/bind';
import styles from './Contact.module.scss';

const cx = className.bind(styles);

function About() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg-header')}></div>
            <div className={cx('bg-about-us')}>
                <h1 className={cx('title')}>CONTACT</h1>
            </div>

            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <div className={cx('txt-center')}>
                        <img
                            src="https://res.cloudinary.com/dyoctwffi/image/upload/v1689779898/ORGAVIVE/icons/symbol-02_cwgmab.png"
                            alt=""
                        />
                        <p>Get In Touch</p>
                        <h1>LEAVE US A MESSAGE!</h1>
                    </div>

                    <div className={cx('message')}>
                        <form className={cx('form')}>
                            <div className={cx('row')}>
                                <div className={cx('col')}>
                                    <input placeholder="Your Full Name" />
                                </div>
                                <div className={cx('col')}>
                                    <input placeholder="Your Email" />
                                </div>
                                <div className={cx('col')}>
                                    <input placeholder="Your Address" />
                                </div>
                                <div className={cx('col')}>
                                    <input placeholder="Your Phone" />
                                </div>
                                <div className={cx('col2')}>
                                    <textarea placeholder="Your Message" />
                                </div>
                            </div>
                            <button className={cx('send-mess')}>SEND US NOW</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
