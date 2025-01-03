import classNames from 'classnames/bind';

import styles from './JobItem.module.scss';
import images from '~/assets/images';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function JobItem({ data, companyId }) {
    const companyImage = images[`congty${companyId}`];

    return (
        <div className={cx('wrapper')}>
            <Link to={`/job-detail?id=${data._id}`}>
                <div className={cx('company-avatar')}>
                    <img src={companyImage} alt="logo" />
                </div>
            </Link>
            <div className={cx('content')}>
                <h3>
                    <Tippy content={data.title} delay={[300, 300]} placement="left">
                        <Link to={`/job-detail?id=${data._id}`}>
                            <strong className={cx('job-title')}>{data.title}</strong>
                        </Link>
                    </Tippy>
                </h3>
                <Link to={`/job-detail?id=${data._id}`} title={data.userId.recruiter.name}>
                    <span className={cx('company-name')}>{data.userId.recruiter.name}</span>
                </Link>
                <div className={cx('box-footer')}>
                    <div className={cx('salary')}>
                        <span className={cx('text_ellipsis')}>{data.salary}</span>
                    </div>
                    <div className={cx('location')}>
                        <span className={cx('text_ellipsis')}>{data.userId.recruiter.location}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobItem;
