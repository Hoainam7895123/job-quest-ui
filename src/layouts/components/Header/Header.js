import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import config from '~/config';
import images from '~/assets/images';
import Button from '~/components/Button/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDoubleRight,
    faAngleDown,
    faBell,
    faMessage,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage (hoặc sessionStorage)

        if (!token) {
            setError('Bạn chưa đăng nhập.');
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/user/me', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`, // Gửi token trong header để xác thực
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                    console.log(data);
                } else {
                    setError('Không thể lấy thông tin người dùng.');
                }
            } catch (error) {
                setError('Đã xảy ra lỗi khi gọi API.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <p>Đang tải...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left')}>
                    <div className={cx('logo')}>
                        <Link to={config.routes.home}>
                            <img src={images.noImage} alt="Tiktok" />
                        </Link>
                    </div>
                    <ul className={cx('nav')}>
                        <li>
                            <a href="https://dictionary.cambridge.org/dictionary/english/chilli-sauce">Việc làm</a>
                        </li>
                        <li>
                            <a href="https://dictionary.cambridge.org/dictionary/english/chilli-sauce">Hồ sơ & CV</a>
                        </li>
                        <li>
                            <a href="https://dictionary.cambridge.org/dictionary/english/chilli-sauce">Công cụ</a>
                        </li>
                        <li>
                            <a href="https://dictionary.cambridge.org/dictionary/english/chilli-sauce">
                                Cẩm nang nghề nghiệp
                            </a>
                        </li>
                        <li>
                            <a href="https://dictionary.cambridge.org/dictionary/english/chilli-sauce">TopCV</a>
                        </li>
                    </ul>
                </div>
                <div className={cx('right')}>
                    {user ? (
                        <>
                            <div className={cx('employer')}>
                                <p>Bạn là nhà tuyển dụng?</p>
                                <Link to={null}>
                                    Đăng tuyển ngay
                                    <FontAwesomeIcon className={cx('double-right-icon')} icon={faAngleDoubleRight} />
                                </Link>
                            </div>
                            <div className={cx('dividing-line')}></div>
                            <Tippy trigger="click" delay={[0, 0]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon className={cx('bell-icon')} icon={faBell} />
                                    {/* <span className={cx('badge')}>12</span> */}
                                </button>
                            </Tippy>
                            <Tippy trigger="click" delay={[0, 0]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon className={cx('message-icon')} icon={faMessage} />
                                    {/* <span className={cx('badge')}>12</span> */}
                                </button>
                            </Tippy>
                            <HeadlessTippy
                                interactive
                                trigger="mouseenter"
                                render={(attrs) => (
                                    <div className={cx()} tabIndex="-1" {...attrs}>
                                        <PopperWrapper>
                                            <div className={cx('headless-wrapper')}>
                                                <ul className={cx('nav', 'navbar-menu')}>
                                                    <div className={cx('dropdown-menu')}>
                                                        <img src={images.avatar_default} />
                                                        <div className={cx('caption')}>
                                                            <p className={cx('name')}>{user.data.user.name}</p>
                                                            <p className={cx('description')}>
                                                                Mã ứng viên:{' '}
                                                                <span className={cx('code')}>
                                                                    66fee085c14a70c77422312e
                                                                </span>
                                                            </p>
                                                            <p className={cx('description')}>{user.data.user.name}</p>
                                                        </div>
                                                    </div>
                                                    <li className={cx('navbar-menu-item')}>
                                                        <Link to="/profile" className={cx('text-sm')}>
                                                            Cài đặt thông tin cá nhân
                                                        </Link>
                                                    </li>
                                                    <li className={cx('navbar-menu-item')}>
                                                        <a
                                                            href="https://www.topcv.vn/cai-dat-thong-tin-ca-nhan"
                                                            className={cx('text-sm')}
                                                        >
                                                            Nâng cấp tài khoản VIP
                                                        </a>
                                                    </li>
                                                    <li className={cx('navbar-menu-item')}>
                                                        <a
                                                            href="https://www.topcv.vn/cai-dat-thong-tin-ca-nhan"
                                                            className={cx('text-sm')}
                                                        >
                                                            Kích hoạt quà tặng
                                                        </a>
                                                    </li>
                                                    <li className={cx('navbar-menu-item')}>
                                                        <Link to="/login" className={cx('text-sm')}>
                                                            <FontAwesomeIcon icon={faRightFromBracket} />
                                                            Logout
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </PopperWrapper>
                                    </div>
                                )}
                            >
                                <div className={cx('avatar')}>
                                    <img src={images.avatar_default} alt="Trương Đình Hoài Nam" />
                                    <FontAwesomeIcon className={cx('down-icon')} icon={faAngleDown} />
                                </div>
                            </HeadlessTippy>
                        </>
                    ) : (
                        <>
                            <Button color="success" outline>
                                Đăng nhập
                            </Button>
                            <Button>Đăng đăng ký</Button>
                            <Button>Đăng tuyển & tìm hồ sơ</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
