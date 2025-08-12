import { Router } from 'express';
import { 
  createInvoice,
  getUserInvoices,
  getInvoiceById,
  addTokenPayment,
  getInvoiceTokens,
  updateInvoiceStatus,
  deleteInvoice
} from '../controller/invoice/index.js';
import { verifyToken } from '../helper/jwt.js';

const invoiceRouter = Router();

// Apply authentication middleware to all invoice routes
invoiceRouter.use(verifyToken);

// Invoice CRUD operations
invoiceRouter.post('/create', createInvoice);
invoiceRouter.get('/all', getUserInvoices);
invoiceRouter.get('/:invoiceId', getInvoiceById);
invoiceRouter.put('/:invoiceId/status', updateInvoiceStatus);
invoiceRouter.delete('/:invoiceId', deleteInvoice);

// Token payment operations
invoiceRouter.post('/:invoiceId/token', addTokenPayment);
invoiceRouter.get('/:invoiceId/tokens', getInvoiceTokens);

export default invoiceRouter;
