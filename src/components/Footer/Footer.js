/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './Footer.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div
            className={cx('wrapper')}
            style={{
                backgroundImage: `url(${images.footer_bg})`,
            }}
        >
            <div className={cx('container-ct')}>
                <div className={cx('inner')}>
                    <div className={cx('column')}>
                        <a href="#">
                            <img className={cx('img-logo-footer')} src={images.noImage} />
                        </a>
                        <div className={cx('box-contact')}>
                            <p className={cx('title')}>Liên hệ</p>
                            <span>Hotline:</span>
                            <a href="tel:02345678990">(023) 3456 8999 (Giờ hành chính)</a>
                            <br />
                            <span>Email:</span>
                            <a href="tel:02345678990">support@jobquest.vn</a>
                        </div>
                        <div className={cx('box-download')}>
                            <p className={cx('title')}>Ứng dụng tải xuống</p>
                            <div className={cx('title')}>
                                <a href="https://itunes.apple.com/us/app/topcv-t%E1%BA%A1o-cv-t%C3%ACm-vi%E1%BB%87c-l%C3%A0m/id1455928592?ls=1&amp;mt=8">
                                    <img
                                        className={cx('img-responsive')}
                                        src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/welcome/download/app_store.png"
                                        alt="Tai app TopCV tai App Store"
                                        title="Tải app TopCV tại App Store"
                                    />
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=com.topcv">
                                    <img
                                        className={cx('img-responsive')}
                                        src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/welcome/download/chplay.png"
                                        alt="Tai app TopCV tai Google Play"
                                        title="Tải app TopCV tại Google Play"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className={cx('box-social')}>
                            <p className={cx('title')}>Cộng đồng TopCV</p>
                            <div className={cx('btn-list-social')}>
                                <a target="_blank" href="https://www.facebook.com/topcvbiz/">
                                    <FontAwesomeIcon className={cx('footer-icon')} icon={faFacebook} />
                                </a>
                                <a target="_blank" href="https://www.youtube.com/c/TopCVpro">
                                    <FontAwesomeIcon className={cx('footer-icon')} icon={faYoutube} />
                                </a>
                                <a target="_blank" href="https://www.linkedin.com/company/topcv-vietnam">
                                    <FontAwesomeIcon className={cx('footer-icon')} icon={faLinkedin} />
                                </a>
                                <a target="_blank" href="https://www.tiktok.com/@topcv">
                                    <FontAwesomeIcon className={cx('footer-icon')} icon={faTiktok} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={cx('column')}>
                        <div className={cx('box-menu-item')}>
                            <div className={cx('title')}>Về TopCV</div>
                            <div className={cx('box-menu-child')}>
                                <a target="_blank" href="https://topcv.com.vn/">
                                    Giới thiệu
                                </a>
                                <a target="_blank" href="https://www.topcv.vn/gioi-thieu#bao-chi">
                                    Góc báo chí
                                </a>
                                <a
                                    target="_blank"
                                    href="https://www.topcv.vn/cong-ty/cong-ty-co-phan-topcv-viet-nam/105.html"
                                >
                                    Tuyển dụng
                                </a>
                                <a target="_blank" href="https://www.topcv.vn/gioi-thieu#lien-he">
                                    Liên hệ
                                </a>
                                <a target="_blank" href="https://www.topcv.vn/faqs">
                                    Hỏi đáp
                                </a>
                                <a target="_blank" href="https://www.topcv.vn/dieu-khoan-bao-mat">
                                    Chính sách bảo mật
                                </a>
                                <a target="_blank" href="https://www.topcv.vn/terms-of-service">
                                    Điều khoản dịch vụ
                                </a>
                                <a href="https://static.topcv.vn/manual/Quy_che_san_TMDT_TopCV.pdf" target="_blank">
                                    Quy chế hoạt động
                                </a>
                            </div>
                        </div>
                        <div className={cx('box-menu-item')}>
                            <div className={cx('title')}>Đối tác</div>
                            <div className={cx('box-menu-child')}>
                                <a href="https://www.testcenter.vn/" target="_blank">
                                    TestCenter
                                </a>
                                <a href="https://tophr.vn" target="_blank">
                                    TopHR
                                </a>
                                <a href="https://www.viecngay.vn/" target="_blank">
                                    ViecNgay
                                </a>
                                <a href="https://happytime.vn/" target="_blank">
                                    Happy Time
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={cx('column')}>
                        <div className={cx('box-menu-item')}>
                            <div className={cx('title')}>Hồ sơ và CV</div>
                            <div className={cx('box-menu-child')}>
                                <a href="https://www.topcv.vn/quan-ly-cv" target="_blank">
                                    Quản lý CV của bạn
                                </a>
                                <a href="https://www.topcv.vn/profile" target="_blank">
                                    TopCV Profile
                                </a>
                                <a target="_blank" href="https://www.topcv.vn/viet-cv-the-nao-cho-chuan">
                                    Hướng dẫn viết CV
                                </a>
                                <a href="https://www.topcv.vn/mau-cv-theo-nganh-nghe" target="_blank">
                                    Thư viện CV theo ngành nghề
                                </a>
                                <a href="https://reviewcv.topcv.vn/" target="_blank">
                                    Review CV
                                </a>
                            </div>
                        </div>
                        <div className={cx('box-menu-item')}>
                            <div className={cx('title')}>Khám phá</div>
                            <div className={cx('box-menu-child')}>
                                <a href="https://www.topcv.vn/app" target="_blank">
                                    Ứng dụng di động TopCV
                                </a>
                                <a href="https://www.topcv.vn/tinh-luong-gross-net" target="_blank">
                                    Tính lương Gross - Net
                                </a>
                                <a href="https://www.topcv.vn/tinh-lai-kep" target="_blank">
                                    Tính lãi suất kép
                                </a>
                                <a href="https://www.topcv.vn/lap-ke-hoach-tiet-kiem" target="_blank">
                                    Lập kế hoạch tiết kiệm
                                </a>
                                <a
                                    href="https://www.topcv.vn/cong-cu-tinh-muc-huong-bao-hiem-that-nghiep"
                                    target="_blank"
                                >
                                    Tính bảo hiểm thất nghiệp
                                </a>
                                <a href="https://www.topcv.vn/tinh-bao-hiem-xa-hoi-mot-lan" target="_blank">
                                    Tính bảo hiểm xã hội một lần
                                </a>
                                <a href="https://www.topcv.vn/trac-nghiem-tinh-cach-mbti" target="_blank">
                                    Trắc nghiệm MBTI
                                </a>
                                <a
                                    href="https://www.topcv.vn/trac-nghiem-da-tri-thong-minh-multiple-intelligences-test"
                                    target="_blank"
                                >
                                    Trắc nghiệm MI
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={cx('column')}>
                        <div className={cx('box-menu-item')}>
                            <div className={cx('title')}>Xây dựng sự nghiệp</div>
                            <div className={cx('box-menu-child')}>
                                <a href="https://www.topcv.vn/viec-lam-tot-nhat" target="_blank">
                                    Việc làm tốt nhất
                                </a>
                                <a href="https://www.topcv.vn/viec-lam-luong-cao" target="_blank">
                                    Việc làm lương cao
                                </a>
                                <a href="https://www.topcv.vn/viec-lam-quan-ly" target="_blank">
                                    Việc làm quản lý{' '}
                                </a>
                                <a href="https://www.topcv.vn/viec-lam-it" target="_blank">
                                    Việc làm IT{' '}
                                </a>
                                <a href="https://www.topcv.vn/viec-lam-senior" target="_blank">
                                    Việc làm Senior
                                </a>
                                <a href="https://www.topcv.vn/tim-viec-lam-ban-thoi-gian-t3" target="_blank">
                                    Việc làm bán thời gian
                                </a>
                            </div>
                        </div>
                        <div className={cx('box-menu-item')}>
                            <div className={cx('title')}>Phát triển bản thân</div>
                            <div className={cx('box-menu-child')}>
                                <a href="https://contest.topcv.vn/" target="_blank">
                                    TopCV Contest
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
