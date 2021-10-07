import React, { DetailedHTMLProps } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styles from './../../../styles/components/Sliders.module.scss';
import cn from 'classnames';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AppStateType } from '../../../redux/store';
import { getQuizQuestions } from '../../../redux/selectors/appSelectors';
import { QuizSliderItem } from '..';
import { answerType } from '../../../redux/types/types';

const QuizPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className={cn(styles.quizSlider__prev_arrow)} onClick={onClick}>
      Back
    </div>
  );
};

const QuizNextArrow = (props: any) => {
  const { onClick, currentSlide, quizQuestions, handleSetVisibleSliderSection } = props;

  return Number(currentSlide) === quizQuestions.length - 1 ? (
    <div
      className={cn(styles.quizSlider__next_arrow)}
      onClick={() => handleSetVisibleSliderSection(false)}>
      Resluts
    </div>
  ) : (
    <div className={cn(styles.quizSlider__next_arrow)} onClick={onClick}>
      Forwards
    </div>
  );
};

const QuizSlider: React.FC<MapStatePropsType & ownProps> = React.memo(
  ({ handleSetVisibleSliderSection, quizQuestions }) => {
    const [currentSlide, setCurrentSlide] = React.useState(0);

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
      prevArrow: <QuizPrevArrow />,
      nextArrow: (
        <QuizNextArrow
          currentSlide={currentSlide}
          quizQuestions={quizQuestions}
          handleSetVisibleSliderSection={handleSetVisibleSliderSection}
        />
      ),
      beforeChange: function (currentSlide: any, nextSlide: any) {},
      afterChange: (index: number) => {
        handleAfterChange(index);
      },
      responsive: [
        {
          breakpoint: 767,
          settings: {
            dots: false,
          },
        },
      ],
    };
    return (
      <div className={cn(styles.quizSlider__wrapper)}>
        <p className={cn(styles.quizSlider__descr)}>Pump your brain</p>
        <h1 className={cn(styles.quizSlider__title)}>IQ - test for a gambler</h1>
        <Slider {...settings} className={cn(styles.quizSlider)}>
          {quizQuestions.map((item, index) => {
            const { id } = item;
            return <QuizSliderItem key={`${id}_${index}`} {...item} />;
          })}
        </Slider>
        <div className={cn(styles.quizSlider__slider_count)}>
          <i>{currentSlide + 1}</i> <b>/</b> <i>{quizQuestions.length}</i>
        </div>
      </div>
    );
  },
);

type ownProps = {
  handleSetVisibleSliderSection: (value: boolean) => void;
  question: string;
  answers: Array<answerType>;
  imgUrl: any;
};

const mapStateToProps = (state: AppStateType) => ({
  quizQuestions: getQuizQuestions(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

export default compose<React.ComponentType>(
  connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps, {}),
)(QuizSlider);
