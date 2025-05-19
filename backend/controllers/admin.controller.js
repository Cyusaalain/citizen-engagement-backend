import db from '../models/index.js';
import bcrypt from 'bcrypt';
import { sendStatusEmail } from '../services/email.service.js';

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await db.Admin.findOne({ where: { username } });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const respondToComplaint = async (req, res) => {
  const { id } = req.params;
  const { status, response } = req.body;

  const complaint = await db.Complaint.findByPk(id, {
    include: [db.User, db.Agency], 
  });
  if (!complaint) return res.status(404).json({ error: 'Not found' });

  complaint.status = status || complaint.status;
  complaint.response = response || complaint.response;
  await complaint.save();

  await sendStatusEmail(complaint.User.email, complaint);

  res.send('Updated and email sent');
};

export const getAssignedComplaints = async (req, res) => {
  const { username } = req.query;

  try {
    const admin = await db.Admin.findOne({ where: { username } });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const complaints = await db.Complaint.findAll({
      where: { AgencyId: admin.AgencyId },
      include: [db.User, db.Agency],
      order: [['createdAt', 'DESC']],
    });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getComplaintStats = async (req, res) => {
  const { username } = req.query;

  try {
    const admin = await db.Admin.findOne({ where: { username } });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const agencyId = admin.AgencyId;

    const [open, closed, inProgress, total] = await Promise.all([
      db.Complaint.count({ where: { status: 'Open', AgencyId: agencyId } }),
      db.Complaint.count({ where: { status: 'Closed', AgencyId: agencyId } }),
      db.Complaint.count({ where: { status: 'In Progress', AgencyId: agencyId } }),
      db.Complaint.count({ where: { AgencyId: agencyId } }),
    ]);

    res.json({ open, closed, inProgress, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};