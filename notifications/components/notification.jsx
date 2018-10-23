import React from 'react';
import PropTypes from 'prop-types';
import { notificationsIcons } from '../constants';

const Notification = ({
    title,
    message,
    type,
    timer,
    remove,
}) => (
    <li className={`notification ${type}`} data-purpose="notification_section">
        <span className="material-icons notification-icon">
            {notificationsIcons[type]}
        </span>
        <span className="notification-content">
            <span className="notification-title" data-purpose="title">
                {title}
            </span>
            <span className="notification-message" data-purpose="message">
                {message}
            </span>
        </span>
        <button type="button" className="notification-close" onClick={remove}>
            <svg>
                <circle r="18" cx="20" cy="20" style={{ animationDuration: `${(timer / 1000)}s` }} />
            </svg>
            <span className="material-icons notification-icon-close">
                close
            </span>
        </button>
    </li>
);

Notification.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired,
    timer: PropTypes.number.isRequired,
};

export default Notification;
