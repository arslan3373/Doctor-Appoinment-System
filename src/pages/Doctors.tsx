import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import DoctorCard from '../components/Doctors/DoctorCard';
import { Doctor } from '../types';

// Sample doctors data
const sampleDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: 15,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    qualifications: ['MD Cardiology', 'MBBS', 'Fellowship in Interventional Cardiology'],
    languages: ['English', 'Spanish'],
    consultationFee: 150,
    treatments: ['Heart Surgery', 'Angioplasty', 'Cardiac Catheterization', 'Echocardiography'],
    about: 'Dr. Sarah Johnson is a highly experienced cardiologist with over 15 years of practice. She specializes in interventional cardiology and has performed over 2000 successful procedures.',
    availableSlots: []
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    experience: 12,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
    qualifications: ['MD Dermatology', 'MBBS', 'Diploma in Dermatology'],
    languages: ['English', 'Mandarin'],
    consultationFee: 120,
    treatments: ['Acne Treatment', 'Skin Cancer Screening', 'Cosmetic Procedures', 'Laser Therapy'],
    about: 'Dr. Michael Chen is a board-certified dermatologist specializing in both medical and cosmetic dermatology. He is known for his expertise in advanced laser treatments.',
    availableSlots: []
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    experience: 10,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    qualifications: ['MD Pediatrics', 'MBBS', 'Certificate in Child Development'],
    languages: ['English', 'Spanish', 'Portuguese'],
    consultationFee: 100,
    treatments: ['Child Vaccination', 'Growth Monitoring', 'Behavioral Assessment', 'Nutrition Counseling'],
    about: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive healthcare for children from birth to adolescence.',
    availableSlots: []
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedic Surgeon',
    experience: 18,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=400',
    qualifications: ['MD Orthopedics', 'MBBS', 'Fellowship in Sports Medicine'],
    languages: ['English'],
    consultationFee: 180,
    treatments: ['Joint Replacement', 'Sports Injury', 'Fracture Treatment', 'Arthroscopy'],
    about: 'Dr. James Wilson is a renowned orthopedic surgeon with expertise in joint replacement and sports medicine. He has helped thousands of patients regain mobility.',
    availableSlots: []
  },
  {
    id: '5',
    name: 'Dr. Lisa Anderson',
    specialty: 'Neurologist',
    experience: 14,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
    qualifications: ['MD Neurology', 'MBBS', 'Fellowship in Epilepsy'],
    languages: ['English', 'French'],
    consultationFee: 160,
    treatments: ['Epilepsy Treatment', 'Stroke Care', 'Headache Management', 'Memory Disorders'],
    about: 'Dr. Lisa Anderson is a specialized neurologist with extensive experience in treating complex neurological conditions and epilepsy management.',
    availableSlots: []
  },
  {
    id: '6',
    name: 'Dr. Robert Kumar',
    specialty: 'Ophthalmologist',
    experience: 16,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/5327652/pexels-photo-5327652.jpeg?auto=compress&cs=tinysrgb&w=400',
    qualifications: ['MD Ophthalmology', 'MBBS', 'Fellowship in Retinal Surgery'],
    languages: ['English', 'Hindi', 'Tamil'],
    consultationFee: 140,
    treatments: ['Cataract Surgery', 'Retinal Treatment', 'LASIK Surgery', 'Glaucoma Treatment'],
    about: 'Dr. Robert Kumar is a leading ophthalmologist specializing in retinal disorders and advanced eye surgeries with over 5000 successful procedures.',
    availableSlots: []
  }
];

const specialties = [
  'All Specialties',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic Surgeon',
  'Neurologist',
  'Ophthalmologist',
  'General Medicine',
  'Psychiatrist',
  'Gynecologist'
];

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(sampleDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedDoctors = doctors
    .filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'All Specialties' || 
                              doctor.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'fee':
          return a.consultationFee - b.consultationFee;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Find the Right Doctor for You
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through our network of certified doctors and book appointments instantly
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex items-center space-x-4">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="experience">Sort by Experience</option>
                  <option value="fee">Sort by Fee (Low to High)</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>

              <div className="text-sm text-gray-600">
                {filteredAndSortedDoctors.length} doctors found
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredAndSortedDoctors.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;