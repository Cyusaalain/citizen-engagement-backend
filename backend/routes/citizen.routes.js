import express from 'express';
import { submitComplaint, trackComplaint } from '../controllers/citizen.controller.js';

const router = express.Router();
router.post('/submit', submitComplaint);
router.get('/track/:id', trackComplaint);

export default router;
