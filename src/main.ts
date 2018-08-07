import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as mysql from 'mysql';
import { EPROTO } from 'constants';

interface IMainOptions {
  enableCors: boolean;
  env: string;
  port: number;
  verbose?: boolean;
}

export class TestConnector {
  public get testString() {
    return "it works from connector as well!";
  }
}

export function main(options: IMainOptions) {
  let app = express();

  app.use(helmet());

  app.use(morgan(options.env));

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  

  app.use('/images', express.static('uploads'));

  app.use('/', require('./route/index'));
  
  let testConnector = new TestConnector();

  return new Promise((resolve, reject) => {
    let server = app.listen(options.port, () => {
      /* istanbul ignore if: no need to test verbose print */
      resolve(server);
    }).on("error", (err: Error) => {
      reject(err);
    });
  });
}

/* istanbul ignore if: main scope */
if (require.main === module) {
  const PORT = parseInt(process.env.PORT || '3000', 10);

  // Either to export GraphiQL (Debug Interface) or not.
  const NODE_ENV = process.env.NODE_ENV !== "production" ? "dev" : "production";

  // Enable cors (cross-origin HTTP request) or not.
  const ENABLE_CORS = NODE_ENV !== "production";

  main({
    enableCors: ENABLE_CORS,
    env: NODE_ENV,
    port: PORT,
    verbose: true,
  });
}

// let conn = mysql.createConnection({
//   host : 'itsmpohang.hssa.me',
//   user : 'root',
//   password : '!itsmtime',
//   port : 3306,
//   database : 'Bulletin_Board'
// });

// conn.connect();

// conn.query('Select * from board', (err, rows, fields) =>{
//   if(!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.', err);
// });

// conn.end();
