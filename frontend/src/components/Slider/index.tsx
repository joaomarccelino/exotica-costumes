import Prod1 from '../../assets/img/prod-test1.jpg';
import Prod2 from '../../assets/img/prod-test2.jpg';
import Prod3 from '../../assets/img/prod-test3.jpg';

import { GrNext, GrPrevious } from 'react-icons/gr';

import './styles.css';

export function Slider() {
  const images = document.querySelectorAll('.slide-img');

  let activeSlide = 0;

  function nextSlide() {
    images[activeSlide].classList.remove('active-img');
    if (activeSlide < 2) {
      activeSlide += 1;
    } else {
      activeSlide = 0;
    }
    images[activeSlide].classList.add('active-img');
  }

  function prevSlide() {
    images[activeSlide].classList.remove('active-img');
    if (activeSlide == 0) {
      activeSlide = 2;
    } else {
      activeSlide -= 1;
    }
    images[activeSlide].classList.add('active-img');
  }
  return (
    <div className="slider">
      <button 
      className="previous empty-btn"
      onClick={prevSlide}
      >
        <GrPrevious size={40} color={"var(--p4)"} />
      </button>
      <ul className="slide">
        <img src={Prod1} alt="" className="slide-img active-img" />
        <img src={Prod2} alt="" className="slide-img" />
        <img src={Prod3} alt="" className="slide-img" />
      </ul>
      <button
      className="next empty-btn"
        onClick={nextSlide}
      >
        <GrNext size={40} color={"var(--p4)"} />
      </button>
    </div>
  )
}