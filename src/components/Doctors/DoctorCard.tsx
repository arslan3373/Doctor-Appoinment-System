import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, Video, DollarSign } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Doctor Image and Basic Info */}
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
            <p className="text-blue-600 font-semibold mb-1">{doctor.specialty}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{doctor.experience} years exp.</span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-semibold">{doctor.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Qualifications */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {doctor.qualifications.slice(0, 2).map((qual, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
              >
                {qual}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Languages:</span> {doctor.languages.join(', ')}
          </p>
        </div>

        {/* About */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">{doctor.about}</p>
        </div>

        {/* Treatments */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Treatments:</p>
          <div className="flex flex-wrap gap-1">
            {doctor.treatments.slice(0, 3).map((treatment, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded font-medium"
              >
                {treatment}
              </span>
            ))}
            {doctor.treatments.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded font-medium">
                +{doctor.treatments.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Consultation Fee */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-lg font-bold text-gray-900">${doctor.consultationFee}</span>
            <span className="text-sm text-gray-600">consultation</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Available today</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link
            to={`/doctors/${doctor.id}`}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center text-sm"
          >
            View Profile
          </Link>
          <Link
            to={`/booking/${doctor.id}`}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center text-sm flex items-center justify-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Appointment
          </Link>
        </div>

        {/* Video Consultation Option */}
        <div className="mt-3">
          <Link
            to={`/video-consultation/${doctor.id}`}
            className="w-full bg-green-50 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-100 transition-colors text-center text-sm flex items-center justify-center"
          >
            <Video className="w-4 h-4 mr-2" />
            Video Consultation Available
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;