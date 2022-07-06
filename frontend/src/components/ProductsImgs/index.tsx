import { baseURL } from '../../utils/commonData';

import './styles.css';

type ProductImgsProps = {
  images: string[];
}

export function ProductImgs({images}: ProductImgsProps) {

  const thumbs = document.querySelectorAll('.thumbImg');

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
      <img src={`${baseURL}/${images[0]}`} alt="" className="mainProductImg" />
      <div className="product-thumbs">
        <img src={`${baseURL}/${images[0]}`} alt="" className="thumbImg selected-img" />
        <img src={`${baseURL}/${images[1]}`} alt="" className="thumbImg" />
        <img src={`${baseURL}/${images[2]}`} alt="" className="thumbImg" />
      </div>
    </div>
  )
}