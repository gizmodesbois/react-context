import React from 'react';
import { NotificationConsumer } from '../provider';

const withNotifications = (WrappedComponent) => {
    return props => (
        <NotificationConsumer>
            { ({ addNotification }) => <WrappedComponent {...props} {...{ addNotification }} /> }
        </NotificationConsumer>
    );
};

export default withNotifications;
