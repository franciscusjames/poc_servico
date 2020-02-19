const https = require('https');
const querystring = require('querystring');

export async function buscarToken() {

    console.log('Buscando token de acesso');
    let postData = querystring.stringify({
        grant_type: 'password',
        client_id: 'e3c91d0d-0dc4-4fd4-876d-08e39f638ea4',
        client_secret: '[cmC6U?[mj2PUHfZiqyX6aibw9dllMY?',
        scope: 'https://graph.microsoft.com/.default',
        userName: 'james.franciscus@modalgr.com.br',
        password: 'Modal@01'
    });

    let options = {
        host: 'login.microsoftonline.com',
        port: 443,
        method: 'POST',
        path: '/79094b9a-9e56-443b-98ae-05b380ffc461/oauth2/v2.0/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'SdkVersion': 'postman-graph/v1.0',
            'Content-Length': postData.length
        }
    }

    let req = await https.request(options, function (res) {
        let result = '';
        res.on('data', function (chunk) {
            console.log('EntROU NO DATA')
            result += chunk;
            // this.token = JSON.parse(result).access_token
        });
        res.on('end', function () {
            //console.log('RESPONSE: ', JSON.parse(result));
            const token = JSON.parse(result).access_token;
            console.log('TOKEN: ', token);
            console.log('Token de acesso: OK');
            console.log('------------------------');
            buscarInbox(token)
        });
        res.on('error', function (err) {
            console.log('ERR: ', err);
        })
    });

    req.on('error', function (err) {
        console.log('ERR: ', err);
    });
    req.write(postData);
    req.end();
    console.log('TESTE:', this.token)

}


export async function buscarInbox(token) {
    console.log('TESTE: ', token)
    console.log('Buscando emails em Caixa de Entrada(inbox)');
    let options = {
        host: 'graph.microsoft.com',
        port: 443,
        method: 'GET',
        path: '/v1.0/me/mailfolders/AQMkADZkZjU0N2Q2LWI0MmUtNDYxYy04YTVkLTZhYQA3ODgCMjdhMwAuAAADAZjRiT7XM0eEItqYTnM7SQEA1Gz7XMjWS0eisWQxPYyYTAABIHEO_gAAAA==/messages',
        headers: {
            'Content-Type': 'application/json',
            'SdkVersion': 'postman-graph/v1.0',
            'Authorization': `Bearer ${token}`
        }
    }

    let req = await https.request(options, function (res) {
        let result = '';
        res.on('data', function (chunk) {
            result += chunk;
            //console.log('TESTEINBOX: ', result);
        });
        res.on('end', function () {
            this.inbox = JSON.parse(result).value;
            console.log('INBOX: ', this.inbox);
            console.log('Caixa de Entrada: OK');
            console.log('------------------------');
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