import Prod1 from '../../assets/img/prod-test1.jpg';
import Prod2 from '../../assets/img/prod-test2.jpg';
import Prod3 from '../../assets/img/prod-test3.jpg';

import './styles.css';

export function Slider() {
  return (
    <div>
      <ul className="slide">
        <li><img src={Prod1} alt="" /></li>
        <li><img src={Prod2} alt="" /></li>
        <li><img src={Prod3} alt="" /></li>
      </ul>
    </div>
  )
}