import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Calendar, 
  Video, 
  Phone, 
  Award, 
  Users, 
  CheckCircle,
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

// Sample doctor data - in real app, fetch based on doctorId
const getDoctorById = (id: string) => {
  const doctors = {
    '1': {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      experience: 15,
      rating: 4.9,
      reviews: 324,
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600',
      qualifications: ['MD Cardiology', 'MBBS', 'Fellowship in Interventional Cardiology'],
      languages: ['English', 'Spanish'],
      consultationFee: 150,
      treatments: ['Heart Surgery', 'Angioplasty', 'Cardiac Catheterization', 'Echocardiography', 'Stress Testing', 'Pacemaker Implantation'],
      about: 'Dr. Sarah Johnson is a highly experienced cardiologist with over 15 years of practice. She specializes in interventional cardiology and has performed over 2000 successful procedures. Dr. Johnson is known for her compassionate care and expertise in treating complex cardiac conditions.',
      education: [
        'MD in Cardiology - Harvard Medical School (2008)',
        'MBBS - Johns Hopkins University (2004)',
        'Fellowship in Interventional Cardiology - Mayo Clinic (2010)'
      ],
      awards: [
        'Best Cardiologist Award 2023',
        'Excellence in Patient Care 2022',
        'Top Doctor Recognition 2021'
      ],
      workingHours: {
        monday: '9:00 AM - 6:00 PM',
        tuesday: '9:00 AM - 6:00 PM',
        wednesday: '9:00 AM - 6:00 PM',
        thursday: '9:00 AM - 6:00 PM',
        friday: '9:00 AM - 5:00 PM',
        saturday: '10:00 AM - 2:00 PM',
        sunday: 'Closed'
      },
      location: 'New York Medical Center, 123 Health Street, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'dr.sarah@healthcenter.com'
    },
    '2': {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      experience: 12,
      rating: 4.8,
      reviews: 256,
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=600',
      qualifications: ['MD Dermatology', 'MBBS', 'Diploma in Dermatology'],
      languages: ['English', 'Mandarin'],
      consultationFee: 120,
      treatments: ['Acne Treatment', 'Skin Cancer Screening', 'Cosmetic Procedures', 'Laser Therapy', 'Mole Removal', 'Botox Injections'],
      about: 'Dr. Michael Chen is a board-certified dermatologist specializing in both medical and cosmetic dermatology. He is known for his expertise in advanced laser treatments and has helped thousands of patients achieve healthy, beautiful skin.',
      education: [
        'MD in Dermatology - Stanford University (2011)',
        'MBBS - University of California (2007)',
        'Residency in Dermatology - UCLA Medical Center (2011)'
      ],
      awards: [
        'Outstanding Dermatologist 2023',
        'Patient Choice Award 2022',
        'Innovation in Skincare 2021'
      ],
      workingHours: {
        monday: '8:00 AM - 5:00 PM',
        tuesday: '8:00 AM - 5:00 PM',
        wednesday: '8:00 AM - 5:00 PM',
        thursday: '8:00 AM - 5:00 PM',
        friday: '8:00 AM - 4:00 PM',
        saturday: '9:00 AM - 1:00 PM',
        sunday: 'Closed'
      },
      location: 'Skin Care Clinic, 456 Beauty Ave, NY 10002',
      phone: '+1 (555) 234-5678',
      email: 'dr.chen@skincareclinic.com'
    }
  };
  
  return doctors[id as keyof typeof doctors] || doctors['1'];
};

const DoctorProfile: React.FC = () => {
  const { doctorId } = useParams();
  const doctor = getDoctorById(doctorId || '1');
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About', icon: Users },
    { id: 'treatments', label: 'Treatments', icon: CheckCircle },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/doctors"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Doctors
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
            >
              {/* Doctor Image and Basic Info */}
              <div className="text-center mb-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-100"
                />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                <p className="text-blue-600 font-semibold text-lg mb-2">{doctor.specialty}</p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
                  <span>{doctor.experience} years exp.</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{doctor.rating}</span>
                    <span>({doctor.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>{doctor.phone}</span>
                </div>
              </div>

              {/* Consultation Fee */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Consultation Fee</p>
                  <p className="text-2xl font-bold text-blue-600">${doctor.consultationFee}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  to={`/booking/${doctor.id}`}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Link>
                <Link
                  to={`/video-consultation/${doctor.id}`}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center flex items-center justify-center"
                >
                  <Video className="w-5 h-5 mr-2" />
                  Video Consultation
                </Link>
                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg"
            >
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About Dr. {doctor.name.split(' ')[1]}</h3>
                      <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                      <div className="space-y-2">
                        {doctor.education.map((edu, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                            <span className="text-gray-600">{edu}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Awards & Recognition</h3>
                      <div className="space-y-2">
                        {doctor.awards.map((award, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                            <span className="text-gray-600">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor.languages.map((language, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'treatments' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatments & Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {doctor.treatments.map((treatment, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700">{treatment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'schedule' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Working Hours</h3>
                    <div className="space-y-3">
                      {Object.entries(doctor.workingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-900 capitalize">{day}</span>
                          <span className={`text-sm ${hours === 'Closed' ? 'text-red-600' : 'text-gray-600'}`}>
                            {hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Reviews</h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: 'John Smith',
                          rating: 5,
                          date: '2 weeks ago',
                          comment: 'Excellent doctor! Very professional and caring. The treatment was effective and I felt comfortable throughout the consultation.'
                        },
                        {
                          name: 'Maria Garcia',
                          rating: 5,
                          date: '1 month ago',
                          comment: 'Dr. Johnson is amazing. She explained everything clearly and the procedure went smoothly. Highly recommended!'
                        },
                        {
                          name: 'David Wilson',
                          rating: 4,
                          date: '2 months ago',
                          comment: 'Great experience overall. The doctor was knowledgeable and the staff was friendly. Would visit again.'
                        }
                      ].map((review, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{review.name}</span>
                              <div className="flex items-center">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-600 text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;