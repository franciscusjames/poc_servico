const emailController = require('../persistence/emailController');
const htmlToText = require('html-to-text');


export async function processarEmails(emails, emailType) {
    let emailsTratados = emails.map((item) => {
        const textBody = htmlToText.fromString(item.body.content);

        let data;
        if (emailType === 'Inbox') {
            data = new Date(item.receivedDateTime);
        }
        if (emailType === 'Outbox') {
            data = new Date(item.sentDateTime);
        }

        return {
            emailId: item.id,
            tipoEmail: emailType,
            remetente: item.from.emailAddress.address,
            assunto: item.subject,
            emailBody: textBody,
            dataChegadaOuEnvio: data,
            //attachments: [],
            temAnexos: item.hasAttachments,
            foiLido: item.isRead,
            webLink: item.webLink
        };
    });
    //console.log(`emails ${emailType}: `, emailsTratados);
    console.log(`tratarEmails - ${emailType}: OK`);
    await emailController.save(emailsTratados);
}
