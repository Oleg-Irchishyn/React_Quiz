import React from 'react';
import Slider from 'react-slick';
import styles from './../../../styles/components/Sliders.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const QuizNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'red' }}
      onClick={onClick}
    />
  );
};
const QuizPrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  );
};

const QuizSlider: React.FC<ownProps> = ({ handleSetVisibleSliderSection }) => {
  var settings = {
    dots: true,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <QuizPrevArrow />,
    prevArrow: <QuizNextArrow />,
  };
  return (
    <Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
};

type ownProps = {
  handleSetVisibleSliderSection: (value: boolean) => void;
};

export default QuizSlider;
