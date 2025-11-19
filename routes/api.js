import { Router } from 'express';
import Package from '../models/Package.js';
import Testimonial from '../models/Testimonial.js';
import Inquiry from '../models/Inquiry.js';
import Admin from '../models/Admin.js';
import { notifyInquiry } from '../utils/notify.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_admin_secret_change_me';

function authAdmin(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.adminId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

router.get('/packages', async (req, res, next) => {
  try {
    const items = await Package.find({});
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get('/testimonials', async (req, res, next) => {
  try {
    const items = await Testimonial.find({}).limit(8);
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get('/stats', async (req, res) => {
  res.json({ clients: 20147, rating: 4.9, reviews: 352 });
});

// Admin: manage packages
router.get('/admin/packages', authAdmin, async (req, res, next) => {
  try {
    const items = await Package.find({}).sort({ title: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.post('/admin/packages', authAdmin, async (req, res, next) => {
  try {
    const { title, price, duration, image, shortDesc, popular } = req.body;
    if (!title || !price || !duration || !image || !shortDesc) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const created = await Package.create({
      title,
      price,
      duration,
      image,
      shortDesc,
      popular: Boolean(popular)
    });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.put('/admin/packages/:id', authAdmin, async (req, res, next) => {
  try {
    const { title, price, duration, image, shortDesc, popular } = req.body;
    const update = { title, price, duration, image, shortDesc };
    if (typeof popular !== 'undefined') {
      update.popular = Boolean(popular);
    }

    const pkg = await Package.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(pkg);
  } catch (err) {
    next(err);
  }
});

router.delete('/admin/packages/:id', authAdmin, async (req, res, next) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, phone, package: pkg, message } = req.body;
    const inquiry = new Inquiry({ name, email, phone, package: pkg, message });
    await inquiry.save();
    // Fire-and-forget notification (email / WhatsApp) – errors are handled inside notifyInquiry
    notifyInquiry({ name, email, phone, pkg, message }).catch(() => {});
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
});

// Admin signup
router.post('/admin/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingCount = await Admin.countDocuments();
    if (existingCount > 0) {
      return res.status(403).json({ message: 'Admin already configured' });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Admin already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email, passwordHash });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, admin: { id: admin._id, email: admin.email } });
  } catch (err) {
    next(err);
  }
});

// Admin login
router.post('/admin/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, admin: { id: admin._id, email: admin.email } });
  } catch (err) {
    next(err);
  }
});

// Admin: list inquiries
router.get('/admin/inquiries', authAdmin, async (req, res, next) => {
  try {
    const items = await Inquiry.find({}).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// Admin: update inquiry status
router.patch('/admin/inquiries/:id/status', authAdmin, async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['pending', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.json(inquiry);
  } catch (err) {
    next(err);
  }
});

// Admin: delete inquiry
router.delete('/admin/inquiries/:id', authAdmin, async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
