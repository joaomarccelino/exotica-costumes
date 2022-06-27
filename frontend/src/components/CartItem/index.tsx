import { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useProducts } from '../../hooks/ProductContext';
import { formatPrice } from '../../utils/formatPrice';

import './styles.css';

export type CartItemProps = {
  id: string;
  images: string[];
  price: number;
  quantity: number;
  name: string;
  showDelete?: boolean;
}

export function CartItem({ id, images, price, quantity, name, showDelete }: CartItemProps) {
  const [cartItemQuantity, setCartItemQuantity] = useState(quantity);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { cartItems, handleUpdateCart } = useProducts();
  function updateCartItemQt() {
    cartItems.forEach(item => {
      if(item.id === id) {
        const newItems = [...cartItems];
        const index = newItems.findIndex(item => item.id === id);
        newItems.splice(index, 1);
        const newItem = {...item, quantity: cartItemQuantity}
        newItems.push(newItem);
        handleUpdateCart(newItems);
      }
    })
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
          <img src={images[0]} alt="" />
          <span>{formatPrice(price)}</span>
        </div>
        <div><span className={"item-name"}>{name}</span></div>
      </div>
      <div className="cart-right">
        <div className="quantity-input">
          <span className="quantity-title">Quantidade</span>
          <div className="quantity-buttons">
            <button onClick={() => { (cartItemQuantity > 0) && setCartItemQuantity(cartItemQuantity - 1) }}>-</button>
            <span>{cartItemQuantity}</span>
            <button onClick={() => { setCartItemQuantity(cartItemQuantity + 1) }}>+</button>
          </div>
        </div>
        <div className="cart-price">
          <span>Valor total</span>
          <span className="total-price">
            {formatPrice(totalPrice)}
          </span>
        </div>
        {
          showDelete &&
          <AiOutlineCloseCircle size={32} color={"red"} style={{ marginLeft: '20px' }} />
        }
      </div>
    </div>
  )
}