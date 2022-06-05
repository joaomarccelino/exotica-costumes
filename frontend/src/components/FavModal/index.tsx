import { useProducts } from '../../hooks/ProductContext';
import { FavItem } from '../FavItem';
import './styles.css';

export function FavModal() {
  function closeModal() {
    const modal = document.querySelector('.fav-modal')
    modal?.classList.remove('active');
  }

  const { favItems } = useProducts();

  return (
    <div className="fav-modal">
      <h1>Favoritos</h1>
      <div className="fav-items-area">
        {favItems.map(item =>
          <FavItem
            key={item.id}
            {...item}
          />
        )}
      </div>
      <button
        className="cart-close-button"
        onClick={() => closeModal()}
      >
        X
      </button>
    </div>
  )
}