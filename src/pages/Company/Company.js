import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './Company.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleRight,
    faAngleUp,
    faBuilding,
    faGlobe,
    faLocationDot,
    faMap,
    faPlus,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import JobItem from '../../components/JobItem';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Company() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const jobsAPI = 'http://localhost:3000/api/jobs';

        // Gọi cả hai API song song
        Promise.all([
            fetch(jobsAPI).then((response) => {
                if (!response.ok) throw new Error('Failed to fetch jobs');
                return response.json();
            }),
        ])
            .then(([jobsData]) => {
                setData(jobsData.data); // Dữ liệu từ /api/jobs
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
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('ctn-breadcrumb-detail')}>
                    <a href="https://www.topcv.vn/viec-lam" className={cx('text-highlight', 'bold')}>
                        Trang chủ
                    </a>{' '}
                    <FontAwesomeIcon className={cx('icon')} icon={faAngleRight} />
                    <span className={cx('text-dark-blue')}>
                        Thông tin công ty & tin tuyển dụng từ Thành Vinh Holdings{' '}
                    </span>
                </div>
                <div className={cx('company-cover-inner')}>
                    <div className={cx('cover-wrapper')}>
                        <img
                            draggable="false"
                            src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/cover/company_cover_1.jpg"
                            width="100%"
                            className={cx('img-responsive', 'cover-img')}
                            alt=""
                        />
                    </div>
                    <div className={cx('company-logo')}>
                        <div className={cx('company-image-logo')}>
                            <img
                                draggable="false"
                                src="https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/8f9f3596dc83d896b67d930ce9143998-64a7ce4f0f5dc.jpg"
                                alt="Thành Vinh Holdings"
                                className={cx('img-responsive')}
                            />
                        </div>
                    </div>
                    <div className={cx('company-detail-overview')}>
                        <div className={cx('box-detail')}>
                            <h1
                                title=""
                                className={cx('company-detail-name', 'text-highlight')}
                                data-original-title="Thành Vinh Holdings"
                            >
                                Thành Vinh Holdings
                            </h1>
                            <div className={cx('company-subdetail')}>
                                <div className={cx('company-content-title-label')}></div>

                                <div
                                    data-toggle="tooltip"
                                    title=""
                                    className={cx('company-subdetail-info', 'website')}
                                    data-original-title="https://www.thanhvinhgroup.com/"
                                >
                                    <FontAwesomeIcon className={cx('company-subdetail-info-icon')} icon={faGlobe} />
                                    <a
                                        className={cx('company-subdetail-info-text')}
                                        title="Website của Thành Vinh Holdings"
                                        href="https://www.thanhvinhgroup.com/"
                                    >
                                        https://www.thanhvinhgroup.com/
                                    </a>
                                </div>
                                <div className={cx('company-subdetail-info')}>
                                    <FontAwesomeIcon className={cx('company-subdetail-info-icon')} icon={faBuilding} />
                                    <span className={cx('company-subdetail-info-text')}>100-499 nhân viên</span>
                                </div>
                                <div className={cx('company-subdetail-info')}>
                                    <FontAwesomeIcon className={cx('company-subdetail-info-icon')} icon={faUsers} />
                                    <span className={cx('company-subdetail-info-text')}>27 người theo dõi</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('box-follow')}>
                            <a href="https://www.topcv.vn/cong-ty/theo-doi/147936" className={cx('btn', 'btn-follow')}>
                                <FontAwesomeIcon className={cx('btn-follow-icon')} icon={faPlus} />
                                Theo dõi công ty
                            </a>
                        </div>
                    </div>
                </div>

                <div className={cx('company-detail-content')}>
                    <div className={cx('row')}>
                        <div className={cx('col-md-8')}>
                            <div className={cx('section-introduce')}>
                                <div className={cx('company-info')}>
                                    <h2 className={cx('title')}>Giới thiệu công ty</h2>
                                    <div className={cx('box-body')}>
                                        <div className={cx('content')}>
                                            <p>
                                                Nhen nhóm ý tưởng từ năm 2015 và bắt đầu chính thức thành lập từ ngày
                                                14/9/2017, trải
                                                <br />
                                                qua hơn 7 năm hình thành và phát triển, Thành Vinh Holdings luôn nỗ lực
                                                không ngừng để khẳng định vị thế trong lĩnh vực E-commerce.
                                                <br />
                                                Với đội ngũ nhân sự trẻ, nhiệt huyết, luôn giữ tinh thần khởi nghiệp như
                                                những ngày đầu, Thành Vinh Holdings đã tự phát triển cũng như hỗ trợ các
                                                đối tác thực hiện nhiều dự án ở khắp các nước trong khu vực Đông Nam Á
                                                (SEA)
                                                <br />
                                                Thành Vinh Holdings luôn mong muốn thúc đẩy và hình thành chuỗi các
                                                doanh nghiệp E-commerce 1 cách chuyên nghiệp, bền vững và là nền móng
                                                vững chắc hỗ trợ cho các nhân tài mong muốn khởi nghiệp trong lĩnh vực
                                                này. Trong tương lai, với bộ máy đào tạo uy tín, chất lượng, Thành Vinh
                                                Holdings sẽ cung cấp một nguồn nhân lực có kỹ năng, kinh nghiệm và thái
                                                độ làm việc tốt cho các đối tác, công ty, doanh nghiệp trong ngành, đồng
                                                thời tạo ra nhiều công việc có thu nhập cao cho người Việt.
                                            </p>
                                            <p>
                                                Nhen nhóm ý tưởng từ năm 2015 và bắt đầu chính thức thành lập từ ngày
                                                14/9/2017, trải
                                                <br />
                                                qua hơn 7 năm hình thành và phát triển, Thành Vinh Holdings luôn nỗ lực
                                                không ngừng để khẳng định vị thế trong lĩnh vực E-commerce.
                                                <br />
                                                Với đội ngũ nhân sự trẻ, nhiệt huyết, luôn giữ tinh thần khởi nghiệp như
                                                những ngày đầu, Thành Vinh Holdings đã tự phát triển cũng như hỗ trợ các
                                                đối tác thực hiện nhiều dự án ở khắp các nước trong khu vực Đông Nam Á
                                                (SEA)
                                                <br />
                                                Thành Vinh Holdings luôn mong muốn thúc đẩy và hình thành chuỗi các
                                                doanh nghiệp E-commerce 1 cách chuyên nghiệp, bền vững và là nền móng
                                                vững chắc hỗ trợ cho các nhân tài mong muốn khởi nghiệp trong lĩnh vực
                                                này. Trong tương lai, với bộ máy đào tạo uy tín, chất lượng, Thành Vinh
                                                Holdings sẽ cung cấp một nguồn nhân lực có kỹ năng, kinh nghiệm và thái
                                                độ làm việc tốt cho các đối tác, công ty, doanh nghiệp trong ngành, đồng
                                                thời tạo ra nhiều công việc có thu nhập cao cho người Việt.
                                            </p>
                                            <p>
                                                Nhen nhóm ý tưởng từ năm 2015 và bắt đầu chính thức thành lập từ ngày
                                                14/9/2017, trải
                                                <br />
                                                qua hơn 7 năm hình thành và phát triển, Thành Vinh Holdings luôn nỗ lực
                                                không ngừng để khẳng định vị thế trong lĩnh vực E-commerce.
                                                <br />
                                                Với đội ngũ nhân sự trẻ, nhiệt huyết, luôn giữ tinh thần khởi nghiệp như
                                                những ngày đầu, Thành Vinh Holdings đã tự phát triển cũng như hỗ trợ các
                                                đối tác thực hiện nhiều dự án ở khắp các nước trong khu vực Đông Nam Á
                                                (SEA)
                                                <br />
                                                Thành Vinh Holdings luôn mong muốn thúc đẩy và hình thành chuỗi các
                                                doanh nghiệp E-commerce 1 cách chuyên nghiệp, bền vững và là nền móng
                                                vững chắc hỗ trợ cho các nhân tài mong muốn khởi nghiệp trong lĩnh vực
                                                này. Trong tương lai, với bộ máy đào tạo uy tín, chất lượng, Thành Vinh
                                                Holdings sẽ cung cấp một nguồn nhân lực có kỹ năng, kinh nghiệm và thái
                                                độ làm việc tốt cho các đối tác, công ty, doanh nghiệp trong ngành, đồng
                                                thời tạo ra nhiều công việc có thu nhập cao cho người Việt.
                                            </p>
                                        </div>
                                        <a href="/home" className={cx('load-more')}>
                                            Xem thêm <FontAwesomeIcon icon={faAngleDown} />
                                        </a>
                                        <a href="/home" className={cx('show-less')}>
                                            Thu gọn <FontAwesomeIcon icon={faAngleUp} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('job-listing', 'box-white')}>
                                <div className={cx('job-listing-header')}>
                                    <h2 className={cx('title')}>Tin tuyển dụng</h2>
                                </div>
                                <div className={cx('box-body')}>
                                    {data.map((job, index) => (
                                        <div className="" key={job.id || index}>
                                            <JobItem data={job} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-md-4')}>
                            <div className={cx('section-contact')}>
                                <h2 className={cx('title')}>Thông tin liên hệ</h2>
                                <div className={cx('box-body')}>
                                    <div className={cx('item')}>
                                        <div className={cx('box-caption')}>
                                            <FontAwesomeIcon className={cx('icon')} icon={faLocationDot} />
                                            <span>Địa chỉ công ty</span>
                                        </div>
                                        <div className={cx('desc')}>
                                            Trụ sở Đà Nẵng: 222 Nguyễn Hữu Thọ, Phường Hoà Cường Bắc, Quận Hải Châu, Đà
                                            Nẵng. Văn phòng Hồ Chí Minh: Tầng 4 - 225 Nguyễn Xí, Phường 13, Quận Bình
                                            Thạnh, TP Hồ Chí Minh.
                                        </div>
                                    </div>
                                    <div className={cx('item')}>
                                        <div className={cx('box-caption')}>
                                            <FontAwesomeIcon className={cx('icon')} icon={faMap} />
                                            <span>Xem bản đồ</span>
                                        </div>
                                        <div className={cx('desc')}>
                                            <iframe
                                                title="hehe"
                                                width="100%"
                                                height="297"
                                                frameborder="0"
                                                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCVgO8KzHQ8iKcfqXgrMnUIGlD-piWiPpo&amp;q=Tru+so+Da+Nang:+222+Nguyen+Huu+Tho,Phuong+Hoa+Cuong+Bac,Quan+Hai+Chau,Da+Nang.+Van+phong+Ho+Chi+Minh:+Tang+4+-+225+Nguyen+Xi,Phuong+13,Quan+Binh+Thanh,TP+Ho+Chi+Minh.&amp;zoom=15&amp;language=vi"
                                                allowfullscreen=""
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Company;
