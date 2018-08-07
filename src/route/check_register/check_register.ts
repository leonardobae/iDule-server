import { Router } from 'express';
import { db } from '../../data-base/db';

let router = Router();

router.post('/', (req,res)=>{
    console.log(req.body.name);
    console.log(JSON.stringify(req.body));
    let id_check_query = `
        select student_id from Users where student_id = ?`;
    db.pool.query(id_check_query, [req.body.student_id])
    .then(id=>{
        if(id == 0){
            res.sendStatus(200);
        }
        else{
            throw "duplicated";
        } 
    })
    .catch(err=>{
        if(err == 'duplicated'){
            res.status(404).send({error: "이미 등록된 학번"});
        }
        else{
            res.status(500).send({error:err.toString()});
        }
    })
});
module.exports = router;