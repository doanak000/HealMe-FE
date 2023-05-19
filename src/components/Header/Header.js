import { Dropdown, Avatar, Button, Anchor } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import logo from '../../assets/img/HealMe-logo.svg';
import '../../assets/styles/component/Header/Header.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    logout,
    selectIsLoggedIn,
    selectUserInfo,
} from '../../features/login/loginSlice';
import { PATH } from '../../constants/common';
import { Link } from 'react-router-dom';
import { confirm } from '../ConfirmModal/ConfirmModal';
import { memo } from 'react';
import { isLoginLayout } from '../../constants/utils';

const Header = () => {
    const isLoginPage = isLoginLayout(window.location.href)
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userInfo =
        useSelector(selectUserInfo) ||
        JSON.parse(localStorage.getItem('userInfo'));

    const dispatch = useDispatch();
    const logoutHandle = () => {
        confirm({
            content: 'Bạn muốn đăng xuất?',
            onOk: () => {
                dispatch(logout());
            },
        });
    };
    ///login Data lấy data từ cái login slice về
    const items = [
        {
            key: 1,
            label: (
                <a
                    target="_self"
                    href="/profile"
                    className="text-decoration-none"
                >
                    Hồ sơ của tôi
                </a>
            ),
        },
        {
            key: 2,
            label: (
                <a
                    target="_self"
                    href="/profile/change-password"
                    className="text-decoration-none"
                >
                    Đổi mật khẩu
                </a>
            ),
        },
        {
            key: 3,
            label: (
                <a className="mb-0 text-danger" onClick={logoutHandle}>
                    Đăng xuất
                </a>
            ),
        },
    ];

    return (
        <div className={isLoginPage && "d-none"}>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <div className="header__logo overflow-hidden p-2 rounded bg-white">
                            <img
                                src={logo}
                                className="healme-logo"
                                width={26}
                                height={40}
                            />
                        </div>
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="header__navbar-item">
                                <a
                                    className="nav-link"
                                    href="/"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent"
                                >
                                    Trang chủ
                                </a>
                            </li>
                            <li className="header__navbar-item">
                                <a
                                    className="nav-link"
                                    href="/profile"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent"
                                >
                                    Đặt lịch
                                </a>
                            </li>
                            <li className="header__navbar-item">
                                <a
                                    className="nav-link"
                                    href="#business"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent"
                                >
                                    Phòng khám/Nhà thuốc
                                </a>
                            </li>



                            {/* <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropdown
                                </a>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Action
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Another action
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Something else here
                                        </a>
                                    </li>
                                </ul>
                            </li> */}
                        </ul>

                        <form
                            className="d-flex text-white"
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {isLoggedIn || localStorage.getItem('token') ? (
                                <>
                                    <span style={{ paddingRight: '10px' }}>
                                        {userInfo.username}
                                    </span>
                                    <Dropdown
                                        menu={{ items }}
                                        placement="bottomRight"
                                    >
                                        <Avatar icon={<UserOutlined />} />
                                    </Dropdown>
                                </>
                            ) : (
                                <>
                                    {' '}
                                    <Button className="mx-2 login-btn">
                                        <Link
                                            to={PATH.LOGIN}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            Đăng nhập
                                        </Link>
                                    </Button>
                                    <Button
                                        className="mx-2 register-btn"
                                        type="primary"
                                    >
                                        <Link
                                            to={PATH.REGISTER}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            {' '}
                                            Đăng kí
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
