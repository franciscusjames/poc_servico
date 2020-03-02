const Email = require('../models/Email');
const Attachment = require('../models/Attachment');
import { Persistence } from './Persistence';

exports.save = async (emails) => {
    const persistence = new Persistence();
    console.log('-> Gravando emails no banco...');
    emails.map(async (item) => {
        let email = new Email(
            item.emailId,
            item.tipoEmail,
            item.remetente,
            item.assunto,
            item.emailBody,
            item.dataChegadaOuEnvio,
            item.temAnexos,
            //item.attachments,
            item.foiLido,
            item.webLink,
            item.finalizado
        );

        await persistence.insertEmail(email);

        // if (item.hasAttachments) {
        //     item.attachments.map(async (anexo) => {
        //         let attachment = new Attachment(anexo.fileName, anexo.fileContent);
        //         await persistence.insertAnexo(attachment, item.emailId);
        //     })
        // }

    });
    console.log(`emailSave - ${emails[0].tipoEmail}: OK`);
    console.log('------------------------');
    return;
}