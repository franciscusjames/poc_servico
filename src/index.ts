const { sleepTime } = require('./utils/sleepTime');
import { buscarEmails } from './clients/outlook';
export const { isNullOrUndefined } = require("util");

// let inboxOptions = {
//     hostname: 'https://graph.microsoft.com/v1.0/me/mailfolders/inbox/messages?filter=receivedDateTime ge 2020-02-17T14:33:08Z',
//     port: 443,
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         'SdkVersion': 'postman-graph/v1.0',
//         'Authorization': `Bearer ${accessToken}`
//     }
// };

// let outboxOptions = {
//     hostname: 'https://graph.microsoft.com/v1.0/me/mailfolders/sentitems/messages?filter=receivedDateTime ge 2020-02-17T14:33:08Z',
//     port: 443,
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         'SdkVersion': 'postman-graph/v1.0',
//         'Authorization': `Bearer ${accessToken}`
//     }
// };


let index = async (): Promise<any> => {
    console.log('Iniciando a lambda service POC_emailDashboard');
    console.log('------------------------');

    await buscarEmails();

}

exports.handler = index; 