import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../../styles/components/ResultsScreen.module.scss';
import cn from 'classnames';

const TopScore: React.FC<ownProps> = React.memo(({ title, points, imgUrl, text }) => {
  return (
    <div className={cn(styles.content__inner)}>
      <h2 className={cn(styles.content__title)}>{title}</h2>
      <p className={cn(styles.content__score)}>{points}</p>
      <div className={cn(styles.content__body)}>
        <div className={cn(styles.body__img)}>
          <img src={imgUrl} />
        </div>
        <div className={cn(styles.body__text)}>
          <p>{text}</p>
        </div>
        <NavLink to="/">
          <button className={cn(styles.content__btn)}>Retry</button>
        </NavLink>
      </div>
    </div>
  );
});

type ownProps = {
  imgUrl: any;
  points: string;
  title: string;
  text: string;
};

export default TopScore;
