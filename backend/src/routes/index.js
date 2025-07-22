import { Router} from 'express';
import authrouter from './user.js';
// import { verifyToken } from '../helper/verifytoken.js';


const router = Router();
router.use('/auth',  authrouter);

export default router;