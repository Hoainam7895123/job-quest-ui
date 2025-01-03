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

const cx = classNames.bind(styles);

function ListJob() {
    return (
        <div className={cx('list-job')}>
            <h2>List job</h2>
            <div class="card">
                <div class="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Skill</th>
                                <th scope="col">Salary</th>
                                <th scope="col">Type</th>
                                <th scope="col">Deadline</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Brandon Jacob</td>
                                <td>Designer</td>
                                <td>28</td>
                                <td>2016-05-25</td>
                                <td></td>
                                <td></td>
                                <td>
                                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px' }} />
                                    <FontAwesomeIcon icon={faTrash} />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Bridie Kessler</td>
                                <td>Developer</td>
                                <td>35</td>
                                <td>2014-12-05</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Ashleigh Langosh</td>
                                <td>Finance</td>
                                <td>45</td>
                                <td>2011-08-12</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Angus Grady</td>
                                <td>HR</td>
                                <td>34</td>
                                <td>2012-06-11</td>
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>Raheem Lehner</td>
                                <td>Dynamic Division Officer</td>
                                <td>47</td>
                                <td>2011-04-19</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListJob;
