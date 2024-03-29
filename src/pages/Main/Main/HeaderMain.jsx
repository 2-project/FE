// HeaderMain.js
import React from 'react';
import Header from '../../../components/Header/Header';
import { Link } from 'react-router-dom';
import './HeaderMain.css';

function HeaderMain() {
  const scrollToSection = (sectionName) => {
    let targetClassName = '';
    switch (sectionName) {
      case 'popular':
        targetClassName = 'product-0';
        break;
      case 'weekly':
        targetClassName = 'product-1';
        break;
      case 'magazine':
        targetClassName = 'product-2';
        break;
      case 'outlet':
        targetClassName = 'product-3';
        break;
      default:
        targetClassName = '';
    }

    if (targetClassName) {
      const section = document.querySelector(`.${targetClassName}`);
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="product-list">
        <div
          id="popular"
          onClick={() => scrollToSection('popular')}
          className="sub-section"
        >
          인기상품
        </div>
        <div
          id="weekly"
          onClick={() => scrollToSection('weekly')}
          className="sub-section"
        >
          주간특가
        </div>
        <div
          id="magazine"
          onClick={() => scrollToSection('magazine')}
          className="sub-section"
        >
          매거진
        </div>
        <div
          id="outlet"
          onClick={() => scrollToSection('outlet')}
          className="sub-section"
        >
          아울렛
        </div>
      </div>
    </div>
  );
}

export default HeaderMain;
