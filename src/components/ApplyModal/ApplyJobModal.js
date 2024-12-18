import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faFileAlt, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

import styles from './ApplyJobModal.module.scss';

const cx = classNames.bind(styles);

function ApplyJobModal({ show, onClose, jobTitle }) {
    const [selectedCV, setSelectedCV] = useState(null);
    const [introduceLetter, setIntroduceLetter] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');

    if (!show) return null;

    // Xử lý upload file
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedCV(file); // Lưu file dưới dạng `File` object
        }
    };

    const handleRemoveCV = () => {
        setSelectedCV(null);
    };

    const handleSubmit = async () => {
        if (!selectedCV) {
            alert('Bạn cần chọn một file CV để ứng tuyển!');
            return;
        }

        try {
            // Kiểm tra form-data
            const formData = new FormData();
            formData.append('file', selectedCV); // File CV
            formData.append('introduceLetter', introduceLetter); // Thư giới thiệu

            console.log('FormData Debug:');
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]); // Log để kiểm tra dữ liệu form-data
            }

            const token = localStorage.getItem('token');

            // Gửi yêu cầu API
            const response = await fetch('http://localhost:3000/upload/resume', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            console.log('Upload thành công:', data);
            alert('Nộp hồ sơ thành công!');
            onClose();
        } catch (error) {
            console.error('Lỗi khi nộp hồ sơ:', error);
            alert('Đã xảy ra lỗi khi nộp hồ sơ.');
        }
    };

    return (
        <div className={cx('modal-overlay')} onClick={onClose}>
            <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                <button className={cx('close-button')} onClick={onClose}>
                    &times;
                </button>
                <h2>Ứng tuyển {jobTitle}</h2>
                <div className={cx('cv-section')}>
                    <label className={cx('cv-label')}>
                        <FontAwesomeIcon className={cx('cv-icon-title')} icon={faFolderOpen} />
                        Chọn CV để ứng tuyển
                    </label>
                    {selectedCV ? (
                        <div className={cx('cv-selected')}>
                            <FontAwesomeIcon icon={faFileAlt} className={cx('cv-icon')} />
                            <span>{selectedCV.name}</span>
                            <button className={cx('remove-cv-button')} onClick={handleRemoveCV}>
                                X
                            </button>
                        </div>
                    ) : (
                        <div className={cx('cv-upload')}>
                            <input type="file" id="cv-upload" className={cx('cv-input')} onChange={handleFileUpload} />
                            <label htmlFor="cv-upload" className={cx('cv-upload-label')}>
                                <FontAwesomeIcon icon={faCloudArrowUp} className={cx('cv-icon')} />
                                Tải lên CV từ máy tính, chọn hoặc kéo thả
                            </label>
                        </div>
                    )}
                </div>
                <div className={cx('introduce-section')}>
                    <label htmlFor="introduce">Thư giới thiệu:</label>
                    <textarea
                        id="introduce"
                        placeholder="Viết thư giới thiệu ngắn gọn..."
                        className={cx('introduce-textarea')}
                        value={introduceLetter}
                        onChange={(e) => setIntroduceLetter(e.target.value)}
                    />
                </div>
                <div className={cx('actions')}>
                    <button className={cx('cancel-button')} onClick={onClose}>
                        Hủy
                    </button>
                    <button className={cx('submit-button')} onClick={handleSubmit}>
                        Nộp hồ sơ ứng tuyển
                    </button>
                </div>
                {uploadStatus && <p className={cx('upload-status')}>{uploadStatus}</p>}
            </div>
        </div>
    );
}

export default ApplyJobModal;
