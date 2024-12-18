import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Đăng nhập không thành công');
            }

            const data = await response.json();
            console.log('Đăng nhập thành công:', data);
            // Thêm xử lý sau khi đăng nhập thành công (như lưu token, chuyển trang...)
            navigate('/'); // Chuyển hướng đến trang chủ
            localStorage.setItem('token', data.token);
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error.message);
            // Thêm xử lý khi gặp lỗi (hiển thị thông báo lỗi...)
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
                                        aria-label="Email"
                                        onChange={handleChange}
                                        value={formData.email}
                                    />
                                </div>
                            </div>
                            <div className={cx('form-group')}>
                                <label for="password" className={cx('mb-1')}>
                                    Password
                                </label>
                                <div className={cx('input-group', ' mb-3', 'input-group-custom')}>
                                    <div className={cx()}>
                                        <span className={cx('input-group-text')}>
                                            <FontAwesomeIcon className={cx('input-icon')} icon={faLock} />
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className={cx('form-control')}
                                        placeholder="Mật khẩu"
                                        aria-label="Mật khẩu"
                                        data-gtm-form-interact-field-id="0"
                                        onChange={handleChange}
                                        value={formData.password}
                                    />
                                </div>
                            </div>
                            <div className={cx('form-group', 'mb-24', 'wrap-forgot-password')}>
                                <a href="https://www.topcv.vn/forgot-password">Quên mật khẩu</a>
                            </div>
                            <div className={cx('form-group', 'mt-3')}>
                                <button className={cx('btn-login')} type="submit">
                                    Đăng nhập
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
                                Bạn chưa có tài khoản? <a href="#">Đăng ký ngay</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
