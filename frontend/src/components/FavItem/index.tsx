import { AiOutlineHeart } from 'react-icons/ai';
import { formatPrice } from '../../utils/formatPrice';

import './styles.css';
export type FavItemProps = {
  image: string;
  price: number;
  name: string;
}

export function FavItem({ image, price, name }: FavItemProps) {
  return (
    <div className="fav-item">
      <div className="fav-info">
        <img src={`assets/${image}`} alt="" />
        <span>{`R$ ${formatPrice(price)}`}</span>
      </div>
      <div><span className={"item-name"}>{name}</span></div>
      <button className="fav-modal-btn">
        <div className="header-icon">
          <AiOutlineHeart size={25} color="#FFF" />
        </div>
      </button>
    </div>
  )
}