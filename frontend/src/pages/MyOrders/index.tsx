import { useEffect, useState } from "react";
import { OrderItem, OrderProductProps } from "../../components/OrderItem"
import { Address, useAuth } from "../../hooks/AuthContext";
import api from "../../services/api";
import './styles.css';

type Pay = {
  type: string;
  cardNumber?: string;
  cardName?: string;
  expirationMonth?: string;
  expirationYear?: string;
  portion?: number;
  pix_key?: string;
  boleto_number?: string;
}

type Order = {
  idorder: string;
  status: string;
  date: string;
  shipping_price: number;
  total_price: number;
  user_address_id?: string;
  shipping_address?: Address;
  payment: Pay;
  products: OrderProductProps[];
}

export function MyOrders() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>();
  async function getOrders() {
    console.log(token);
    const response = await api.get(`/order/${user.iduser}`, {
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      }
    });
    const data = response.data.orders;
    console.log(response.data.orders);
    setOrders(data);
  }

  useEffect(() => {
    if(user.iduser !== undefined) getOrders();
  }, [user.iduser])

  return (
    <main className="container my-orders">
      <h1>Meus Pedidos</h1>
      <div className="my-orders-area">
        {
          orders?.map((item) => {
            return (
              <OrderItem
                key={item.idorder}
                orderNumber={item.idorder}
                status={item.status}
                payment={item.payment.type}
                date={item.date}
                products={item.products}
                total_price={item.total_price}
                shipping_address={item.shipping_address || {} as Address}
              />
            )
          })
        }
      </div>
    </main>
  )
}