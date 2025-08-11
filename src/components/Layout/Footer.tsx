import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H+</span>
              </div>
              <span className="text-xl font-bold">HealthCare</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Leading healthcare platform providing professional medical services, 
              connecting patients with certified doctors for comprehensive healthcare solutions.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">+1 (800) HEALTH-1</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">support@healthcareplus.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Medical Plaza, Healthcare District</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/doctors" className="block text-gray-300 hover:text-white transition-colors">
                Find Doctors
              </Link>
              <Link to="/appointments" className="block text-gray-300 hover:text-white transition-colors">
                Book Appointment
              </Link>
              <Link to="/consultation" className="block text-gray-300 hover:text-white transition-colors">
                Online Consultation
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm">24/7 Emergency</span>
              </div>
              <div className="text-sm">
                <div className="mb-1">Mon - Fri: 8:00 AM - 10:00 PM</div>
                <div className="mb-1">Saturday: 9:00 AM - 8:00 PM</div>
                <div>Sunday: 10:00 AM - 6:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 HealthCare+. All rights reserved. Professional healthcare platform.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;