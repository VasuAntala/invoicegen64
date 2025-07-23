import {Router} from'express';
import {authcontroller} from'../controller/index.js';
import {verifyToken} from'../helper/jwt.js';
// import {hashpassword} from'../helper/bcrypt.js';

const authrouter = Router();

authrouter.post('/login',   authcontroller.login);

authrouter.post('/registers', authcontroller.register);


export default authrouter;