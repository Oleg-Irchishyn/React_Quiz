import React from 'react';
import styles from '../../styles/components/StartScreen.module.scss';
import cn from 'classnames';

const StartScreen: React.FC<ownProps> = React.memo(({ handleSetVisibleSection }) => {
  return (
    <div className={cn(styles.startScreen)}>
      <div className={cn(styles.startScreen__content)}>
        <h1 className={cn(styles.content__title)}>How Good Do You Know Casino Streamers?</h1>
        <div className={cn(styles.content__text)}>
          Do you like to watch casino streamers and their massive winnings? Do you follow the
          channels of your favorite ones? Can you imagine yourself as one who goes live and spin the
          reels for the audience? Then you come to us! Take this quiz from GamblerKey! See if you
          have a chance to be one of the most popular casino streamers with over a million
          followers! We believe in you!
        </div>
        <button className={cn(styles.content__btn)} onClick={() => handleSetVisibleSection(false)}>
          Start
        </button>
      </div>
    </div>
  );
});

type ownProps = {
  handleSetVisibleSection: (value: boolean) => void;
};

export default StartScreen;
