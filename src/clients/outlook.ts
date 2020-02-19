const https = require('https');
const querystring = require('querystring');

class Outlook {
    public token: string;
    public inbox: [];
    public outbox: [];

    constructor() { }

    async buscarToken() {
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
                result += chunk;
            });
            res.on('end', function () {
                //console.log('RESPONSE: ', JSON.parse(result));
                this.token = JSON.parse(result).access_token;
                console.log('TOKEN: ', this.token);
                console.log('Token de acesso: OK');
                console.log('------------------------');
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
    }


    async buscarInbox() {
        console.log('TESTE: ', this.token)
        console.log('Buscando emails em Caixa de Entrada(inbox)');
        let options = {
            host: 'graph.microsoft.com',
            port: 443,
            method: 'GET',
            path: '/v1.0/me/mailfolders/AQMkADZkZjU0N2Q2LWI0MmUtNDYxYy04YTVkLTZhYQA3ODgCMjdhMwAuAAADAZjRiT7XM0eEItqYTnM7SQEA1Gz7XMjWS0eisWQxPYyYTAABIHEO_gAAAA==/messages',
            headers: {
                'Content-Type': 'application/json',
                'SdkVersion': 'postman-graph/v1.0',
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IlEwMlRYUFN4cmVxRGVhNGc1cXZrTXYtcUREWV9fWlY5dGpFOEdzaG9fZmciLCJhbGciOiJSUzI1NiIsIng1dCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSIsImtpZCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83OTA5NGI5YS05ZTU2LTQ0M2ItOThhZS0wNWIzODBmZmM0NjEvIiwiaWF0IjoxNTgyMTMyNjUzLCJuYmYiOjE1ODIxMzI2NTMsImV4cCI6MTU4MjEzNjU1MywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQyTmdZUGpUUDhzLzRyM1JVVjdIRlpMN2xTMzZ0V3IxbDA0V3JaRmVsV2kyTCtKS1RTWUEiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6Ik5vZGUuanMgT3V0bG9vayBUdXRvcmlhbCIsImFwcGlkIjoiZTNjOTFkMGQtMGRjNC00ZmQ0LTg3NmQtMDhlMzlmNjM4ZWE0IiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJGcmFuY2lzY3VzIiwiZ2l2ZW5fbmFtZSI6IkphbWVzIiwiaXBhZGRyIjoiMTkxLjI0OC41Mi4xNTQiLCJuYW1lIjoiSmFtZXMgRnJhbmNpc2N1cyIsIm9pZCI6IjIyOTYzYjdjLTA1ZDYtNGVlMy1hZjRkLTExMjIzMDM3Mzk1YSIsInBsYXRmIjoiMTQiLCJwdWlkIjoiMTAwMzAwMDBBRTNGMDQ4QyIsInNjcCI6Ik1haWwuUmVhZCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQgZW1haWwiLCJzdWIiOiI3dEpFSlQ2TVFzaXFCSEk0d3hhd3AwUXdMUEIzTzRpTkhheTQybURiUkxnIiwidGlkIjoiNzkwOTRiOWEtOWU1Ni00NDNiLTk4YWUtMDViMzgwZmZjNDYxIiwidW5pcXVlX25hbWUiOiJqYW1lcy5mcmFuY2lzY3VzQG1vZGFsZ3IuY29tLmJyIiwidXBuIjoiamFtZXMuZnJhbmNpc2N1c0Btb2RhbGdyLmNvbS5iciIsInV0aSI6IjdiUFFJNUc2MkVHUGgwUVR5UUdqQVEiLCJ2ZXIiOiIxLjAiLCJ4bXNfc3QiOnsic3ViIjoiQ29WTFZLQ3pSSVFndkdiS2ZkZmU2ZF9pTHROVmN6Ti0wUWFTU2xYZzVsdyJ9LCJ4bXNfdGNkdCI6MTQyMjcyNjA0OX0.NcNphyimRp6MyK6SKjmd8FBNETGGV4OpSYb8czQpug5NWlXXh4qD9qGY0USJbCwmyehcAbjKEWuGuDrN_VADhDyyaR4HsUhj3iFkwgL_yhTXq7ry5NLtMCFoHeejkCcYE-EU5sEt8GM1MhobG_VqjmgyGNuOwbRFYbjqZmj4n6JSHsNoVzCqNo8_LZyA-Zpx1Fd4hvoKrtrI7ocmjgRiFdLii2TpByGF9oipdIPRbR1J5UvckwhqCsS1SOV1Ngg0B5JFdxE1_3ZC1rtwC6ZewPUsxcaDF3mLs-O4VYsic_QOxFBZ6X_MKPgww29XM2yQ0Mk5WbY9FOoMCECccIbOsg`
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



}

export default Outlook;