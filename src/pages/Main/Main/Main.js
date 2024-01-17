import React from 'react';
import ReactDOM from 'react-dom';
import ImageSlider from './ImageSlider';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const Main = () => {
  return (
    <div>
      <Header />
      <ImageSlider />
      <Footer />
    </div>
  );
};

export default Main;
