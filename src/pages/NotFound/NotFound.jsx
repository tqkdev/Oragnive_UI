import className from 'classnames/bind';
import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

function NotFound() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3 className={cx('Oops')}>Oops!</h3>
                <h1 className={cx('txt-main')}>404-ERROR FILE</h1>
                <h5 className={cx('note')}>THE PAGE YOU’RE LOOKING FOR NOT FOUND!</h5>
                <div className={cx('back')}>
                    <Link to={'/'}>Back to home</Link>
                </div>
            </div>
        </div>
    );
}
export default NotFound;
