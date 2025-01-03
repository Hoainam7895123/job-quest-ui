import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBell, faMessage } from '@fortawesome/free-regular-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import config from '~/config';
import Button from '~/components/Button/Button';

import styles from './Admin.module.scss';
import { faAngleDown, faEdit, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function Admin() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tokenAdd, setTokenAdd] = useState(null);

    const [jobs, setJobs] = useState([]); // State để lưu danh sách công việc

    const [activeContent, setActiveContent] = useState('listJob');

    const [formData, setFormData] = useState({
        title: '',
        maxApplicants: '',
        maxPositions: '',
        dateOfPosting: '',
        deadline: '',
        skillsets: '',
        jobType: 'Full-time',
        duration: '',
        salary: '',
    });

    // Start: user
    useEffect(() => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage (hoặc sessionStorage)
        setTokenAdd(token);
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

    useEffect(() => {
        if (user && user.data && user.data.user) {
            const recruiterId = user.data.user.userId;

            console.log(recruiterId);

            const fetchJobs = async () => {
                try {
                    // const response = await fetch(`http://localhost:3000/api/recruiter/67750559291f108f81de3bb5/jobs`);
                    const response = await fetch(`http://localhost:3000/api/recruiter/${recruiterId}/jobs`); // Gọi API
                    if (!response.ok) {
                        throw new Error('Failed to fetch jobs');
                    }
                    const data = await response.json(); // Parse dữ liệu JSON
                    setJobs(data.data); // Cập nhật state
                } catch (err) {
                } finally {
                }
            };

            fetchJobs();
        }
    }, [user]);

    if (loading) {
        return <p>Đang tải...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const handleSidebarClick = (content) => {
        setActiveContent(content);
    };

    // Start: Add Job
    const handleSubmit = async (e) => {
        e.preventDefault();

        const skillsetsArray = formData.skillsets.split(',').map((skill) => skill.trim());

        const apiBody = {
            title: formData.title,
            maxApplicants: parseInt(formData.maxApplicants),
            maxPositions: parseInt(formData.maxPositions),
            deadline: new Date(formData.deadline).toISOString(),
            skillsets: skillsetsArray,
            jobType: formData.jobType,
            duration: parseInt(formData.duration),
            salary: parseInt(formData.salary),
            rating: 4.7, // Rating cố định
        };

        console.log(apiBody);
        try {
            const response = await fetch('http://localhost:3000/api/jobs', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenAdd}`, // Gửi token trong header để xác thực
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiBody),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Job added successfully!');
                console.log(data);
            } else {
                const error = await response.json();
                alert(`Error: ${error.message || 'Something went wrong'}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            const skillsetsArray = formData.skillsets.split(',').map((skill) => skill.trim());

            const apiBody = {
                title: formData.title,
                maxApplicants: parseInt(formData.maxApplicants),
                maxPositions: parseInt(formData.maxPositions),
                deadline: new Date(formData.deadline).toISOString(),
                skillsets: skillsetsArray,
                jobType: formData.jobType,
                duration: parseInt(formData.duration),
                salary: parseInt(formData.salary),
                rating: 4.7, // Cố định
            };

            console.log('API Body:', apiBody);

            const url = window.location.href;
            const id = url.split('#updateJob/')[1];
            if (!id) {
                alert('Job ID not found in URL');
                return;
            }
            console.log('Job ID:', id);

            const response = await fetch(`http://localhost:3000/api/jobs/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${tokenAdd}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiBody),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to update job');
            }

            const data = await response.json();
            alert('Job updated successfully!');
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // End: Add Job
    const handleDelete = async (jobId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/jobs/${jobId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${tokenAdd}`, // Gửi token trong header để xác thực
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Job deleted successfully!');
            } else {
                const error = await response.json();
                alert(`Error: ${error.message || 'Something went wrong'}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <div className={cx('logo')}>Nice Admin</div>
                    <div className={cx('info-admin')}>
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
                                                    <img src={images.avatar_default} alt="" />
                                                    <div className={cx('caption')}>
                                                        <p className={cx('name')}>{user.data.user.name}</p>
                                                        <p className={cx('description')}>
                                                            Mã ứng viên:{' '}
                                                            <span className={cx('code')}>{user.data.user.userId}</span>
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
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('sidebar')}>
                        <ul>
                            <li>
                                <a href="#listJob" onClick={() => handleSidebarClick('listJob')}>
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#addJob" onClick={() => handleSidebarClick('addJob')}>
                                    Add Job
                                </a>
                            </li>
                            <li>
                                <a href="#another" onClick={() => handleSidebarClick('updateJob')}>
                                    Update Job
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('content')}>
                        {activeContent === 'listJob' && (
                            <div className={cx('list-job')}>
                                <h2>List job</h2>
                                <button className={cx('btn', 'btn-primary', 'mt-2', 'mb-2')}>Add Job</button>
                                <div class="card">
                                    <div class="card-body">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Max Applicants</th>
                                                    <th scope="col">Max Positions</th>
                                                    {/* <th scope="col">Skillsets</th> */}
                                                    <th scope="col">Salary</th>
                                                    <th scope="col">Job type</th>
                                                    <th scope="col">Deadline</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(jobs) && jobs.length > 0 ? (
                                                    (console.log(jobs),
                                                    jobs.map((job, index) => (
                                                        <tr key={job.id}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{job.title}</td>
                                                            <td>{job.maxApplicants}</td>
                                                            <td>{job.maxPositions}</td>
                                                            {/* <td>
                                                                <ul>
                                                                    {job.skillsets.split(',').map((skill, index) => (
                                                                        <li key={index}>{skill.trim()}</li>
                                                                    ))}
                                                                </ul>
                                                            </td> */}
                                                            <td>
                                                                {new Intl.NumberFormat('vi-VN', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                }).format(job.salary)}
                                                            </td>
                                                            <td>{job.jobType}</td>
                                                            {/* <td>{job.deadline}</td> */}
                                                            <td>
                                                                {new Date(job.deadline).toLocaleDateString('en-GB')}
                                                            </td>

                                                            <td>
                                                                <Link
                                                                    to={`http://localhost:3001/admin#updateJob/${job._id}`}
                                                                    onClick={() => setActiveContent('updateJob')}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={faEdit}
                                                                        style={{ marginRight: '10px' }}
                                                                    />
                                                                </Link>
                                                                <button onClick={() => handleDelete(job._id)}>
                                                                    <FontAwesomeIcon
                                                                        icon={faTrash}
                                                                        style={{
                                                                            cursor: 'pointer',
                                                                            color: 'red',
                                                                            marginLeft: '10px',
                                                                        }}
                                                                    />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="8">No jobs available</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeContent === 'addJob' && (
                            <div className={cx('form-add-job')}>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="title">Job Title:</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="maxApplicants">Max Applicants:</label>
                                        <input
                                            type="number"
                                            id="maxApplicants"
                                            name="maxApplicants"
                                            value={formData.maxApplicants}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="maxPositions">Max Positions:</label>
                                        <input
                                            type="number"
                                            id="maxPositions"
                                            name="maxPositions"
                                            value={formData.maxPositions}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="dateOfPosting">Date of Posting:</label>
                                        <input
                                            type="datetime-local"
                                            id="dateOfPosting"
                                            name="dateOfPosting"
                                            value={formData.dateOfPosting}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="deadline">Deadline:</label>
                                        <input
                                            type="datetime-local"
                                            id="deadline"
                                            name="deadline"
                                            value={formData.deadline}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="skillsets">Skillsets (comma-separated):</label>
                                        <input
                                            type="text"
                                            id="skillsets"
                                            name="skillsets"
                                            value={formData.skillsets}
                                            onChange={handleInputChange}
                                            placeholder="Flutter, Java"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="jobType">Job Type:</label>
                                        <select
                                            id="jobType"
                                            name="jobType"
                                            value={formData.jobType}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="duration">Duration (months):</label>
                                        <input
                                            type="number"
                                            id="duration"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="salary">Salary ($):</label>
                                        <input
                                            type="number"
                                            id="salary"
                                            name="salary"
                                            value={formData.salary}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <button type="submit">Add Job</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeContent === 'updateJob' && (
                            <div className={cx('form-add-job')}>
                                <form onSubmit={handleUpdateSubmit}>
                                    <div>
                                        <label htmlFor="title">Job Title:</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="maxApplicants">Max Applicants:</label>
                                        <input
                                            type="number"
                                            id="maxApplicants"
                                            name="maxApplicants"
                                            value={formData.maxApplicants}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="maxPositions">Max Positions:</label>
                                        <input
                                            type="number"
                                            id="maxPositions"
                                            name="maxPositions"
                                            value={formData.maxPositions}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="dateOfPosting">Date of Posting:</label>
                                        <input
                                            type="datetime-local"
                                            id="dateOfPosting"
                                            name="dateOfPosting"
                                            value={formData.dateOfPosting}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="deadline">Deadline:</label>
                                        <input
                                            type="datetime-local"
                                            id="deadline"
                                            name="deadline"
                                            value={formData.deadline}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="skillsets">Skillsets (comma-separated):</label>
                                        <input
                                            type="text"
                                            id="skillsets"
                                            name="skillsets"
                                            value={formData.skillsets}
                                            onChange={handleInputChange}
                                            placeholder="Flutter, Java"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="jobType">Job Type:</label>
                                        <select
                                            id="jobType"
                                            name="jobType"
                                            value={formData.jobType}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="duration">Duration (months):</label>
                                        <input
                                            type="number"
                                            id="duration"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="salary">Salary ($):</label>
                                        <input
                                            type="number"
                                            id="salary"
                                            name="salary"
                                            value={formData.salary}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <button type="submit">Update Job</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
