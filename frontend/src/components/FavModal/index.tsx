import CartImg from '../../assets/img/prod-test1.jpg';
import { FavItem } from '../FavItem';
import './styles.css';

export function FavModal() {
  function closeModal() {
    const modal = document.querySelector('.fav-modal')
    modal?.classList.remove('active');
  }
  const cartItems = [
    {
      image: CartImg,
      price: 99.90,
      name: 'Body Em Microfibra E Renda White Party',
    },
    {
      image: CartImg,
      price: 99.90,
      name: 'Body Em Microfibra E Renda White Party',
    },
    {
      image: CartImg,
      price: 99.90,
      name: 'Body Em Microfibra E Renda White Party',
    }
  ]
  return (
    <div className="fav-modal">
      <h1>Favoritos</h1>
      <div className="cart-items-area">
        {cartItems.map(item =>
          <FavItem
            image={item.image}
            price={item.price}
            name={item.name}
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