import { useState } from "react";

import { AiOutlineHeart } from 'react-icons/ai';

import './styles.css';
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";
import { ProductProps } from "../../hooks/ProductContext";
import { AdmCardButtons } from "../AdmCardButtons";

export function ProductCard({ id, name, category, subcategory, images, price, stock, description, evaluations, flagged }: ProductProps) {
  const adm = false;
  const product = ({
    id,
    name,
    images,
    price,
    stock,
    description,
    evaluations
  })
  const [itemFlag, setItemFlag] = useState(flagged);
  const portion = (price / 3);
  const url = name.toLowerCase().replaceAll(' ', '-');

  function handleFlagItem() {
    setItemFlag(!itemFlag);
  }
  return (
    <div className="product-card">
      <Link to={`/${url}`} state={{ product }}>
        <img src={images[0]} alt={name} />
      </Link>
      <span className="card-prod-price">{formatPrice(price)}</span>
      <p>em <span className="color-text">{`até 3x de ${formatPrice(portion)} sem juros`}</span></p>
      <Link to={`/${url}`} state={{ product }}>{name}</Link>
      <button className="fav-btn" onClick={() => handleFlagItem()}>
        <div className={flagged ? "filled-heart" : "unfilled-heart"}>
          <AiOutlineHeart size={25} color={flagged ? "#FFF" : "var(--p2)"} />
        </div>
      </button>
      { adm && 
        <AdmCardButtons />
      }
    </div>
  )
}