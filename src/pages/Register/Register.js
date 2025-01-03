import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from '~/pages/Login/Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        type: 'applicant', // Giá trị cố định
        name: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

        // Kiểm tra mật khẩu khớp
        if (formData.password !== formData.confirmPassword) {
            alert('Mật khẩu và xác nhận mật khẩu không khớp!');
            return;
        }

        // Chuẩn bị body để gọi API
        const apiBody = {
            email: formData.email,
            password: formData.password,
            type: formData.type,
            name: formData.name,
            education: [
                {
                    institutionName: 'HaUI',
                    startYear: 2021,
                    endYear: 2025,
                },
            ],
            skills: '1',
        };

        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiBody),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Đăng ký thành công!');
                console.log(data);
            } else {
                const error = await response.json();
                alert(`Đăng ký thất bại: ${error.message}`);
            }
        } catch (error) {
            alert(`Đã xảy ra lỗi: ${error.message}`);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('auth-form')}>
                    <div className={cx('header')}>
                        <h1 className={cx('title')}>Chào mừng bạn đã quay trở lại</h1>
                        <p className={cx('description')}>
                            Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
                        </p>
                    </div>
                    <div className={cx('login')}>
                        <form onSubmit={handleSubmit}>
                            <div className={cx('form-group')}>
                                <label for="email" className={cx('mb-1')}>
                                    Họ và tên
                                </label>
                                <div className={cx('input-group', ' mb-3', 'input-group-custom')}>
                                    <div className={cx()}>
                                        <span className={cx('input-group-text')}>
                                            <FontAwesomeIcon className={cx('input-icon')} icon={faUser} />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        className={cx('form-control')}
                                        placeholder="Họ và tên"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className={cx('form-group')}>
                                <label for="email" className={cx('mb-1')}>
                                    Email
                                </label>
                                <div className={cx('input-group', ' mb-3', 'input-group-custom')}>
                                    <div className={cx()}>
                                        <span className={cx('input-group-text')}>
                                            <FontAwesomeIcon className={cx('input-icon')} icon={faEnvelope} />
                                        </span>
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        className={cx('form-control')}
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className={cx('form-group')}>
                                <label for="password" className={cx('mb-1')}>
                                    Mật khẩu
                                </label>
                                <div className={cx('input-group', ' mb-3', 'input-group-custom')}>
                                    <div className={cx()}>
                                        <span className={cx('input-group-text')}>
                                            <FontAwesomeIcon className={cx('input-icon')} icon={faLock} />
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        className={cx('form-control')}
                                        placeholder="Mật khẩu"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className={cx('form-group')}>
                                <label for="password" className={cx('mb-1')}>
                                    Xác nhận mật khẩu
                                </label>
                                <div className={cx('input-group', ' mb-3', 'input-group-custom')}>
                                    <div className={cx()}>
                                        <span className={cx('input-group-text')}>
                                            <FontAwesomeIcon className={cx('input-icon')} icon={faLock} />
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className={cx('form-control')}
                                        placeholder="Xác nhận mật khẩu"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className={cx('form-group', 'mb-24', 'wrap-forgot-password')}>
                                <a href="https://www.topcv.vn/forgot-password">Quên mật khẩu</a>
                            </div>
                            <div className={cx('form-group', 'mt-3')}>
                                <button className={cx('btn-login')} type="submit">
                                    Đăng ký
                                </button>
                                <p className={cx('or')}>Hoặc đăng nhập bằng</p>
                            </div>
                            <div className={cx('login-social-list')}>
                                <a href="#" className={cx('login-with-goole', 'btn-signin')}>
                                    <FontAwesomeIcon className={cx('login-icon')} icon={faGoogle} />
                                    <span>Google</span>
                                </a>

                                <a href="#" className={cx('login-with-facebook', 'btn-signin')}>
                                    <FontAwesomeIcon className={cx('login-icon')} icon={faFacebook} />
                                    <span>Facebook</span>
                                </a>
                                <a href="#" className={cx('login-with-linkedin', 'btn-signin')}>
                                    <FontAwesomeIcon className={cx('login-icon')} icon={faLinkedin} />
                                    <span>Linkedin</span>
                                </a>
                            </div>
                            <div className={cx('login-question')}>
                                Bạn đã có tài khoản? <Link to={config.routes.login}>Đăng nhập ngay</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
