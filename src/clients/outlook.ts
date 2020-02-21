const https = require('https');
const querystring = require('querystring');
import { processarEmails } from '../services/formatarEmails'


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
            await buscarInbox(token);
            await buscarOutbox(token);
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


async function buscarInbox(token) {
    console.log('-> Buscando emails em Caixa de Entrada(inbox)...');
    let inputOptions = {
        host: 'graph.microsoft.com',
        port: 443,
        method: 'GET',
        path: "/v1.0/me/mailfolders/AQMkADZkZjU0N2Q2LWI0MmUtNDYxYy04YTVkLTZhYQA3ODgCMjdhMwAuAAADAZjRiT7XM0eEItqYTnM7SQEA1Gz7XMjWS0eisWQxPYyYTAABIHEO_gAAAA==/messages",
        headers: {
            'Content-Type': 'application/json',
            'SdkVersion': 'postman-graph/v1.0',
            'Authorization': `Bearer ${token}`
        }
    }

    let req = await https.request(inputOptions, async function (res) {
        let result = '';
        res.on('data', function (chunk) {
            result += chunk;
        });
        res.on('end', async function () {
            let inbox = JSON.parse(result).value;
            console.log('Caixa de Entrada: OK');
            console.log('------------------------');
            await processarEmails(inbox, 'Inbox');
        });
        res.on('error', function (err) {
            console.log('ERR: ', err);
        })
    }
    );
    req.on('error', function (err) {
        console.log('ERR: ', err);
    });
    req.write('');
    req.end();
}


async function buscarOutbox(token) {
    console.log('-> Buscando emails em Caixa de Saida(sentitems)...');
    let outboxOptions = {
        host: 'graph.microsoft.com',
        port: 443,
        method: 'GET',
        path: '/v1.0/me/mailfolders/AQMkADZkZjU0N2Q2LWI0MmUtNDYxYy04YTVkLTZhYQA3ODgCMjdhMwAuAAADAZjRiT7XM0eEItqYTnM7SQEA1Gz7XMjWS0eisWQxPYyYTAABTt3JcwAAAA==/messages',
        headers: {
            'Content-Type': 'application/json',
            'SdkVersion': 'postman-graph/v1.0',
            'Authorization': `Bearer ${token}`
        }
    }

    let req = await https.request(outboxOptions, async function (res) {
        let result = '';
        res.on('data', function (chunk) {
            result += chunk;
        });
        res.on('end', async function () {
            let outbox = JSON.parse(result).value;
            console.log('Caixa de Saida: OK');
            console.log('------------------------');
            await processarEmails(outbox, 'Outbox');
        });
        res.on('error', function (err) {
            console.log('ERR: ', err);
        })
    }
    );
    req.on('error', function (err) {
        console.log('ERR: ', err);
    });
    req.write('');
    req.end();
}
