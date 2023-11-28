import className from 'classnames/bind';
import styles from './HeaderSibar.module.scss';
import HeaderAdmin from '../../pages/Admin/HeaderAdmin/HeaderAdmin';
import SibarAdmin from '../../pages/Admin/SibarAmin/SibarAdmin';

const cx = className.bind(styles);

// eslint-disable-next-line react/prop-types
function HeaderSibar({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderAdmin />
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <SibarAdmin />
                    <div className={cx('children')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default HeaderSibar;
