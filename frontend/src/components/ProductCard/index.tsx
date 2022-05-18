import { useState } from "react";

import { AiOutlineHeart } from 'react-icons/ai';

import './styles.css';
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";
import { ProductProps } from "../../pages/Home";

export function ProductCard({ id, name, image, images, price, sizes, evaluations }: ProductProps) {
  const product = ({
    id,
    name,
    image,
    images,
    price,
    sizes,
    evaluations
  })
  const [flagged, setFlagged] = useState(false);
  const portion = (price / 3);
  const url = name.toLowerCase().replaceAll(' ', '-');

  function handleFlagItem() {
    setFlagged(!flagged);
  }
  return (
    <div className="product-card">
      <Link to={`/${url}`} state={{ product }}>
        <img src={`/assets/${image}`} alt={name} />
      </Link>
      <span className="card-prod-price">{`R$ ${formatPrice(price)}`}</span>
      <p>em <span className="color-text">{`até 3x de R$ ${formatPrice(portion)} sem juros`}</span></p>
      <Link to={`/${url}`} state={{ product }}>{name}</Link>
      <button className="fav-btn" onClick={() => handleFlagItem()}>
        <div className={flagged ? "filled-heart" : "unfilled-heart"}>
          <AiOutlineHeart size={25} color={flagged ? "#FFF" : "var(--p2)"} />
        </div>
      </button>
    </div>
  )
}