import { Router } from 'express';
import { getAdminStats, listUsers, listInvoices } from '../services/stats.service.js';

const statsRouter = Router();

// Optionally protect with auth middleware in future
statsRouter.get('/stats', async (req, res) => {
  try {
    const stats = await getAdminStats();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats', error: error.message });
  }
});

export default statsRouter;

// Admin: list users (no passwords)
statsRouter.get('/users', async (req, res) => {
  try {
    const users = await listUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message });
  }
});

// Admin: list invoices
statsRouter.get('/invoices', async (req, res) => {
  try {
    const invoices = await listInvoices();
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch invoices', error: error.message });
  }
});

