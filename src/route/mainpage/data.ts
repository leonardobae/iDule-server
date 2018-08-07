import { Router } from 'express';
import { db } from '../../data-base/db';

let router = Router();

router.get('/',(req,res)=>{
    
    let sql = `
        select * from restaurants a, MainImage b where a.id = b.id`;
    db.pool.query(sql)
    .then(data=>{
        
        this.text = data;
        res.status(201).send(data);
    })
    .catch(err=>{
        res.sendStatus(500);
    });
});

router.post('/', (req,res)=>{
    console.log(req.query.name);
    console.log(req.body.upd_dttm.c.d);
    res.status(201).send(200);
});
module.exports = router;