import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { formatPrice } from '../../utils/formatPrice';
import { AmountInput } from '../AmountInput';

import './styles.css';

export type CartItemProps = {
  id: string;
  image: string;
  price: number;
  amount: number;
  name: string;
  showDelete?: boolean;
}

export function CartItem({ id, image, price, amount, name, showDelete }: CartItemProps) {
  const [totalPrice, setTotalPrice] = useState(price * amount);
  return (
    <div className="cart-item">
      <div className="cart-left">
        <div className="cart-info">
          <img src={`assets/${image}`} alt="" />
          <span>{`R$ ${formatPrice(price)}`}</span>
        </div>
        <div><span className={"item-name"}>{name}</span></div>
      </div>
      <div className="cart-right">
        <AmountInput amountProp={1} />
        <div className="cart-price">
          <span>Valor total</span>
          <span className="total-price">
            {`R$ ${formatPrice(totalPrice)}`}
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