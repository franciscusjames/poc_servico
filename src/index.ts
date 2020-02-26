const { sleepTime } = require('./utils/sleepTime');
import { buscarEmails } from './clients/outlook';
export const { isNullOrUndefined } = require("util");



let index = async (): Promise<any> => {
    console.log('Iniciando a lambda service POC_emailDashboard');
    console.log('------------------------');

    await buscarEmails();

}

exports.handler = index; 