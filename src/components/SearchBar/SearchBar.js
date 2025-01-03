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
        const title = formData.get('title');
        const level = formData.get('level');
        const workType = formData.get('workType');
        const salary = formData.get('salary');

        const searchParams = new URLSearchParams();

        if (title.trim()) {
            searchParams.set('title', title); // Thêm từ khóa tìm kiếm
        }
        if (level) searchParams.set('level', level); // Thêm cấp bậc
        if (workType) searchParams.set('workType', workType); // Thêm hình thức làm việc
        if (salary) searchParams.set('salary', salary);

        navigate(`/search?${searchParams.toString()}`);
    };

    const style = !otherPage ? { backgroundImage: `url(${images.search_background})` } : null;

    return (
        <>
            <div className={cx(otherPage ? 'wrapper-1' : 'wrapper')} style={style}>
                {!otherPage ? <h1 className={cx('title')}>911 Việc làm IT cho Developer "Chất"</h1> : <></>}
                <div className={cx('search-box')}>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('form-top')}>
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
                        </div>
                        <div className={cx('filter-container')}>
                            <div className={cx('filter-item')}>
                                <select name="level">
                                    <option value="">Cấp bậc</option>
                                    <option value="intern">Intern</option>
                                    <option value="junior">Junior</option>
                                    <option value="senior">Senior</option>
                                </select>
                            </div>

                            <div className={cx('filter-item')}>
                                <select name="workType">
                                    <option value="">Hình thức làm việc</option>
                                    <option value="fulltime">Full-time</option>
                                    <option value="parttime">Part-time</option>
                                </select>
                            </div>

                            <div className={cx('filter-item')}>
                                <select name="salary">
                                    <option value="">Mức lương</option>
                                    <option value="1000">Dưới 1000$</option>
                                    <option value="1000">Trên 1000$</option>
                                </select>
                            </div>
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
