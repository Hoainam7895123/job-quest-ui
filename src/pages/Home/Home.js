import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './Home.module.scss';
import JobItem from '../../components/JobItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import CompanyItem from '../../components/CompanyItem';
import { useEffect, useState } from 'react';
import SearchComponent from '~/components/SearchBar';

const cx = classNames.bind(styles);

function Home() {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const jobsAPI = 'http://localhost:3000/api/jobs';
        const usersAPI = 'http://localhost:3000/api/user';

        // Gọi cả hai API song song
        Promise.all([
            fetch(jobsAPI).then((response) => {
                if (!response.ok) throw new Error('Failed to fetch jobs');
                return response.json();
            }),
            fetch(usersAPI).then((response) => {
                if (!response.ok) throw new Error('Failed to fetch users');
                return response.json();
            }),
        ])
            .then(([jobsData, usersData]) => {
                setData(jobsData.data); // Dữ liệu từ /api/jobs
                setUsers(usersData.data); // Dữ liệu từ /api/user
                setLoading(false);
            })
            .catch((error) => {
                console.error('There was an error!', error);
                setError(error);
                setLoading(true);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <SearchComponent />
            <div className={cx('wrapper')}>
                <div className={cx('job-list')}>
                    <div
                        className={cx('title')}
                        style={{
                            backgroundImage: `url(${images.title_background})`,
                        }}
                    >
                        <h2>Việc làm tốt nhất</h2>
                    </div>
                    <div className={cx('guide')}>
                        <p>
                            <FontAwesomeIcon className={cx('bulb-icon')} icon={faLightbulb} />
                            <b>Gợi ý: </b>
                            Di chuột vào tiêu đề việc làm để xem thêm thông tin chi tiết
                        </p>
                    </div>
                    <div className="row">
                        {data.slice(0, 12).map((job, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <JobItem data={job} companyId={index + 1} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('company-container')}>
                    <div className={cx('company-list')}>
                        <div
                            className={cx('company-title')}
                            style={{
                                backgroundImage: `url(${images.company_background})`,
                            }}
                        >
                            <h2>Thương hiệu lớn tiêu biểu</h2>
                            <p>Những thương hiệu tuyển dụng đã khẳng định được vị thế trên thị trường.</p>
                        </div>
                        <div className={cx('row', 'company-items')}>
                            {users.slice(0, 12).map((company, index) => (
                                <div className={cx('col-md-4 mb-4')} key={index}>
                                    <CompanyItem data={company} companyId={index + 1} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
