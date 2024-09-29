import className from 'classnames/bind';
import styles from './HeaderAdmin.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserGroup } from '@fortawesome/free-solid-svg-icons';

import { logoutAdmin } from '../../../redux/Admin/adminApiRequest';
import { createAxiosAdmin } from '../../../components/axiosJWT/axiosJWT';
import { logoutSuccess } from '../../../redux/Admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Tooltip from '@mui/material/Tooltip';
import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const cx = className.bind(styles);

function HeaderAdmin() {
    const isAdmin = useSelector((state) => state.admin.login.currentAdmin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxiosAdmin(isAdmin, dispatch, logoutSuccess);

    const [IsLoader, setIsLoader] = useState(false);

    // hiện setting

    // /////////////////////

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Logout
    const handleLogOut = () => {
        setIsLoader(true);
        logoutAdmin(dispatch, navigate, isAdmin?.data.accessToken, axiosJWT).finally(() => {
            setIsLoader(false);
        });
        localStorage.removeItem('persist:root');
    };

    // check admin
    if (!isAdmin) {
        return <Navigate to="/admin" />;
    }

    return (
        <>
            {IsLoader && <Loader />}
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('action')}>
                        <div className={cx('box-avatar')}>
                            <div className={cx('container-avatar')}>
                                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                    <Tooltip title="Liên lạc">
                                        <IconButton
                                            size="medium"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <FontAwesomeIcon className={cx('icon-usergroup')} icon={faUserGroup} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Thông báo">
                                        <IconButton
                                            size="medium"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <FontAwesomeIcon className={cx('icon-usergroup')} icon={faBell} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Cài đặt thông tin">
                                        <IconButton
                                            onClick={handleClick}
                                            size="medium"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <Avatar
                                                sx={{ width: 32, height: 32 }}
                                                alt="Remy Sharp"
                                                src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    slotProps={{
                                        paper: {
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <div className={cx('nameheader')}>
                                        <h3 className={cx('name')}>Sofia Rivers</h3>
                                        <p className={cx('mail')}>sofia.rivers@devias.io</p>
                                    </div>
                                    <Divider />
                                    <MenuItem sx={{ fontSize: '14px' }} onClick={handleClose}>
                                        <ListItemIcon>
                                            <Person fontSize="large" />
                                        </ListItemIcon>
                                        Thông tin tài khoản
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: '14px' }} onClick={handleClose}>
                                        <ListItemIcon>
                                            <Settings fontSize="large" />
                                        </ListItemIcon>
                                        Cài đặt
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: '14px' }} onClick={handleLogOut}>
                                        <ListItemIcon>
                                            <Logout fontSize="large" />
                                        </ListItemIcon>
                                        Đăng xuất
                                    </MenuItem>
                                </Menu>

                                {/*  */}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default HeaderAdmin;
