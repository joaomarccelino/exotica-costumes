import Sign from '../../assets/img/sign-icon.svg';
import { BiLike, BiDislike } from 'react-icons/bi';
import {FaRegUser} from 'react-icons/fa';
import './styles.css';

export type EvaluationProps = {
  by: string;
  on: string;
  text: string;
  like: boolean;
  dislike: boolean;
}

export function Evaluation({ by, on, text, like, dislike }: EvaluationProps) {

  function handleSetLike() {

  }

  function handleSetDislike() {
    
  }

  return (
    <div className="evaluation-container">
      <div className="ev-profile">
        <div className="ev-icon">
          <FaRegUser size={40} color={"var(--p2)"} />
        </div>
        <p>Por: <span>{by}</span></p>
        <p>Em: <span>{on}</span></p>
      </div>
      <div className="ev-text">
        <blockquote>
          {text}
        </blockquote>
      </div>
      <div className="ev-actions">
        <button className="empty-btn">
          <BiLike color={like ? 'var(--p2)' : 'var(--g8)'} size={40} />
        </button>
        <button className="empty-btn">
          <BiDislike color={dislike ? 'var(--p2)' : 'var(--g8)'} size={40} />
        </button>
      </div>
    </div>
  )
}