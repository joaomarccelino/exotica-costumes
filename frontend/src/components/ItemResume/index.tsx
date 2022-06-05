import { formatPrice } from "../../utils/formatPrice";

import './styles.css';

type Props = {
  totalValue: number;
  shipping: number;
}

export function ItemResume({
  totalValue,
  shipping
}: Props) {
  return (
    <div className="item-resume">
      <h2>Resumo do pedido</h2>
      <div className="subtotal">
        <span>Subtotal: </span>
        <span className="subtotal-price">{`R$ ${formatPrice(totalValue)}`}</span>
      </div>
      <div className="shipping">
        <span>Frete: </span>
        <span className="shipping-price">{`R$ ${formatPrice(shipping)}`}</span>
      </div>
      <div className="total-value">
        <span>Total: </span>
        <span>{`R$ ${formatPrice(shipping + totalValue)}`}</span>
      </div>
    </div>
  )
}
