import { Router } from 'express';
let router = Router();

router.use('/restaurant',require('./mainpage/data'));
router.use('/images', require('./mainpage/pics'));
router.use('/token', require('./token/token'));
router.use('/check_register', require('./check_register/check_register'));
router.use('/register', require('./register/register'));

module.exports = router;