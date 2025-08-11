import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Eye, Bone, Baby, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';

const specialties = [
  {
    name: 'Cardiology',
    icon: Heart,
    description: 'Heart and cardiovascular care',
    doctorCount: 45,
    color: 'bg-red-100 text-red-600'
  },
  {
    name: 'Neurology',
    icon: Brain,
    description: 'Brain and nervous system',
    doctorCount: 32,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    name: 'Ophthalmology',
    icon: Eye,
    description: 'Eye and vision care',
    doctorCount: 28,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    name: 'Orthopedics',
    icon: Bone,
    description: 'Bone and joint care',
    doctorCount: 38,
    color: 'bg-green-100 text-green-600'
  },
  {
    name: 'Pediatrics',
    icon: Baby,
    description: 'Children healthcare',
    doctorCount: 42,
    color: 'bg-pink-100 text-pink-600'
  },
  {
    name: 'General Medicine',
    icon: Stethoscope,
    description: 'Primary healthcare',
    doctorCount: 55,
    color: 'bg-indigo-100 text-indigo-600'
  }
];

const Specialties: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Medical Specialties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find doctors across various specialties and get expert medical care 
            for your specific health needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/doctors?specialty=${specialty.name.toLowerCase()}`}
                className="block bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 rounded-xl ${specialty.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <specialty.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {specialty.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{specialty.description}</p>
                    <p className="text-sm text-blue-600 font-medium">
                      {specialty.doctorCount} doctors available
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/doctors"
            className="inline-block text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            View All Specialties →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Specialties;