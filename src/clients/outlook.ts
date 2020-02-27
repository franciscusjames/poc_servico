const https = require('https');
const querystring = require('querystring');
import { processarEmails } from '../services/formatarEmails'
const graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');


export async function buscarEmails() {
    console.log('-> Buscando token de acesso...');
    const tokenPostData = querystring.stringify({
        grant_type: 'password',
        client_id: 'e3c91d0d-0dc4-4fd4-876d-08e39f638ea4',
        client_secret: '[cmC6U?[mj2PUHfZiqyX6aibw9dllMY?',
        scope: 'https://graph.microsoft.com/.default',
        userName: 'james.franciscus@modalgr.com.br',
        password: 'Modal@01'
    });

    const tokenOptions = {
        host: 'login.microsoftonline.com',
        port: 443,
        method: 'POST',
        path: '/79094b9a-9e56-443b-98ae-05b380ffc461/oauth2/v2.0/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'SdkVersion': 'postman-graph/v1.0',
            'Content-Length': tokenPostData.length
        }
    }

    let req = await https.request(tokenOptions, async function (res) {
        let result = '';
        res.on('data', function (chunk) {
            result += chunk;
        });
        res.on('end', async function () {
            const token = JSON.parse(result).access_token;
            console.log('Token de acesso: OK');
            console.log('------------------------');

            let date = new Date();
            date.setHours(date.getHours() - 4); // -3(UTC) -1h (?)
            date.setMilliseconds(0);
            let dateParm = date.toISOString().replace('.000', '');
            // let dateParm = '2020-02-21T14:00:00Z'; TESTE & FORMAT
            console.log('Pegando emails a partir de: ', dateParm);

            const client = graph.Client.init({
                authProvider: (done) => {
                    done(null, token);
                }
            });

            await buscarInbox(client, dateParm);
            await buscarOutbox(client, dateParm);
        });
        res.on('error', function (err) {
            console.log('ERR: ', err);
        })
    });

    req.on('error', function (err) {
        console.log('ERR: ', err);
    });
    req.write(tokenPostData);
    req.end();
}


async function buscarInbox(client, dateParm) {
    const result = await client
        .api(`/me/mailfolders/AQMkADZkZjU0N2Q2LWI0MmUtNDYxYy04YTVkLTZhYQA3ODgCMjdhMwAuAAADAZjRiT7XM0eEItqYTnM7SQEA1Gz7XMjWS0eisWQxPYyYTAABIHEO_gAAAA==/messages`)
        //.top(1)
        //.select('subject,from,receivedDateTime,isRead')
        .select('*')
        .orderby('receivedDateTime DESC')
        //.filter(`receivedDateTime ge ${dateParm}`)
        .get();

    let inbox = result.value;
    console.log('Inbox count: ', inbox.length);
    //console.log('CLIENT_INBOX: ', inbox);
    if (inbox.length > 0) {
        await processarEmails(inbox, 'Inbox');
    }
    console.log('Caixa de Entrada: OK');
    console.log('------------------------');
}


async function buscarOutbox(client, dateParm) {
    const result = await client
        .api(`/me/mailfolders/AQMkADZkZjU0N2Q2LWI0MmUtNDYxYy04YTVkLTZhYQA3ODgCMjdhMwAuAAADAZjRiT7XM0eEItqYTnM7SQEA1Gz7XMjWS0eisWQxPYyYTAABTt3JcwAAAA==/messages`)
        //.top(1)
        //.select('subject,from,receivedDateTime,isRead')
        .select('*')
        .orderby('sentDateTime DESC')
        //.filter(`sentDateTime ge ${dateParm}`)
        .get();

    let outbox = result.value;
    console.log('Outbox count: ', outbox.length);
    //console.log('CLIENT_OUTBOX: ', outbox);
    if (outbox.length > 0) {
        await processarEmails(outbox, 'Outbox');
    }
    console.log('Caixa de Saida: OK');
    console.log('------------------------');
}

