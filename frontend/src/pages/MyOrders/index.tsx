import { OrderItem } from "../../components/OrderItem"
import './styles.css';

export function MyOrders() {
  const orders = [
    {
      orderNumber: "123456787",
      status: "Entregue",
      payment: "Cartão de Crédito",
      date: "16/12/1993",
      details: {
        address: {
          street: "Rua Paulino Hermínio Brisola, 39",
          neighborhood: "Jardim São Carlos",
          cep: "18230000",
          city: "São Miguel Arcanjo",
          state: "SP"
        },
        items: [
          {
            id: "123",
            name: "Body Em Microfibra E Renda White Party",
            image: "prod-test1.jpg",
            price: 59.90,
            amount: 3,
          }
        ]
      }
    },
    {
      orderNumber: "123456788",
      status: "Entregue",
      payment: "Cartão de Crédito",
      date: "16/12/1993",
      details: {
        address: {
          street: "Rua Paulino Hermínio Brisola, 39",
          neighborhood: "Jardim São Carlos",
          cep: "18230000",
          city: "São Miguel Arcanjo",
          state: "SP"
        },
        items: [
          {
            id: "456",
            name: "Body Em Microfibra E Renda White Party",
            image: "prod-test1.jpg",
            price: 59.90,
            amount: 3,
          }
        ]
      }
    },
    {
      orderNumber: "123456789",
      status: "Entregue",
      payment: "Cartão de Crédito",
      date: "16/12/1993",
      details: {
        address: {
          street: "Rua Paulino Hermínio Brisola, 39",
          neighborhood: "Jardim São Carlos",
          cep: "18230000",
          city: "São Miguel Arcanjo",
          state: "SP"
        },
        items: [
          {
            id: "789",
            name: "Body Em Microfibra E Renda White Party",
            image: "prod-test1.jpg",
            price: 59.90,
            amount: 3,
          }
        ]
      }
    }
  ]

  return (
    <main className="container my-orders">
      <h1>Meus Pedidos</h1>
      <div className="my-orders-area">
        {
          orders?.map((item) => {
            return (
              <OrderItem
                key={item.orderNumber}
                orderNumber={item.orderNumber}
                status={item.status}
                payment={item.payment}
                date={item.date}
                details={item.details}
              />
            )
          })
        }
      </div>
    </main>
  )
}