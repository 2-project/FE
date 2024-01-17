import React, { useState, useEffect } from 'react';
import mainImg0 from './mainImg0.jpg';
import mainImg1 from './mainImg1.jpg';
import mainImg2 from './mainImg2.jpg';
import mainImg3 from './mainImg3.jpg';
import mainImg4 from './mainImg4.jpg';
import mainImg5 from './mainImg5.jpg';
import mainImg6 from './mainImg6.jpg';
import mainImg7 from './mainImg7.jpg';
import mainImg8 from './mainImg8.jpg';
import './ImageSlider.css';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    {
      src: mainImg0,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=89568&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404811',
    },
    {
      src: mainImg1,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=89588&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404818',
    },
    {
      src: mainImg2,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=89242&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404812',
    },
    {
      src: mainImg3,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=89109&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404817',
    },
    {
      src: mainImg4,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=90609&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404815',
    },
    {
      src: mainImg5,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=89548&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404814',
    },
    {
      src: mainImg6,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=90608&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404817',
    },
    {
      src: mainImg7,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=63782&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404818',
    },
    {
      src: mainImg8,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=88209&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=24048110',
    },
    {
      src: mainImg0,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=89568&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404811',
    },
    {
      src: mainImg1,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=89588&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404818',
    },
    {
      src: mainImg2,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=89242&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404812',
    },
    {
      src: mainImg3,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=89109&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404817',
    },
    {
      src: mainImg4,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=90609&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404815',
    },
    {
      src: mainImg5,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=89548&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404814',
    },
    {
      src: mainImg6,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=90608&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404817',
    },
    {
      src: mainImg7,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=63782&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=2404818',
    },
    {
      src: mainImg8,
      url: 'https://www.mujikorea.net/displayPlan/listPlanDetail.lecs?spdpNo=88209&displayNo=MJ1A01&influx_channel_no=240481&influx_channel_detail_no=24048110',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, images.length]);

  const moveSlide = (direction) => {
    const newSlideIndex =
      (currentSlide + direction + images.length) % images.length;
    setCurrentSlide(newSlideIndex);
  };

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        {' '}
        {/* 새로운 최상위 요소 */}
        <div
          className="slides"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div className="slide" key={index}>
              <a href={image.url} target="_blank" rel="noopener noreferrer">
                <img src={image.src} alt={`Sliding Image ${index}`} />
              </a>
            </div>
          ))}
        </div>
      </div>
      <button className="btn-slide prev" onClick={() => moveSlide(-1)}>
        {'<'}
      </button>
      <button className="btn-slide next" onClick={() => moveSlide(1)}>
        {'>'}
      </button>
    </div>
  );
};

export default ImageSlider;
