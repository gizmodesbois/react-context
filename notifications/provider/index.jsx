import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Notification from '../components/notification';

const NotificationContext = React.createContext({
    addNotification: () => {},
});

const timers = [];

// Build notification list
const notificationList = document.createElement('div');
notificationList.id = 'notifications';
document.body.appendChild(notificationList);

const NotificationPortal = ({ children }) => {
    return ReactDOM.createPortal(
        children,
        notificationList,
    );
};

class NotificationsProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
        };

        this.addNotification = this.addNotification.bind(this);
        this.removeNotification = this.removeNotification.bind(this);
    }

    addNotification(notification) {
        const { notifications } = this.state;
        this.setState({
            notifications: [...notifications, notification],
        }, () => {
            timers[notification.id] = setTimeout(() => {
                this.removeNotification(notification.id);
            }, notification.timer);
        });
    }

    removeNotification(notificationId) {
        const { notifications } = this.state;
        this.setState({
            notifications: notifications.filter(notif => notif.id !== notificationId),
        }, () => {
            clearTimeout(timers[notificationId]);
        });
    }

    render() {
        const { children, notificationComponent } = this.props;
        const { notifications } = this.state;
        const NotificationComp = notificationComponent;
        return (
            <NotificationContext.Provider value={{ addNotification: this.addNotification }}>
                {children}
                <NotificationPortal>
                    {notifications.map((notif) => {
                        return (
                            <NotificationComp
                                {...{ ...notif }}
                                key={notif.id}
                                remove={() => { this.removeNotification(notif.id); }}
                            />
                        );
                    })}
                </NotificationPortal>
            </NotificationContext.Provider>
        );
    }
}

NotificationsProvider.propTypes = {
    children: PropTypes.node.isRequired,
    notificationComponent: PropTypes.func,
};

NotificationsProvider.defaultProps = {
    notificationComponent: Notification,
};

export const NotificationConsumer = NotificationContext.Consumer;

export default NotificationsProvider;
