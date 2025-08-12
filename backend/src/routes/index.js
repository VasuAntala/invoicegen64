import { Router} from 'express';
import authrouter from './user.js';
import invoice from './invoice.js';
import { auth } from '../helper/jwt.js';


const router = Router();
router.use('/auth',  authrouter);
router.use('/gen', invoice);


export default router;