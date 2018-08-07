import { Router } from 'express';
import { db } from '../../data-base/db';
import * as crypto from 'crypto';

let router = Router();

router.post('/', (req,res)=>{
    console.log(req.body.name);
    console.log(JSON.stringify(req.body));
    let id_insert_query = `
        insert into Users (student_id, name, phone_num, pwd)
        values (?, ?, ?, ?)`;
    db.pool.query(id_insert_query, [req.body.student_id, req.body.name, req.body.phone, crypto.createHash('sha256').update(req.body.pwd).digest('hex')])
    .then(result=>{
        res.sendStatus(200); 
    })
    .catch(err=>{
        res.status(500).send({error:err.toString()});
    })
    
});

module.exports = router;