import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const featuredDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: 15,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    consultationFee: 150,
    location: 'New York Medical Center',
    nextAvailable: 'Today 2:00 PM'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    experience: 12,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
    consultationFee: 120,
    location: 'Skin Care Clinic',
    nextAvailable: 'Tomorrow 10:00 AM'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    experience: 10,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    consultationFee: 100,
    location: 'Children\'s Hospital',
    nextAvailable: 'Today 4:00 PM'
  }
];

const FeaturedDoctors: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Doctors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our top-rated doctors who are ready to provide you with 
            exceptional healthcare services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Doctor Image */}
              <div className="relative overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{doctor.rating}</span>
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-blue-600 font-semibold">{doctor.specialty}</p>
                  <p className="text-sm text-gray-600">{doctor.experience} years experience</p>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Next: {doctor.nextAvailable}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${doctor.consultationFee}</span>
                    <span className="text-sm text-gray-600 ml-1">consultation</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link
                    to={`/doctors/${doctor.id}`}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                  >
                    View Profile
                  </Link>
                  <Link
                    to={`/booking/${doctor.id}`}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center flex items-center justify-center"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/doctors"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Doctors
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;