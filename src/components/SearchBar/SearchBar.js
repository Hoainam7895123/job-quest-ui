import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchBar.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function SearchBar({ otherPage }) {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form

        const formData = new FormData(event.target);
        const params = new URLSearchParams(formData).toString();

        navigate(`/search?${params}`);
    };

    const style = !otherPage ? { backgroundImage: `url(${images.search_background})` } : null;

    return (
        <>
            <div className={cx(otherPage ? 'wrapper-1' : 'wrapper')} style={style}>
                {!otherPage ? <h1 className={cx('title')}>911 Việc làm IT cho Developer "Chất"</h1> : <></>}
                <div className={cx('search-box')}>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('search-city')}>
                            <FontAwesomeIcon className={cx('location-icon')} icon={faLocationDot} />
                            <select>
                                <option value="address1">Tất cả thành phố</option>
                                <option value="address2">Hồ Chí Minh</option>
                                <option value="address3">Hà Nội</option>
                                <option value="address3">Đà Nẵng</option>
                            </select>
                        </div>
                        <div className={cx('search-keyword')}>
                            <input
                                name="title"
                                className={cx('search-input')}
                                placeholder="Nhập từ khoá theo kỹ năng, chức vụ, công ty..."
                            />
                        </div>
                        <div className={cx('search-btn')}>
                            <button type="submit">
                                <FontAwesomeIcon className={cx('search-icon')} icon={faSearch} />
                                Tìm kiếm
                            </button>
                        </div>
                    </form>
                </div>
                {!otherPage ? (
                    <div className={cx('suggest')}>
                        <div className={cx('suggest-title')}>Gợi ý cho bạn:</div>
                        <div className={cx('suggest-keyword')}>
                            <a href="/home">Spring</a>
                            <a href="/home">Java</a>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default SearchBar;
