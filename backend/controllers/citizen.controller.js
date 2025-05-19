import db from '../models/index.js';
import { routeComplaint } from '../services/router.service.js';

export const submitComplaint = async (req, res) => {
  const { name, email, category, description } = req.body;

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const [user] = await db.User.findOrCreate({ where: { email }, defaults: { name } });

    const agencyId = await routeComplaint(category, description);

    const complaint = await db.Complaint.create({
      category,        
      description,
      AgencyId: agencyId, 
      UserId: user.id,
    });

    res.status(201).json({ ticketId: complaint.id });
  } catch (error) {
    console.error('Complaint creation failed:', error);
    res.status(500).json({ error: error.message });
  }
};
export const trackComplaint = async (req, res) => {
  const { id } = req.params;

  try {
    const complaint = await db.Complaint.findByPk(id, {
      include: [db.User, db.Agency],
    });

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};