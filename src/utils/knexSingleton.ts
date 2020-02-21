import * as Knex from 'knex';

export class KnexSingleton {

    public readonly conn: Knex<any, any[]>;
    private static instance: KnexSingleton;

    private constructor() {
        this.conn = Knex({
            client: 'mysql2',
            version: '5.7',
            connection: {
                host: process.env.DBHOST,
                user: process.env.DBUSER,
                password: process.env.DBPASSWORD,
                database: process.env.DBNAME
            },
            pool: {
                min: 0,
                max: 10,
                idleTimeoutMillis: 20000
            },
            acquireConnectionTimeout: 15000
        });

    }

    public static getInstance(): KnexSingleton {
        if (!KnexSingleton.instance) {
            console.log('Criando nova instância');
            KnexSingleton.instance = new KnexSingleton();
        }
        return KnexSingleton.instance;
    }
}