import { isNullOrUndefined } from '../index';

class Email {

    emailId;
    tipoEmail;
    remetente;
    assunto;
    emailBody;
    dataChegadaOuEnvio;
    temAnexos;
    foiLido;
    finalizado;


    constructor(emailId, tipoEmail, remetente, assunto, emailBody, dataChegadaOuEnvio, temAnexos, foiLido) {
        this.emailId = emailId;
        this.tipoEmail = tipoEmail;
        this.remetente = remetente;
        this.assunto = assunto;
        this.emailBody = emailBody;
        this.dataChegadaOuEnvio = dataChegadaOuEnvio;
        this.temAnexos = temAnexos;
        this.foiLido = foiLido;
        this.finalizado = 'Não';

        this.validate();
    }

    validate() {
        if (isNullOrUndefined(this.emailId)) throw Error('emailId é obrigatório.')
        if (isNullOrUndefined(this.tipoEmail)) throw Error('tipoEmail é obrigatório.')
        if (isNullOrUndefined(this.remetente)) throw Error('remetente é obrigatório.')
        if (isNullOrUndefined(this.assunto)) throw Error('assunto é obrigatório.')
        if (isNullOrUndefined(this.emailBody)) throw Error('emailBody é obrigatório.')
        if (isNullOrUndefined(this.dataChegadaOuEnvio)) throw Error('dataChegadaOuEnvio é obrigatório.')
        if (isNullOrUndefined(this.temAnexos)) throw Error('temAnexos é obrigatório.')
        if (isNullOrUndefined(this.foiLido)) throw Error('foiLido é obrigatório.')
    }

}

module.exports = Email
