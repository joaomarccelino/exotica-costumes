import { AiOutlineHeart } from 'react-icons/ai';
import { formatPrice } from '../../utils/formatPrice';

import './styles.css';
export type FavItemProps = {
  id: string;
  images: string[];
  price: number;
  name: string;
}

export function FavItem({ images, price, name, id }: FavItemProps) {
  return (
    <div className="fav-item">
      <div className="fav-content">
        <div className="fav-info">
          <img src={images[0]} alt="" />
          <span>{formatPrice(price)}</span>
        </div>
        <div><span className={"item-name"}>{name}</span></div>
      </div>
      <button className="fav-modal-btn">
        <div className="header-icon">
          <AiOutlineHeart size={25} color="#FFF" />
        </div>
      </button>
    </div>
  )
}