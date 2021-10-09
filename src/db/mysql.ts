import mysql from "mysql2";
import Pool from "mysql2/typings/mysql/lib/Pool";
import PoolConnection from "mysql2/typings/mysql/lib/PoolConnection";

// import  config from 'config';
const config = require('config');

const dbConfig: any = config.get('db.mysql');

/**
 * Create mysql connection pool in a Singleton pattern 
 */
const getPool = () => {
    const pool = mysql.createPool({
        connectionLimit: dbConfig.connection,
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        debug: false,
        typeCast: (field: any, useDefaultTypeCasting: any) => {
            try {
                if (field.type === 'BIT' && field.length === 1) {
                    const bytes = field.buffer();
                    return bytes[0] === 1;
                }
                return useDefaultTypeCasting();
            } catch (error) {
                console.error('Casting failed ', error);
            }
        }
    });
    return pool;
};

let pool: Pool;

const execute = (query: string, param: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!pool) {
                pool = getPool();
            }
            pool.getConnection((connError: NodeJS.ErrnoException, connection: PoolConnection) => {
                if (connError) return reject(connError);
                connection.config.queryFormat = function (q: string, values: any) {
                    try {
                        if (!values) return q;
                        if (q.indexOf(':') === -1) {
                            return mysql.format(q, values);
                        }
                        const finalQuery = q.replace(/:(\w+)/g, (txt, key) => {
                            if (values.hasOwnProperty(key)) {
                                return this.escape(values[key]);
                            }
                            return txt;
                        });
                        return finalQuery;

                    } catch (_) {
                        return q;
                    }
                }

                connection.query(query, param, (error: any, data: any) => {
                    try {
                        connection.release();
                        if (error) {
                            return reject(error);
                        }
                        return resolve(data);
                    } catch (e) {
                        return reject(e);
                    }
                })
            });
        } catch (error) {
            reject(error);
        }
    })

}

export default {
    execute
}