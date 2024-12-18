import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';
import SearchItem from '~/components/SearchItem';
import SearchBar from '~/components/SearchBar';

const cx = classNames.bind(styles);

function Search() {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiURL = `http://localhost:3000/api/search?${searchParams.toString()}`;

        fetch(apiURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data.data.jobs || []); // Đảm bảo gán mảng, tránh undefined/null
                setLoading(false);
            })
            .catch((error) => {
                console.error('There was an error!', error);
                setError(error);
                setLoading(false); // Sửa lại loading trong trường hợp lỗi
            });
    }, [searchParams]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <SearchBar otherPage={true} />

            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('title')}>Gợi ý việc làm phù hợp</div>
                    <div className={cx('filter-container')}>
                        <div className={cx('flex-1')}>
                            <form>
                                <select name="level" id="level">
                                    <option value="">Cấp bậc</option>
                                    <option value="senior">Intern</option>
                                    <option value="junior">Junior</option>
                                    <option value="senior">Senior</option>
                                </select>

                                <select name="workType" id="workType">
                                    <option value="">Hình thức làm việc</option>
                                    <option value="fulltime">Full-time</option>
                                    <option value="parttime">Part-time</option>
                                </select>

                                <select name="salary" id="salary">
                                    <option value="">Mức lương</option>
                                    <option value="1000">Dưới 1000$</option>
                                    <option value="1000">Trên 1000$</option>
                                </select>

                                <button className={cx('filter-btn')}>
                                    <FontAwesomeIcon className={cx('filter-icon')} icon={faFilter} />
                                    Bộ lọc
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className={cx('search-result')}>
                        <div className={cx()}>
                            {data.map((job, index) => (
                                <SearchItem key={index} data={job} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
