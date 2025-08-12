import { Router} from 'express';
import authrouter from './user.js';
import invoiceRouter from './invoice.js';
// import { verifyToken } from '../helper/verifytoken.js';


const router = Router();
router.use('/auth',  authrouter);
router.use('/invoice', invoiceRouter);

export default router;