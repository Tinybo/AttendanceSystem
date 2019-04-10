import { message, Button } from 'antd';

export function toast (type, text, time = 3) {
    if (type && text) {
        switch (type) {
            case 'info': message.info(text, time); break;
            case 'success': message.success(text, time); break;
            case 'warning': message.warning(text, time); break;
            case 'error': message.error(text, time); break;
            default: break;
        }
    }
}