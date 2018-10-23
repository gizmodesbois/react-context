import { NOTIFICATION_TIMER } from '../constants';

const uuid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

class NotificationModel {
    constructor({
        title,
        message,
        type = 'success',
        timer = NOTIFICATION_TIMER,
    }) {
        this.id = uuid();
        this.title = title;
        this.message = message;
        this.type = type;
        this.timer = timer;
    }
}

export default NotificationModel;
