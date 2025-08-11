import React from 'react';
import Hero from '../components/Home/Hero';
import FeaturedDoctors from '../components/Home/FeaturedDoctors';
import Specialties from '../components/Home/Specialties';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedDoctors />
      <Specialties />
    </div>
  );
};

export default Home;