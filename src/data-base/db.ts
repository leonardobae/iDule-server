import { DB_HOST } from '../config';
var mysql = require('promise-mysql');

class DB {
    pool;
    // getPool(){
    //     return this.pool;
    // }
    constructor() {
        this.pool  = mysql.createPool({
            connectionLimit : 10,
            host            : DB_HOST,
            user            : 'root',
            password        : '!itsmtime', //qa일때만
            database        : 'Bulletin_Board',
            port            : 3306 
        });
    }
}

var redis = require("redis");

var client = redis.createClient({ host: 'itsmpohang.hssa.me' });
client.on('connect', function() {
  console.log('REDIS: connected');
});
var db = new DB();
export {db, client as Redis};