import {FaRegUser} from 'react-icons/fa';
import './styles.css';

export type EvaluationProps = {
  iduser: string
  name: string;
  date: string;
  text: string;
}

export function Evaluation({ iduser, name, date, text}: EvaluationProps) {
  return (
    <div className="evaluation-container">
      <div className="ev-profile">
        <div className="ev-icon">
          <FaRegUser size={40} color={"var(--p2)"} />
        </div>
        <p>Por: <span>{name}</span></p>
        <p>Em: <span>{date}</span></p>
      </div>
      <div className="ev-text">
        <blockquote>
          {text}
        </blockquote>
      </div>   
    </div>
  )
}