import { buscarEmails } from './clients/outlook';
export const { isNullOrUndefined } = require("util");
//const { sleepTime } = require('./utils/sleepTime');


let index = () => {
    console.log('Iniciando a lambda service POC_emailDashboard');
    console.log('------------------------');

    buscarEmails();

    return;
}

exports.handler = index; 