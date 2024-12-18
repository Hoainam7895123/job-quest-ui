import classNames from 'classnames/bind';

import styles from './Blog.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Blog() {
    return (
        // className={cx()}
        <section id="recent-blog-posts" className={cx('recent-blog-posts', 'section')}>
            <div className={cx('container', 'section-title')} data-aos="fade-up">
                <h2>Recent Blog Posts</h2>
                <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
            </div>
            <div className={cx('container')}>
                <div className={cx('row', 'gy-5')}>
                    <div className={cx('col-xl-4', 'col-md-6')}>
                        <div
                            className={cx('post-item', 'position-relative', 'h-100')}
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <div className={cx('post-img', 'position-relative', 'overflow-hidden')}>
                                <img src={images.blog1} className={cx('img-fluid')} alt="" />
                                <span className={cx('post-date')}>December 12</span>
                            </div>

                            <div className={cx('post-content', 'd-flex', 'flex-column')}>
                                <h3 className={cx('post-title')}>Eum ad dolor et. Autem aut fugiat debitis</h3>

                                <div className={cx('meta', 'd-flex', 'align-items-center')}>
                                    <div className={cx('d-flex', 'align-items-center')}>
                                        <i className="bi bi-person"></i>{' '}
                                        <span className={cx('ps-2')}>Julia Parker</span>
                                    </div>
                                    <span className={cx('px-3', 'text-black-50')}>/</span>
                                    <div className={cx('d-flex', 'align-items-center')}>
                                        <i className="bi bi-folder2"></i> <span className={cx('ps-2')}>Politics</span>
                                    </div>
                                </div>

                                <hr />

                                <a href="blog-details.html" className={cx('readmore', 'stretched-link')}>
                                    <span>Read More</span>
                                    <i className="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={cx('col-xl-4', 'col-md-6')}>
                        <div
                            className={cx('post-item', 'position-relative', 'h-100')}
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div className={cx('post-img', 'position-relative', 'overflow-hidden')}>
                                <img src={images.blog1} className={cx('img-fluid')} alt="" />
                                <span className={cx('post-date')}>July 17</span>
                            </div>

                            <div className={cx('post-content', 'd-flex', 'flex-column')}>
                                <h3 className={cx('post-title')}>Et repellendus molestiae qui est sed omnis</h3>

                                <div className={cx('meta', 'd-flex', 'align-items-center')}>
                                    <div className={cx('d-flex', 'align-items-center')}>
                                        <i className="bi bi-person"></i>{' '}
                                        <span className={cx('ps-2')}>Mario Douglas</span>
                                    </div>
                                    <span className={cx('px-3', 'text-black-50')}>/</span>
                                    <div className={cx('d-flex', 'align-items-center')}>
                                        <i className="bi bi-folder2"></i> <span className={cx('ps-2')}>Sports</span>
                                    </div>
                                </div>

                                <hr />

                                <a href="blog-details.html" className={cx('readmore', 'stretched-link')}>
                                    <span>Read More</span>
                                    <i className="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={cx('col-xl-4', 'col-md-6')}>
                        <div
                            className={cx('post-item', 'position-relative', 'h-100')}
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div className={cx('post-img', 'position-relative', 'overflow-hidden')}>
                                <img src={images.blog1} className={cx('img-fluid')} alt="" />
                                <span className={cx('post-date')}>July 17</span>
                            </div>

                            <div className={cx('post-content', 'd-flex', 'flex-column')}>
                                <h3 className={cx('post-title')}>Et repellendus molestiae qui est sed omnis</h3>

                                <div className={cx('meta', 'd-flex', 'align-items-center')}>
                                    <div className={cx('d-flex', 'align-items-center')}>
                                        <i className="bi bi-person"></i>{' '}
                                        <span className={cx('ps-2')}>Mario Douglas</span>
                                    </div>
                                    <span className={cx('px-3', 'text-black-50')}>/</span>
                                    <div className={cx('d-flex', 'align-items-center')}>
                                        <i className="bi bi-folder2"></i> <span className={cx('ps-2')}>Sports</span>
                                    </div>
                                </div>

                                <hr />

                                <a href="blog-details.html" className={cx('readmore', 'stretched-link')}>
                                    <span>Read More</span>
                                    <i className="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Blog;
