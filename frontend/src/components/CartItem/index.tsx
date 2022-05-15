import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { formatPrice } from '../../utils/formatPrice';
import { AmountInput } from '../AmountInput';

import './styles.css';
export type CartItemProps = {
  image: string;
  price: number;
  amount: number;
  name: string;
}

export function CartItem({ image, price, amount, name }: CartItemProps) {
  const [totalPrice, setTotalPrice] = useState(price * amount);
  return (
    <div className="cart-item">
      <div className="cart-info">
        <img src={image} alt="" />
        <span>{`R$ ${formatPrice(price)}`}</span>
      </div>
      <div><span className={"item-name"}>{name}</span></div>
      <AmountInput amountProp={3} />
      <div className="cart-price">
        <span>Valor total</span>
        <span className="total-price">
          {`R$ ${formatPrice(totalPrice)}`}
        </span>
      </div>
      <AiOutlineCloseCircle size={32} color={"red"} style={{marginLeft: '20px'}} />
    </div>
  )
}