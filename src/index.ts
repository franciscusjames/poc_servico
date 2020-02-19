// import Outlook from './clients/outlook';
const { sleepTime } = require('./utils/sleepTime');
import { buscarToken } from './clients/outlook'
let accessToken;

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


    await buscarToken();
    await sleepTime(1000);

    // console.log('Buscando emails em Caixa de Saída(sentitems)');
    // await outlook.buscarOutbox();
    // console.log('Caixa de Saida: OK');
    // console.log('------------------------');


    //const conn = KnexSingleton.getInstance().conn;
    //const queryService = new QueryService(conn);

}

exports.handler = index; 