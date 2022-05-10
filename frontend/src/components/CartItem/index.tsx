import { useState } from 'react';
import CloseIcon from '../../assets/img/close-icon.svg';
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
  const cartPrice = price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ',');
  return (
    <div className="cart-item">
      <div className="cart-info">
        <img src={image} alt="" />
        <span>{`R$ ${cartPrice}`}</span>
      </div>
      <div><span className={"item-name"}>{name}</span></div>
      <AmountInput amountProp={3} />
      <div className="cart-price">
        <span>Valor total</span>
        <span className="total-price">
          {`R$ ${(totalPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ',')}`}
        </span>
      </div>
      <img src={CloseIcon} alt="Excluir" />
    </div>
  )
}