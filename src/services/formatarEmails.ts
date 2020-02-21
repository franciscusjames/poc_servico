const emailController = require('../persistence/emailController');
const htmlToText = require('html-to-text');


export async function processarEmails(emails, emailType) {
    let emailsTratados = emails.map((item) => {
        let textBody = htmlToText.fromString(item.body.content)
        return {
            emailId: item.id,
            tipoEmail: emailType,
            remetente: item.from.emailAddress.address,
            assunto: item.subject,
            emailBody: textBody,
            dataChegadaOuEnvio: item.receivedDateTime,
            //attachments: [],
            temAnexos: item.hasAttachments,
            foiLido: item.isRead
        };
    });
    //console.log(`emails ${emailType}: `, emailsTratados);
    console.log(`tratarEmails - ${emailType}: OK`);
    await emailController.save(emailsTratados);
}
