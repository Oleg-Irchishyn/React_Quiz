import React from 'react';
import Slider from 'react-slick';
import styles from './../../../styles/components/Sliders.module.scss';
import cn from 'classnames';
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
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const handleSlickDotsClassname = React.useCallback(() => {
    let sliderDots: NodeListOf<Element> = document.querySelectorAll(
      '.slick-dots > li.slick-active',
    );
    for (let i = 0; i < sliderDots.length; i++) {
      let prevItem = sliderDots[i].previousElementSibling;
      prevItem && prevItem.classList.add('visited');
    }
  }, []);

  const handleAfterChange = React.useCallback((index) => {
    setCurrentSlide(index);
  }, []);

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
    beforeChange: (currentSlide: any, nextSlide: any) => {},
    afterChange: (index: any) => {
      handleAfterChange(index);
      handleSlickDotsClassname();
    },
  };
  return (
    <div>
      <Slider {...settings} className={cn(styles.quizSlider)}>
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

      <div>
        {' '}
        {currentSlide + 1} / {10}{' '}
      </div>
    </div>
  );
};

type ownProps = {
  handleSetVisibleSliderSection: (value: boolean) => void;
};

export default QuizSlider;
