import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp, faFilter } from '@fortawesome/free-solid-svg-icons';

import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('row')}>
                    <div className={cx('col-md-8')}>
                        <div className={cx('box-group-body')}>
                            <div className={cx('box-header')}>
                                <h4>Cài đặt thông tin cá nhân</h4>
                                <span className={cx('required')}>
                                    <span className={cx('require-hight-light')}>(*)</span>&nbsp;Các thông tin bắt buộc
                                </span>
                            </div>
                            <form
                                id="profile-form"
                                method="POST"
                                action="https://www.topcv.vn/cai-dat-thong-tin-ca-nhan"
                            >
                                <input type="hidden" name="_token" value="IsjGoWdMBX1kopFcEdfnMPtxV17EJPK5LR9CdwnX" />{' '}
                                <div className={cx('box-content')}>
                                    <div className={cx('box-need-work')}>
                                        <div className={cx('box-item')}>
                                            <p>
                                                Họ và tên <span className={cx('require_hight-light')}>*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className={cx('form-control', 'box-item-input')}
                                                placeholder="Nhập họ và tên"
                                                name="fullname"
                                                value="Trương Đình Hoài Nam"
                                            />
                                        </div>
                                        <div className={cx('box-item')}>
                                            <p>Số điện thoại</p>
                                            <input
                                                type="text"
                                                className={cx('form-control', 'box-item-input')}
                                                placeholder="Nhập số điện thoại"
                                                name="phone"
                                                value="0376858969"
                                            />
                                        </div>
                                        <div className={cx('box-item')}>
                                            <p>Email</p>
                                            <input
                                                type="text"
                                                className={cx('form-control', 'box-item-input')}
                                                value="hoainam7895123@gmail.com"
                                                disabled=""
                                                readonly=""
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('box-submit')}>
                                        <button
                                            type="submit"
                                            id="btn-topcv-update-profile-online"
                                            className={cx('btn', 'btn-topcv-primary')}
                                        >
                                            Lưu
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={cx('col-md-4')}>
                        <div className={cx('box-avatar')}>
                            <div className={cx('profile-avatar')}>
                                <img
                                    src="https://www.topcv.vn/images/avatar-default.jpg"
                                    alt=""
                                    onerror="this.src='https://www.topcv.vn/images/avatar-default.jpg'"
                                />
                            </div>
                            <div className={cx('profile-info')}>
                                <div className={cx('text-welcome')}>Chào mừng bạn trở lại,</div>
                                <h4 className={cx('profile-fullname')}>Trương Đình Hoài Nam</h4>
                                <div className={cx('account-type', 'vip')}>
                                    <span>Tài khoản đã xác thực</span>
                                </div>
                                <div className={cx('box-footer')}>
                                    <a
                                        href="https://www.topcv.vn/tai-khoan/nang-cap"
                                        className={cx('btn btn-sm', 'btn-upgrade')}
                                    >
                                        <FontAwesomeIcon icon={faCircleArrowUp} />
                                        <span>Nâng cấp tài khoản</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
