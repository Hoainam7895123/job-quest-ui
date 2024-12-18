import classNames from 'classnames/bind';

import styles from './HomeLayout.module.scss';
import Header from '~/layouts/components/Header';
import Footer from '~/components/Footer/Footer';

const cx = classNames.bind(styles);

function HomeLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('body')}>{children}</div>
            <Footer />
        </div>
    );
}

export default HomeLayout;
