/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames/bind';

import styles from './CompanyItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CompanyItem({ data }) {
    return (
        <a href="#" className={cx('wrapper')}>
            <div className={cx('company-header')}>
                <div className={cx('company-image')}>
                    <img src={data.avatar} />
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
        </a>
    );
}

export default CompanyItem;
