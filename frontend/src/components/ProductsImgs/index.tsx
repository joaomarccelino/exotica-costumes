import Prod1 from '../../assets/img/prod-test1.jpg';
import Prod2 from '../../assets/img/prod-test2.jpg';
import Prod3 from '../../assets/img/prod-test3.jpg';

import './styles.css';

export function ProductImgs() {

  const thumbs = document.querySelectorAll('.thumbImg')

  function selectImage(e: any) {
    const showImg = document.querySelector('.mainProductImg') as HTMLImageElement;
    showImg.src = e.target.src;
    thumbs.forEach(item => {
      if (item === e.target) {
        item.classList.add('selected-img');
      } else {
        item.classList.remove('selected-img');
      }
    });
  }
  thumbs.forEach(item => {
    item.addEventListener('click', selectImage)
  })


  return (
    <div className="product-images">
      <img src={Prod1} alt="Image 1" className="mainProductImg" />
      <div className="product-thumbs">
        <img src={Prod1} alt="" className="thumbImg selected-img" />
        <img src={Prod2} alt="" className="thumbImg" />
        <img src={Prod3} alt="" className="thumbImg" />
      </div>
    </div>
  )
}