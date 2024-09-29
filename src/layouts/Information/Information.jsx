import className from 'classnames/bind';
import styles from './Information.module.scss';
import Sidebar from '../components/Sidebar/Sidebar';
import HeaderAdmin from './HeaderAdmin/HeaderAdmin';

const cx = className.bind(styles);

// eslint-disable-next-line react/prop-types
function Information({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('inner')}>
                    <HeaderAdmin />
                    <div className={cx('children')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default Information;
