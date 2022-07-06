import { CartItem, CartItemProps } from "../CartItem";
import { ItemResume } from "../ItemResume";

import { MdKeyboardArrowDown } from 'react-icons/md';

import './styles.css';
import { useState } from "react";
import { Address } from "../../hooks/AuthContext";
import { shipping } from "../../utils/commonData";

export type OrderProductProps = {
  category: string;
  description: string;
  idproduct: number | string;
  image: string;
  itemPrice: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  subcategory: string;  
}

export type OrderItemProps = {
  orderNumber: string;
  status: string;
  payment: string;
  date: string;
  shipping_address: Address;
  total_price: number;
  products: OrderProductProps[];
}

export function OrderItem(
  {
    orderNumber,
    status,
    payment,
    date,
    shipping_address,
    products,
    total_price
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
            <p>{shipping_address.address}</p>
            <p>{shipping_address.district}</p>
            <p>{`CEP: ${shipping_address.cep} - ${shipping_address.city}/${shipping_address.state}`}</p>
          </div>
          <h3>Produtos</h3>
          <div className="cart-content">
            <div className="cart-items">
              {products.map(product => {
                return (
                  <CartItem
                    key={product.idproduct}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    quantity={product.quantity}
                    size={product.size}
                    id={product.idproduct}
                    orderItem
                  />
                )
              })}
            </div>
            <ItemResume totalValue={total_price} shipping={shipping} />
          </div>
        </div>
      }
    </div>
  )
}