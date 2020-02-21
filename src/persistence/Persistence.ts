const { KnexSingleton } = require('../utils/knexSingleton');

export class Persistence {
    connection;

    constructor() {
        this.connection = KnexSingleton.getInstance().conn;
    }

    emailData = (emailData) => {
        return {
            "emailId": emailData.emailId,
            "tipoEmail": emailData.tipoEmail,
            "remetente": emailData.remetente,
            "assunto": emailData.assunto,
            "emailBody": emailData.emailBody,
            "dataChegadaOuEnvio": emailData.dataChegadaOuEnvio,
            "temAnexos": emailData.temAnexos,
            "foiLido": emailData.foiLido,
            "finalizado": emailData.finalizado
        }
    }

    insertEmail = async (email) => {
        await this.connection('emails')
            .insert(await this.emailData(email));
    }

    // anexoData = (attachments, emailId) => {
    //     return {
    //         "emailId": emailId,
    //         "fileName": attachments.fileName,
    //         "fileContent": JSON.stringify(attachments.fileContent)
    //     }
    // }

    // insertAnexo = async (attachments, emailId) => {
    //     await this.connection('attachments')
    //         .insert(await this.anexoData(attachments, emailId))
    // }

}
