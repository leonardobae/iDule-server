import * as express from 'express';
import { db } from '../../data-base/db';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE, REFRESH_TOKEN_SECRET } from '../../config';
import { Router } from  'express';

let router = Router();

router.post('/', (req, res)=>{
    console.log(req.body);
    passwordGrant(req,res);
})

function passwordGrant(req, res) {
    let username = req.body.student_id;
    let password = req.body.pwd;
    console.log(password);
    console.log(typeof password);
    console.log(crypto.createHash('sha256').update(password).digest('hex'));
    let persistant = req.body.persistant;

    const sql = `
        select name, student_id from Users where student_id=? AND pwd=?
    `;
    db.pool.query(sql, [username, crypto.createHash('sha256').update(password).digest('hex')])
    .then(_=>{
        if(_.length > 0){
            console.log("HERE")
            jwt.sign({ 
                user: _.name}, JWT_SECRET, {
                expiresIn: 3600,
                issuer: JWT_ISSUER,
                audience: JWT_AUDIENCE,
                subject: _.student_id + ''
            }, (err, token)=>{
                if(err){
                    res.status(500).sent({error: err});
                } else{
                    let response: any = {
                        access_token: token,
                        expires_in: JSON.parse(new Buffer(token.split('.')[1], 'base64').toString()).exp
                    }
                    if(persistant){
                        response.refresh_token = jwt.sign({ user: +_.name }, REFRESH_TOKEN_SECRET,{
                            expires_in: 3600*24*30,
                            subject: _.student_id + ''
                        });
                    }
                    res.status(200).send(response);
                    }
                });
            } else {
                res.sendStatus(404);
            }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send({error: err});
    });
}

module.exports = router;
