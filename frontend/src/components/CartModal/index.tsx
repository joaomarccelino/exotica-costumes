import { useEffect, useState } from 'react';
import { useProducts } from '../../hooks/ProductContext';
import { formatPrice } from '../../utils/formatPrice';
import { CartItem } from '../CartItem';
import './styles.css';

export function CartModal() {
  const [totalValue, setTotalValue] = useState(0);
  function closeModal() {
    const modal = document.querySelector('.cart-modal')
    modal?.classList.remove('active');
  }

  const { cartItems } = useProducts();

  const shipping = 39.9;

  function handleCalcTotal() {
    let sum = 0;
    cartItems.forEach(item => {
      sum+= (item.price * item.quantity)
    })
    setTotalValue(sum);
  }

  useEffect(() => {
    handleCalcTotal();
  }, [cartItems]);

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
            <span className="resume-price">{formatPrice(totalValue)}</span>
          </div>
          <div className="shipping">
            <span>Frete</span>
            <span className="resume-price">{formatPrice(shipping)}</span>
          </div>
          <div className="shipping">
            <span>Total</span>
            <span className="resume-price">{formatPrice(totalValue+shipping)}</span>
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