import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleRight,
    faArrowUpRightFromSquare,
    faBriefcase,
    faClock,
    faCommentsDollar,
    faCube,
    faHourglassHalf,
    faLocationDot,
    faRankingStar,
    faUser,
    faUserGroup,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

import SearchComponent from '~/components/SearchBar';
import styles from './JobDetail.module.scss';
import ApplyModal from '~/components/ApplyModal';

const cx = classNames.bind(styles);

function JobDetail() {
    // modal
    const [showModal, setShowModal] = useState(false);

    const handleApplyClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // api
    const { search } = useLocation(); // Lấy query string từ URL
    const params = new URLSearchParams(search); // Chuyển query string thành object
    const id = params.get('id'); // Lấy giá trị của `id`

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/jobs/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch job details: ${response.status}`);
                }
                const data = await response.json();
                setJob(data.data.doc); // Gán dữ liệu chính xác
            } catch (error) {
                console.error('Error fetching job details:', error.message);
                setError(error); // Gán lỗi vào state
            } finally {
                setLoading(false); // Đảm bảo loading tắt dù có lỗi hay không
            }
        };

        fetchJobDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) {
        return (
            <div>
                <p>There was an error while fetching job details:</p>
                <p>{error.message || JSON.stringify(error)}</p>
            </div>
        );
    }

    return (
        <>
            <SearchComponent otherPage={true} />
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('ctn-breadcrumb-detail')}>
                        <a href="https://www.topcv.vn/viec-lam" className={cx('text-highlight', 'bold')}>
                            Trang chủ
                        </a>{' '}
                        <FontAwesomeIcon className={cx('icon')} icon={faAngleRight} />
                        <span className={cx('text-dark-blue')}>{job.title}</span>
                    </div>
                    <div className={cx('job-detail-body', 'row')}>
                        <div className={cx('col-md-8')}>
                            <div className={cx('job-detail-body-left')}>
                                <div className={cx('job-detail-box')}>
                                    <h1 className={cx('job-detail-info-title')}>{job.title}</h1>
                                    <div className={cx('job-detail-info-sections')}>
                                        <div className={cx('job-detail-info-section')}>
                                            <div className={cx('job-detail-info-section-icon')}>
                                                <FontAwesomeIcon icon={faCommentsDollar} />
                                            </div>
                                            <div className={cx('job-detail-info-section-content')}>
                                                <div className={cx('job-detail-info-section-content-title')}>
                                                    Mức lương
                                                </div>
                                                <div className={cx('job-detail-info-section-content-value')}>
                                                    {job.salary}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('job-detail-info-section')}>
                                            <div className={cx('job-detail-info-section-icon')}>
                                                <FontAwesomeIcon icon={faLocationDot} />
                                            </div>
                                            <div className={cx('job-detail-info-section-content')}>
                                                <div className={cx('job-detail-info-section-content-title')}>
                                                    Địa điểm
                                                </div>
                                                <div className={cx('job-detail-info-section-content-value')}>
                                                    {job.userId.recruiter.location}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('job-detail-info-section')}>
                                            <div className={cx('job-detail-info-section-icon')}>
                                                <FontAwesomeIcon icon={faHourglassHalf} />
                                            </div>
                                            <div className={cx('job-detail-info-section-content')}>
                                                <div className={cx('job-detail-info-section-content-title')}>
                                                    Kinh nghiệm
                                                </div>
                                                <div className={cx('job-detail-info-section-content-value')}>
                                                    {job.experience}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('job-detail-info-flex')}>
                                        <div>
                                            <span>
                                                <FontAwesomeIcon
                                                    className={cx('job-detail-info-flex-icon')}
                                                    icon={faClock}
                                                />
                                                Hạn nộp hồ sơ: 16/12/2024
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('job-detail-info-action')}>
                                        <a
                                            href="/home"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleApplyClick();
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                className={cx('job-detail-info-action-icon')}
                                                icon={faPaperPlane}
                                            />
                                            <span>Ứng tuyển ngay</span>
                                        </a>
                                    </div>
                                    <ApplyModal show={showModal} onClose={handleCloseModal} />
                                </div>
                            </div>
                            <div className={cx('job-detail-body-left')}>
                                <div className={cx('job-detail-information-detail')}>
                                    <div className={cx('job-detail-information-detail-title-container')}>
                                        <h2>Chi tiết tuyển dụng</h2>
                                    </div>
                                    <div className={cx('job-tags')}>
                                        {job.skillsets.map((skill, index) => (
                                            <span className={cx('item')}>{skill}</span>
                                        ))}
                                    </div>
                                    <div className={cx('job-detail-information-container')}>
                                        <div className={cx('job-detail-information-detail-content')}>
                                            <div className={cx('job-des')}>
                                                <div className={cx('job-des-item')}>
                                                    <h3>Mô tả công việc</h3>
                                                    <div className={cx('job-des-item-content')}>
                                                        <p>- Tìm kiếm nhà cung cấp</p>
                                                        <p>- Giao dịch với nhà cung cấp, đàm phán, ký kết hợp đồng.</p>
                                                        <p>
                                                            - Chuẩn bị và xử lý các chứng từ liên quan xuất nhập khẩu,
                                                            hải quan, thuế...
                                                        </p>
                                                        <p>- Theo dõi tiến trình xuất nhập khẩu hàng hóa.</p>
                                                        <p>
                                                            - Giao dịch với các đối tác cung cấp dịch vụ vận tải, hải
                                                            quan.
                                                        </p>
                                                        <p>- Thực hiện các hoạt động thanh toán.</p>
                                                        <p>
                                                            - Cập nhật và báo cáo các văn bản, quy định liên quan hàng
                                                            hóa xuất nhập khẩu
                                                        </p>
                                                        <p>- Thực hiện các công việc khác theo phân công</p>
                                                    </div>
                                                </div>
                                                <div className={cx('job-des-item')}>
                                                    <h3>Yêu cầu ứng viên</h3>
                                                    <div className={cx('job-des-item-content')}>
                                                        <p>- Tìm kiếm nhà cung cấp</p>
                                                        <p>- Giao dịch với nhà cung cấp, đàm phán, ký kết hợp đồng.</p>
                                                        <p>
                                                            - Chuẩn bị và xử lý các chứng từ liên quan xuất nhập khẩu,
                                                            hải quan, thuế...
                                                        </p>
                                                        <p>- Theo dõi tiến trình xuất nhập khẩu hàng hóa.</p>
                                                        <p>
                                                            - Giao dịch với các đối tác cung cấp dịch vụ vận tải, hải
                                                            quan.
                                                        </p>
                                                        <p>- Thực hiện các hoạt động thanh toán.</p>
                                                        <p>
                                                            - Cập nhật và báo cáo các văn bản, quy định liên quan hàng
                                                            hóa xuất nhập khẩu
                                                        </p>
                                                        <p>- Thực hiện các công việc khác theo phân công</p>
                                                    </div>
                                                </div>
                                                <div className={cx('job-des-item')}>
                                                    <h3>Quyền lợi</h3>
                                                    <div className={cx('job-des-item-content')}>
                                                        <p>- Tìm kiếm nhà cung cấp</p>
                                                        <p>- Giao dịch với nhà cung cấp, đàm phán, ký kết hợp đồng.</p>
                                                        <p>
                                                            - Chuẩn bị và xử lý các chứng từ liên quan xuất nhập khẩu,
                                                            hải quan, thuế...
                                                        </p>
                                                        <p>- Theo dõi tiến trình xuất nhập khẩu hàng hóa.</p>
                                                        <p>
                                                            - Giao dịch với các đối tác cung cấp dịch vụ vận tải, hải
                                                            quan.
                                                        </p>
                                                        <p>- Thực hiện các hoạt động thanh toán.</p>
                                                        <p>
                                                            - Cập nhật và báo cáo các văn bản, quy định liên quan hàng
                                                            hóa xuất nhập khẩu
                                                        </p>
                                                        <p>- Thực hiện các công việc khác theo phân công</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-md-4')}>
                            <div className={cx('job-detail-body-right', 'job-detail-company')}>
                                <div className={cx('job-detail-company-information')}>
                                    <div className={cx('job-detail-company-information-item', 'company-name')}>
                                        <Link className={cx('company-logo')}>
                                            <img
                                                src={
                                                    job.userId.recruiter.photo ||
                                                    'https://cdn-new.topcv.vn/unsafe/80x/https://static.topcv.vn/company_logos/8f9f3596dc83d896b67d930ce9143998-64a7ce4f0f5dc.jpg'
                                                }
                                                alt="Thành Vinh Holdings"
                                                className={cx('img-responsive')}
                                            />
                                        </Link>
                                        <h2 className={cx('company-name-label')}>
                                            <a href="/home">{job.userId.recruiter.name}</a>
                                            <div className={cx('company-subdetail-label')}>
                                                <div className={cx('company-content-title')}>
                                                    <div className={cx('company-content-title-label')}></div>
                                                </div>
                                            </div>
                                        </h2>
                                    </div>
                                    <div className={cx('job-detail-company-information-item', 'company-scale')}>
                                        <div className={cx('company-title')}>
                                            <FontAwesomeIcon className={cx('company-title-icon')} icon={faUserGroup} />
                                            Quy mô:
                                        </div>
                                        <div className={cx('company-value')}>100-499 nhân viên</div>
                                    </div>
                                    <div className={cx('job-detail-company-information-item', 'company-field')}>
                                        <div className={cx('company-title')}>
                                            <FontAwesomeIcon className={cx('company-title-icon')} icon={faCube} />
                                            Lĩnh vực:
                                        </div>
                                        <div className={cx('company-value')}>Thương mại điện tử</div>
                                    </div>
                                    <div className={cx('job-detail-company-information-item', 'company-address')}>
                                        <div className={cx('company-title')}>
                                            <FontAwesomeIcon
                                                className={cx('company-title-icon')}
                                                icon={faLocationDot}
                                            />
                                            Địa điểm:
                                        </div>
                                        <div className={cx('company-value')}>{job.userId.recruiter.location}</div>
                                    </div>
                                    <div className={cx('job-detail-company-link')}>
                                        <a
                                            rel="nofollow"
                                            href="https://www.topcv.vn/cong-ty/thanh-vinh-holdings/147936.html"
                                        >
                                            Xem trang công ty
                                            <FontAwesomeIcon
                                                className={cx('job-detail-company-link-icon')}
                                                icon={faArrowUpRightFromSquare}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('job-detail-body-right', 'job-detail-body-right-general')}>
                                <h2 className={cx('job-detail-body-right-title')}>Thông tin chung</h2>
                                <div className={cx('box-general-content')}>
                                    <div className={cx('box-general-group')}>
                                        <div className={cx('box-general-group-icon')}>
                                            <FontAwesomeIcon icon={faRankingStar} />
                                        </div>
                                        <div className={cx('box-general-group-info')}>
                                            <div className={cx('box-general-group-info-title')}>Cấp bậc</div>
                                            <div className={cx('box-general-group-info-value')}>
                                                {job.level || 'Thực tập sinh'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('box-general-group')}>
                                        <div className={cx('box-general-group-icon')}>
                                            <FontAwesomeIcon icon={faHourglassHalf} />
                                        </div>
                                        <div className={cx('box-general-group-info')}>
                                            <div className={cx('box-general-group-info-title')}>Kinh nghiệm</div>
                                            <div className={cx('box-general-group-info-value')}>
                                                Không yêu cầu kinh nghiệm
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('box-general-group')}>
                                        <div className={cx('box-general-group-icon')}>
                                            <FontAwesomeIcon icon={faUsers} />
                                        </div>
                                        <div className={cx('box-general-group-info')}>
                                            <div className={cx('box-general-group-info-title')}>Số lượng tuyển</div>
                                            <div className={cx('box-general-group-info-value')}>5 người</div>
                                        </div>
                                    </div>
                                    <div className={cx('box-general-group')}>
                                        <div className={cx('box-general-group-icon')}>
                                            <FontAwesomeIcon icon={faBriefcase} />
                                        </div>
                                        <div className={cx('box-general-group-info')}>
                                            <div className={cx('box-general-group-info-title')}>Hình thức làm việc</div>
                                            <div className={cx('box-general-group-info-value')}>{job.jobType}</div>
                                        </div>
                                    </div>
                                    <div className={cx('box-general-group')}>
                                        <div className={cx('box-general-group-icon')}>
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        <div className={cx('box-general-group-info')}>
                                            <div className={cx('box-general-group-info-title')}>Giới tính</div>
                                            <div className={cx('box-general-group-info-value')}>Không yêu cầu</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default JobDetail;
