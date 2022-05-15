import CartImg from '../../assets/img/prod-test1.jpg';
import { CartItem } from '../CartItem';
import './styles.css';

export function CartModal() {
  function closeModal() {
    const modal = document.querySelector('.cart-modal')
    modal?.classList.remove('active');
  }
  const cartItems = [
    {
      image: CartImg,
      price: 99.90,
      name: 'Body Em Microfibra E Renda White Party',
      amount: 3,
    },
    {
      image: CartImg,
      price: 99.90,
      name: 'Body Em Microfibra E Renda White Party',
      amount: 3,
    },
    {
      image: CartImg,
      price: 99.90,
      name: 'Body Em Microfibra E Renda White Party',
      amount: 3,
    }
  ]
  return (
    <div className="cart-modal">
      <h1>Carrinho</h1>
      <div className="cart-items-area">
        {cartItems.map(item =>
          <CartItem
            image={item.image}
            price={item.price}
            name={item.name}
            amount={item.amount}
          />
        )}
      </div>
      <div className="modal-resume">
        <h2>Resumo do pedido</h2>
        <div className="resume-values">
          <div className="subtotal">
            <span>Subtotal</span>
            <span className="resume-price">R$ 169,90</span>
          </div>
          <div className="shipping">
            <span>Frete</span>
            <span className="resume-price">R$ 169,90</span>
          </div>
          <div className="shipping">
            <span>Total</span>
            <span className="resume-price">R$ 169,90</span>
          </div>
          <a href="/cart"className="general-btn">
            Finalizar
          </a>
        </div>
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