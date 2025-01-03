/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CompanyItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function CompanyItem({ data, companyId }) {
    const companyImage = images[`congty${companyId}`];
    return (
        <Link to="/" className={cx('wrapper')}>
            <div className={cx('company-header')}>
                <div className={cx('company-image')}>
                    <img src={companyImage} alt="logo" />
                </div>
                <div className={cx('company-description')}>
                    <div className={cx('company-name')}>{data.name}</div>
                    <div className={cx('company-work')}>{data.work}</div>
                </div>
            </div>
            <div className={cx('number-job')}>
                <FontAwesomeIcon className={cx('bag-icon')} icon={faBriefcase} />
                <span>{data.quantity} việc làm</span>
            </div>
        </Link>
    );
}

export default CompanyItem;
