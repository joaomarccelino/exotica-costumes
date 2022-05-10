import { useState } from "react";
import Filled from '../../assets/img/filled-heart.svg';
import Unfilled from '../../assets/img/unfilled-heart.svg';

import './styles.css';
export type CardProps = {
  image: string;
  name: string;
  value: number;
}

export function ProductCard({ image, name, value }: CardProps) {
  const [flagged, setFlagged] = useState(false);
  const portion = (value / 3).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function handleFlagItem() {
    setFlagged(!flagged);
  }
  return (
    <div className="product">
      <a href="">
        <img src={image} alt={name} />
      </a>
      <span className="prod-price">{`R$ ${value.toString().replace('.', ',')}`}</span>
      <p>em <span className="color-text">{`até 3x de R$ ${portion.replace('.', ',')} sem juros`}</span></p>
      <a href="/">{name}</a>
      <button className="fav-btn" onClick={() => handleFlagItem()}>
        <img src={flagged ? Filled : Unfilled} alt="" />
      </button>
    </div>
  )
}