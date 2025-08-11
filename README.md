# HealthCare+ Professional Medical Platform

A comprehensive healthcare management system with video consultations, appointment booking, and professional medical services.

## Features

### 🏥 Core Healthcare Features
- **Doctor Discovery**: Browse certified medical professionals by specialty
- **Appointment Booking**: Schedule in-person and video consultations
- **Video Consultations**: Real-time video calls with doctors
- **Health Records**: Secure medical record management
- **Email Notifications**: Automated appointment confirmations and reminders

### 🔐 Authentication & Security
- **JWT Authentication**: Secure user authentication
- **Password Encryption**: Bcrypt password hashing
- **Role-based Access**: Patient and doctor role management
- **Secure API**: Protected endpoints with middleware

### 💻 Technical Features
- **Real-time Video**: WebRTC-based video calling
- **Socket.IO**: Real-time communication
- **Professional UI**: Modern, responsive design
- **Email Integration**: Nodemailer for email services
- **File Upload**: Multer for document handling

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Axios** for API calls
- **Socket.IO Client** for real-time features
- **Simple Peer** for WebRTC video calls

### Backend
- **Node.js** with Express
- **Socket.IO** for real-time communication
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Nodemailer** for email services
- **Multer** for file uploads
- **CORS** for cross-origin requests

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Gmail account for email services

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd healthcare-platform
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
```

4. **Environment Setup**
```bash
# In server directory
cp .env.example .env
# Edit .env with your configuration
```

5. **Start the backend server**
```bash
cd server
npm run dev
```

6. **Start the frontend development server**
```bash
# In root directory
npm run dev
```

## Configuration

### Email Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an app password
3. Update `.env` file with your credentials:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### JWT Configuration
```env
JWT_SECRET=your-super-secret-jwt-key-here
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments` - Get user appointments
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Video Consultations
- `POST /api/video/create-room` - Create video room
- `GET /api/video/room/:roomId` - Get room details

## Features in Detail

### Video Consultation System
- **WebRTC Integration**: Direct peer-to-peer video calls
- **Real-time Chat**: In-call messaging system
- **Screen Sharing**: Share screen during consultations
- **Call Recording**: Record sessions for medical records
- **Multi-participant**: Support for multiple participants

### Professional Email System
- **Welcome Emails**: Automated registration confirmations
- **Appointment Confirmations**: Detailed booking confirmations
- **Reminders**: 24-hour appointment reminders
- **Prescription Delivery**: Email prescription documents
- **Professional Templates**: Medical-grade email templates

### Security Features
- **Data Encryption**: All sensitive data encrypted
- **HIPAA Compliance**: Healthcare data protection standards
- **Secure File Upload**: Protected document handling
- **Session Management**: Secure user session handling
- **API Rate Limiting**: Protection against abuse

## Deployment

### Production Setup
1. **Environment Variables**
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=production-secret-key
DATABASE_URL=production-database-url
```

2. **Build Frontend**
```bash
npm run build
```

3. **Start Production Server**
```bash
cd server
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@healthcareplus.com or create an issue in the repository.

## Acknowledgments

- Medical professionals who provided consultation requirements
- Healthcare industry standards and compliance guidelines
- Open source community for excellent libraries and tools