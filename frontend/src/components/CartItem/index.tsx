import { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useProducts } from '../../hooks/ProductContext';
import { baseURL } from '../../utils/commonData';
import { formatPrice } from '../../utils/formatPrice';

import './styles.css';

export type CartItemProps = {
  id: string | number;
  image: string;
  price: number;
  size: number | string;
  quantity: number;
  name: string;
  showDelete?: boolean;
  orderItem?: boolean;
}

export function CartItem({ id, image, price, quantity, size, name, showDelete, orderItem }: CartItemProps) {
  const [cartItemQuantity, setCartItemQuantity] = useState(quantity);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { cartItems, handleUpdateCart } = useProducts();
  function updateCartItemQt() {
    cartItems.forEach(item => {
      if (item.id === id) {
        const newItems = [...cartItems];
        const index = newItems.findIndex(item => item.id === id);
        const newItem = { ...item, quantity: cartItemQuantity }
        newItems.splice(index, 1, newItem);
        handleUpdateCart(newItems);
      }
    })
  }

  function removeCartItem() {
    cartItems.forEach(item => {
      if (item.id === id) {
        const newItems = [...cartItems];
        const index = newItems.findIndex(item => item.id === id);
        newItems.splice(index, 1);
        handleUpdateCart(newItems);
      }
    })
    alert("Item removido!");
  }

  function calcTotalPrice() {
    setTotalPrice(price * cartItemQuantity);
    updateCartItemQt();
  }
  useEffect(() => {
    calcTotalPrice()
  }, [cartItemQuantity])
  return (
    <div className="cart-item">
      <div className="cart-left">
        <div className="cart-info">
          <img src={`${baseURL}/${image}`} alt="" />
          <span>{formatPrice(price)}</span>
        </div>
        <div><span className={"item-name"}>{name}</span></div>
      </div>

      <div className="cart-right">
        {
          orderItem ?
            <div className="quantity-input">
              <span className="quantity-title">Quantidade</span>
              <div className="quantity-buttons">
                <span>{cartItemQuantity}</span>
              </div>
            </div> :
            <div className="quantity-input">
              <span className="quantity-title">Quantidade</span>
              <div className="quantity-buttons">
                <button onClick={() => { (cartItemQuantity > 0) && setCartItemQuantity(cartItemQuantity - 1) }}>-</button>
                <span>{cartItemQuantity}</span>
                <button onClick={() => { setCartItemQuantity(cartItemQuantity + 1) }}>+</button>
              </div>
            </div>
        }
        <div className="cart-price">
          <span>Valor total</span>
          <span className="total-price">
            {formatPrice(totalPrice)}
          </span>
        </div>
        {
          showDelete &&
          <button className="del-btn empty-btn" onClick={() => removeCartItem()}>
            <AiOutlineCloseCircle size={32} color={"red"} style={{ marginLeft: '20px' }} />
          </button>
        }
      </div>
    </div>
  )
}