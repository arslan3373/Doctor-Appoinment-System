const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// In-memory storage (replace with database in production)
const users = [];
const doctors = [];
const appointments = [];
const videoSessions = new Map();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Email sending utility
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to,
      subject,
      html
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

// Routes

// User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, dateOfBirth, gender, role = 'patient' } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      phone,
      dateOfBirth,
      gender,
      role,
      verified: false,
      createdAt: new Date().toISOString()
    };

    users.push(user);

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send welcome email
    const emailSent = await sendEmail(
      email,
      'Welcome to HealthCare+',
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to HealthCare+</h2>
        <p>Dear ${name},</p>
        <p>Thank you for registering with HealthCare+. Your account has been created successfully.</p>
        <p>You can now:</p>
        <ul>
          <li>Browse and book appointments with certified doctors</li>
          <li>Schedule video consultations</li>
          <li>Access your medical records</li>
          <li>Receive appointment reminders</li>
        </ul>
        <p>Best regards,<br>HealthCare+ Team</p>
      </div>
      `
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
      token,
      emailSent
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user profile
app.get('/api/auth/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Book appointment
app.post('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const {
      doctorId,
      date,
      time,
      type,
      symptoms,
      patientName,
      phone
    } = req.body;

    const appointment = {
      id: uuidv4(),
      patientId: req.user.id,
      doctorId,
      date,
      time,
      type,
      symptoms,
      patientName,
      phone,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    appointments.push(appointment);

    // Send confirmation email
    const user = users.find(u => u.id === req.user.id);
    if (user) {
      await sendEmail(
        user.email,
        'Appointment Confirmation - HealthCare+',
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Appointment Confirmed</h2>
          <p>Dear ${patientName},</p>
          <p>Your appointment has been successfully booked.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Appointment Details:</h3>
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Type:</strong> ${type === 'online' ? 'Video Consultation' : 'In-Person Visit'}</p>
            <p><strong>Doctor ID:</strong> ${doctorId}</p>
          </div>
          <p>We'll send you a reminder 24 hours before your appointment.</p>
          <p>Best regards,<br>HealthCare+ Team</p>
        </div>
        `
      );
    }

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    console.error('Appointment booking error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user appointments
app.get('/api/appointments', authenticateToken, (req, res) => {
  const userAppointments = appointments.filter(a => a.patientId === req.user.id);
  res.json(userAppointments);
});

// Video calling endpoints
app.post('/api/video/create-room', authenticateToken, (req, res) => {
  const roomId = uuidv4();
  videoSessions.set(roomId, {
    id: roomId,
    participants: [],
    createdAt: new Date().toISOString(),
    createdBy: req.user.id
  });

  res.json({ roomId });
});

app.get('/api/video/room/:roomId', authenticateToken, (req, res) => {
  const { roomId } = req.params;
  const session = videoSessions.get(roomId);
  
  if (!session) {
    return res.status(404).json({ message: 'Room not found' });
  }

  res.json(session);
});

// Socket.IO for video calling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });

  socket.on('offer', (roomId, offer) => {
    socket.to(roomId).emit('offer', offer);
  });

  socket.on('answer', (roomId, answer) => {
    socket.to(roomId).emit('answer', answer);
  });

  socket.on('ice-candidate', (roomId, candidate) => {
    socket.to(roomId).emit('ice-candidate', candidate);
  });

  socket.on('end-call', (roomId) => {
    socket.to(roomId).emit('call-ended');
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});