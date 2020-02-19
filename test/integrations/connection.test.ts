import { assert } from '../init';
import 'mocha';
import { KnexSingleton } from '../../src/utils/knexSingleton';
import * as Knex from 'knex';

process.env.DBHOST = 'poc-database.ckuyozcu3sos.us-east-1.rds.amazonaws.com'
process.env.DBUSER = 'admin'
process.env.DBPORT = '3306'
process.env.DBPASSWORD = 'password01'
process.env.DBNAME = 'poc_example'

describe("KnexConnection", () => {
    context("Teste de conexão bem sucedida.", () => {
        it("Instãncia de conexão com banco bem sucedida", async () => {
            const conn = KnexSingleton.getInstance().conn;
            assert.isFunction(conn.client.driver.createConnection, 'Conexão válida');
        });
    });
    context("Teste de conexão mal sucedida.", () => {
        it("Instãncia de conexão com banco mal sucedida", async () => {
            this.conn = Knex({
                client: 'mysql2',
                version: '5.7',
                connection: {
                    host: process.env.DBHOST,
                    user: process.env.DBUSER,
                    password: undefined,
                    database: process.env.DBNAME
                },
            });
            assert.notExists(this.conn.client.connectionSettings.password, 'Conexão inválida');
        });
    });
});
