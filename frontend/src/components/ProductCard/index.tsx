import { useState } from "react";
import Filled from '../../assets/img/filled-heart.svg';
import Unfilled from '../../assets/img/unfilled-heart.svg';

import { AiOutlineHeart } from 'react-icons/ai';

import './styles.css';
import { formatPrice } from "../../utils/formatPrice";
export type CardProps = {
  image: string;
  name: string;
  value: number;
}

export function ProductCard({ image, name, value }: CardProps) {
  const [flagged, setFlagged] = useState(false);
  const portion = (value / 3);

  function handleFlagItem() {
    setFlagged(!flagged);
  }
  return (
    <div className="product-card">
      <a href="/product">
        <img src={image} alt={name} />
      </a>
      <span className="card-prod-price">{`R$ ${formatPrice(value)}`}</span>
      <p>em <span className="color-text">{`até 3x de R$ ${formatPrice(portion)} sem juros`}</span></p>
      <a href="/product">{name}</a>
      <button className="fav-btn" onClick={() => handleFlagItem()}>
        <div className={flagged ? "filled-heart" : "unfilled-heart"}>
          <AiOutlineHeart size={25} color={flagged ? "#FFF" : "var(--p2)"} />
        </div>
      </button>
    </div>
  )
}