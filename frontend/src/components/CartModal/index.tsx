import { useProducts } from '../../hooks/ProductContext';
import { CartItem } from '../CartItem';
import './styles.css';

export function CartModal() {
  function closeModal() {
    const modal = document.querySelector('.cart-modal')
    modal?.classList.remove('active');
  }

  const { cartItems } = useProducts();


  return (
    <div className="cart-modal">
      <h1>Carrinho</h1>
      <div className="cart-items-area">
        {cartItems?.map(item =>
          <CartItem
            key={item.id}
            {...item}
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
          <a href="/carrinho" className="general-btn">
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