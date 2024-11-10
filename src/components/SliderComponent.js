import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image1 from '../images/Ravers are honest people.jpg';
import Image2 from '../images/massive concert (1).jpg'
import Image3 from '../images/massive concert.jpg'
import '../css/Slider.css'

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [Image1, Image2, Image3];

  const renderSlides = () => {
    return images.map((url, index) => (
      <div key={index}>
        <img src={url} alt={`Slide ${index + 1}`} />
      </div>
    ));
  };

  return (
    <Slider {...settings}>
      {renderSlides()}
    </Slider>
  );
};

export default SliderComponent;
