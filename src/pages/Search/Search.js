import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';
import SearchItem from '~/components/SearchItem';
import SearchBar from '~/components/SearchBar';

const cx = classNames.bind(styles);

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
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
                    <div className={cx('search-result')}>
                        <div className={cx()}>
                            {data.map((job, index) => (
                                <Link to={`/job-detail?id=${job._id}`}>
                                    <SearchItem key={index} data={job} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
