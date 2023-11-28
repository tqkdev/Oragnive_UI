import className from 'classnames/bind';
import styles from './Loader.module.scss';

const cx = className.bind(styles);

function Loader() {
    return (
        <div className={cx('bg-loader')}>
            <div className={cx('loading')}></div>
        </div>
    );
}

export default Loader;
