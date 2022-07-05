import { AiOutlineHeart } from 'react-icons/ai';
import { useProducts } from '../../hooks/ProductContext';
import { formatPrice } from '../../utils/formatPrice';

import './styles.css';
export type FavItemProps = {
  id: string;
  images: string[];
  price: number;
  name: string;
}

export function FavItem({ images, price, name, id }: FavItemProps) {
  const {favItems, handleUpdateFav} = useProducts();
  function removeFavItem() {
    favItems.forEach(item => {
      if (item.id === id) {
        const newItems = [...favItems];
        const index = newItems.findIndex(item => item.id === id);
        newItems.splice(index, 1);
        handleUpdateFav(newItems);
      }
    })
  }
  return (
    <div className="fav-item">
      <div className="fav-content">
        <div className="fav-info">
          <img src={`http://52.72.116.213:3000/${images[0]}`} alt="" />
          <span>{formatPrice(price)}</span>
        </div>
        <div><span className={"item-name"}>{name}</span></div>
      </div>
      <button className="fav-modal-btn" onClick={() => removeFavItem()}>
        <div className="header-icon">
          <AiOutlineHeart size={25} color="#FFF" />
        </div>
      </button>
    </div>
  )
}