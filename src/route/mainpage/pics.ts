import { Router } from 'express';
import { db } from '../../data-base/db';

let router = Router();

router.get('/',(req,res)=>{
    let url = req.query.id;

    let sql = `
        select url from MainImage`;
    db.pool.query(sql, [url])
    .then(data=>{
        this.text = data;
        res.status(201).send(data);
    })
    .catch(err=>{
        res.sendStatus(500);
    });
});

module.exports = router;