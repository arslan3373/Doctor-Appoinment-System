import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './components/Auth/Login';
import Register from './pages/Register';
import VideoConsultation from './pages/VideoConsultation';
import DoctorProfile from './pages/DoctorProfile';
import AppointmentBooking from './pages/AppointmentBooking';
import MyAppointments from './pages/MyAppointments';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Auth routes without layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Main routes with layout */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/doctors" element={<Doctors />} />
                  <Route path="/doctors/:doctorId" element={<DoctorProfile />} />
                  <Route path="/booking/:doctorId" element={<AppointmentBooking />} />
                  <Route path="/appointments" element={<MyAppointments />} />
                  <Route path="/consultation" element={<VideoConsultation />} />
                  <Route path="/video-consultation/:doctorId" element={<VideoConsultation />} />
                </Routes>
              </Layout>
            } />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;