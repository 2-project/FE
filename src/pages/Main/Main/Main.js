import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import ImageSlider from './ImageSlider';
import HeaderMain from './HeaderMain';
import Footer from '../../../components/Footer/Footer';
import ScrollToTop from '../../../components/ScrollToTop';
import ProductListComponent from './ProductListComponent';

function Main() {
  const productListComponentRef = useRef();

  const handleSubSectionClick = (category) => {
    if (productListComponentRef.current) {
      productListComponentRef.current.scrollToCategory(category);
    }
  };

  return (
    <div>
      <HeaderMain onSubSectionClick={handleSubSectionClick} />

      <ImageSlider></ImageSlider>
      <ProductListComponent ref={productListComponentRef} />
      <ScrollToTop></ScrollToTop>
      <Footer></Footer>
    </div>
  );
}

export default Main;
