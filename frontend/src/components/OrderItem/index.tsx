import { CartItem, CartItemProps } from "../CartItem";
import { ItemResume } from "../ItemResume";

import {MdKeyboardArrowDown} from 'react-icons/md';

import './styles.css';
import { useState } from "react";

export type OrderItemProps = {
  orderNumber: string;
  status: string;
  payment: string;
  date: string;
  details: {
    address: {
      street: string;
      neighborhood: string;
      cep: string;
      city: string;
      state: string;
    },
    items: CartItemProps[];
  }
}

export function OrderItem(
  {
    orderNumber,
    status,
    payment,
    date,
    details
  }: OrderItemProps) {
    const [showDetails, setShowDetails] = useState(false);
    function handleShowDetails() {
      setShowDetails(!showDetails);
      const icon = document.querySelector(`.class-${orderNumber}`);
      icon?.classList.toggle('arrow-active');
    }

    return (
    <div className="order-item">
      <div className="order-data">
        <div className="order-number">
          <span>Número do Pedido</span>
          <p>{orderNumber}</p>
        </div>
        <div className="order-status">
          <span>Status</span>
          <p>{status}</p>
        </div>
        <div className="order-payment">
          <span>Pagamento</span>
          <p>{payment}</p>
        </div>
        <div className="order-date">
          <span>Data</span>
          <p className="order-date">{date}</p>
        </div>
        <button 
        className="empty-btn order-details-btn"
        onClick={handleShowDetails}
        >
          Detalhes do pedido
          <MdKeyboardArrowDown size={30} className={`class-${orderNumber}`} />
        </button>
      </div>

      {
        showDetails &&
        <div className="order-details">
        <div className="order-address">
          <h3>Endereço</h3>
          <p>{details.address.street}</p>
          <p>{details.address.neighborhood}</p>
          <p>{`CEP: ${details.address.cep} - ${details.address.city}/${details.address.state}`}</p>
        </div>
        <h3>Produtos</h3>
        <div className="cart-content">
          <div className="cart-items">
            {details.items.map(item => {
              return (
                <CartItem
                  key={item.id}
                  {...item}
                />
              )
            })}
          </div>
          <ItemResume totalValue={259.90} shipping={125} />
        </div>
      </div>
      }
    </div>
  )
}