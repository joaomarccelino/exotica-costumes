import Like from '../../assets/img/like.svg';
import Dislike from '../../assets/img/dislike.svg';
import FillLike from '../../assets/img/filled-like.svg';
import FillDislike from '../../assets/img/filled-dislike.svg';
import Sign from '../../assets/img/sign-icon.svg';

import './styles.css';

export type EvaluationProps = {
  by: string;
  on: string;
  text: string;
  like: boolean;
  dislike: boolean;
}

export function Evaluation({ by, on, text, like, dislike }: EvaluationProps) {
  return (
    <div className="evaluation-container">
      <div className="ev-profile">
        <img src={Sign} alt="" />
        <p>Por: <span>{by}</span></p>
        <p>Em: <span>{on}</span></p>
      </div>
      <div className="ev-text">
        <blockquote>
          {text}
        </blockquote>
      </div>
      <div className="ev-actions">
        <a href="">
          <img src={like ? FillLike : Like} alt="" />
        </a>
        <a href="">
          <img src={dislike ? FillDislike : Dislike} alt="" />
        </a>
      </div>
    </div>
  )
}