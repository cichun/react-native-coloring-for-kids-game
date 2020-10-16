import { Toast } from 'native-base';
const toastDuration = 2000;

export function showErrorMessage(error) {
    let message = '';
    if (error.response && error.response.data && typeof error.response.data === 'object') {
        if (error.response.data.hasOwnProperty('localized_message')) {
            const localized_message = error.response.data.localized_message;
            if (localized_message.update_app) {
                show_updateapp_alert(localized_message.description, localized_message.recovery_suggestion);
            }
            message = localized_message.description + ' ' + localized_message.recovery_suggestion;
        } else if (error.response.data.hasOwnProperty('message')) {
            message = error.response.data.message;
        }
    } else if (error.message) {
        message = error.message;
    }
    console.log('ERRROR:' + message);
    if (error.config && error.config.url) {
        console.log('URL:', error.config.url);
    }
    showMessage('Error: ' + message, 'danger');
}


//type = {danger, success, warning}
export function showMessage(message, type = 'warning') {
    Toast.show({
        text: message,
        buttonText: 'OK',
        duration: toastDuration,
        type: type,
        position: 'top'
    });
}
