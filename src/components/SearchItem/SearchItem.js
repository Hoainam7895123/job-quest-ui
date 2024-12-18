import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './SearchItem.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function SearchItem({ data }) {
    const [weeks, setWeeks] = useState(0);

    useEffect(() => {
        const createdAt = new Date(data.createdAt);
        const now = new Date();
        const diffMilliseconds = now - createdAt;
        const diffWeeks = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24 * 7));
        setWeeks(diffWeeks);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('avatar')}>
                    <a>
                        <img src={data.userId.recruiter.photo || images.volvo} />
                    </a>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-box')}>
                        <div className={cx('box-content')}>
                            <div className={cx('title-block')}>
                                <div>
                                    <h3 className={cx('title')}>{data.title}</h3>
                                    <a href="#" className={cx('company')}>
                                        <span className={cx('company-name')}>{data.userId.recruiter.name}</span>
                                    </a>
                                </div>
                                <div className={cx('salary')}>{data.salary} $</div>
                            </div>
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('label-content')}>
                                <label className={cx('address')}>
                                    <span>{data.userId.recruiter.name}</span>
                                </label>
                                <label className={cx('exp')}>
                                    <span>{data.jobType}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={cx('box-icon')}>
                        <div className={cx('tag-quickview')}>
                            <span>{data.job_slug}</span>
                        </div>
                        <div className={cx('icon')}>
                            <label>{`${weeks} tuần trước`}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;
