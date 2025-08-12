import { Router } from "express";
import { invoiceform } from "../controller/index.js";

const invoice = Router();

invoice.post('/invoice', invoiceform.createInvoice);
invoice.get('/invoices', invoiceform.getInvoices);
invoice.get('/invoice/:id', invoiceform.getInvoiceById);
invoice.put('/invoice/:id', invoiceform.updateInvoice);
invoice.delete('/invoice/:id', invoiceform.deleteInvoice);



export default invoice