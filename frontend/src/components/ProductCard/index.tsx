import { useState } from "react";

import { AiOutlineHeart } from 'react-icons/ai';

import './styles.css';
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";
import { ProductProps, useProducts } from "../../hooks/ProductContext";
import { AdmCardButtons } from "../AdmCardButtons";
import { useAuth } from "../../hooks/AuthContext";
import { confirmAlert } from "react-confirm-alert";

export function ProductCard({ id, name, category, subcategory, images, price, stock, description, comments, flagged }: ProductProps) {
  const { user } = useAuth();
  const { handleSetSelectedItem, handleAddFavItem } = useProducts();
  const adm = (user.status === 'ADM');
  const product = ({
    id,
    name,
    images,
    price,
    stock,
    description,
    comments
  })
  const [itemFlag, setItemFlag] = useState(flagged);
  const portion = (price / 3);
  const url = name.toLowerCase().replaceAll(' ', '-');
  const imgBaseURL = 'http://52.72.116.213:3000';

  const newFav = { id: product.id, name: product.name, images: product.images, price: product.price }

  function handleFlagItem() {
    setItemFlag(true);
    handleAddFavItem(newFav);
  }

  function handleEditItem() {
    const selProduct = {
      id,
      name,
      category,
      subcategory,
      images,
      price,
      stock,
      description,
      comments,
      flagged
    }
    handleSetSelectedItem(selProduct);
  }

  function handleDeleteItem() {
    // confirmAlert({
    //   title: 'Apagar Item',
    //   message: 'Você deseja: ',
    //   buttons: [
    //     {
    //       label: 'Inativar item',
    //       onClick: handleEditItem
    //     },
    //     {
    //       label: 'Apagar item',
    //       onClick: () => alert('Click No')
    //     }
    //   ]
    // });
  };

  return (
    <div className="product-card">
      <Link to={`/${url}`} state={{ product }}>
        <img src={`${imgBaseURL}/${images[2]}`} alt={name} />
      </Link>
      <span className="card-prod-price">{formatPrice(price)}</span>
      <p>em <span className="color-text">{`até 3x de ${formatPrice(portion)} sem juros`}</span></p>
      <Link to={`/${url}`} state={{ product }}>{name}</Link>
      <button className="fav-btn" onClick={() => handleFlagItem()}>
        <div className={flagged ? "filled-heart" : "unfilled-heart"}>
          <AiOutlineHeart size={25} color={flagged ? "#FFF" : "var(--p2)"} />
        </div>
      </button>
      {adm &&
        <AdmCardButtons
          onDelete={handleDeleteItem}
          onEdit={handleEditItem}
        />
      }
    </div>
  )
}