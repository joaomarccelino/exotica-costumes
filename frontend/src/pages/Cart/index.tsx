import { useEffect, useState } from 'react';

import { BsCreditCard } from 'react-icons/bs';
import { CgRadioCheck, CgRadioChecked } from 'react-icons/cg';
import { RiBillLine } from 'react-icons/ri';

import { months, years, paymentOptions, shipping } from '../../utils/commonData';
import { CartItem } from '../../components/CartItem';
import './styles.css';
import { useProducts } from '../../hooks/ProductContext';
import { ItemResume } from '../../components/ItemResume';
import { SubmitHandler, useForm } from 'react-hook-form';
import api from '../../services/api';
import { Address, useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';

type OrderInputs = {
  customerName: string;
  address: Address;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  payment: string;
  paymentData?: {
    cardNumber: string;
    securityCode: string;
    cardName: string;
    expirationMonth: string;
    expirationYear: string;
    portion: number;
  }
}

export function Cart() {
  const navigate = useNavigate()
  const { token, user } = useAuth();
  const [totalValue, setTotalValue] = useState(0);
  const [newAddress, setNewAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const { cartItems } = useProducts();

  function handleShowNewAddressForm() {
    setNewAddress(!newAddress);
  }

  const orderItems = cartItems.map(item => {
    return {
      idproduct: item.id,
      quantity: item.quantity,
      size: item.size
    }
  })

  const { register, handleSubmit, watch, formState: { errors } } = useForm<OrderInputs>();
  const onSubmit: SubmitHandler<OrderInputs> = async data => {
    const newOrder = {
      iduser: user.iduser,
      status: "WPAYMENT",
      date: formatDate(new Date()),
      shipping_price: shipping,
      total_price: totalValue,
      user_address_id: user.address[0].idaddress,
      pay: {...data.paymentData, type: paymentMethod},
      products: orderItems
    }
    const response = await api.post('https://api.gvnrsbs.com.br/order/', JSON.stringify(newOrder), {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => {
        console.log(res);
        alert("Pedido enviado!");
        localStorage.removeItem('cartItem');
        navigate('/');
      });
  }

  function handleSelectPayment(method: string) {
    if (method === 'credit') setPaymentMethod('credit');
    if (method === 'pix') setPaymentMethod('pix');
    if (method === 'ticket') setPaymentMethod('ticket');
  }
  function handleCalcTotal() {
    let sum = 0;
    cartItems.forEach(item => {
      sum += (item.price * item.quantity)
    })
    setTotalValue(sum);
  }

  useEffect(() => {
    handleCalcTotal();
  }, [cartItems]);

  return (
    <div className="cart container">
      <h1>Finalizar Compra</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => {
            return (
              <CartItem
              key={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              quantity={item.quantity}
              size={item.size}
              id={item.id}
              showDelete
              />
            )
          })}
        </div>
        <ItemResume totalValue={totalValue} shipping={shipping} />
      </div>
      <div className="payment">
        <h2>Pagamento</h2>
        <div className="payment-forms">
          {
            newAddress ?
              <div className="delivery-form">
                <h3>Entrega</h3>
                <label htmlFor="">Nome</label>
                <input type="text" {...register("customerName", { required: true })} />
                <label htmlFor="">Endereço</label>
                <input type="text" {...register("address", { required: true })} />
                <label htmlFor="">Bairro</label>
                <input type="text"  {...register("neighborhood", { required: true })} />
                <label htmlFor="">Cidade</label>
                <input type="text"  {...register("city", { required: true })} />
                <label htmlFor="">Estado</label>
                <input type="text"  {...register("state", { required: true })} />
                <label htmlFor="">CEP</label>
                <input type="text"  {...register("cep", { required: true })} />
                <div className="address-btn">
                  <button className="general-btn" onClick={handleShowNewAddressForm}>Utilizar endereço já cadastrado</button>
                </div>
              </div> :
              <div className="delivery-form">
                <h3>Entrega</h3>
                {(user.iduser !== undefined) &&<select name="address" id="">
                  <option value="" selected disabled hidden>Selecione um endereço</option>
                  {
                    user &&
                    user.address.map(address => {
                      return (
                        <option value={address.idaddress}>{address.name}</option>
                      )
                    })
                  }
                </select>}
                <div className="address-btn">
                  <button className="general-btn" onClick={handleShowNewAddressForm}>Cadastrar novo endereço</button>
                </div>
              </div>
          }
          <div className="payment-form">
            <h3>Forma de pagamento</h3>
            <div className="payment-input">
              <button
                className="empty-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectPayment('credit')
                }
                }
              >
                {paymentMethod === 'credit' ?
                  <CgRadioChecked size={30} color={'var(--p4)'} /> :
                  <CgRadioCheck size={30} color={'var(--p4)'} />
                }
              </button>
              <span><BsCreditCard size={25} color={"var(--p4)"} /> Cartão de Crédito</span>
            </div>
            {paymentMethod === 'credit' &&
              <div className="credit-form">
                <div className="card-number">
                  <label htmlFor="cardNumber">Número do cartão</label>
                  <input type="text" id="cardNumber"  {...register("paymentData.cardNumber")} />
                </div>
                <div className="sec-code">
                  <label htmlFor="securityCode">Cód segurança</label>
                  <input type="text" id="securityCode"  {...register("paymentData.securityCode")} />
                </div>
                <div className="card-name">
                  <label htmlFor="cardName">Nome no cartão</label>
                  <input type="text" id="cardName" {...register("paymentData.cardName")} />
                </div>
                <div className="exp-date">
                  <label htmlFor="">Validade</label>
                  <div className="expiration-date">
                    <select id="month"  {...register("paymentData.expirationMonth")}>
                      <option value="" selected disabled hidden>Mês</option>
                      {months.map(item => {
                        return (
                          <option value={item}>{item}</option>
                        )
                      })}
                    </select>
                    <select id="year" {...register("paymentData.expirationYear")}>
                      <option value="" selected disabled hidden>Ano</option>
                      {years.map(item => {
                        return (
                          <option value={item}>{item}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="portion-input">
                  <label htmlFor="">Número de parcelas</label>
                  <select id="portion" {...register("paymentData.portion")}>
                    {paymentOptions.map(item => {
                      return (
                        <option value={item.portion}>{`${item.name} - ${formatPrice(totalValue / item.portion)}`}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            }
            <div className="payment-input">
              <button
                className="empty-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectPayment('pix')
                }
                }
              >
                {paymentMethod === 'pix' ?
                  <CgRadioChecked size={30} color={'var(--p4)'} /> :
                  <CgRadioCheck size={30} color={'var(--p4)'} />
                }
              </button>
              <span><RiBillLine size={25} color={"var(--p4)"} /> Pix</span>
            </div>
            <div className="pix-form">
              <h4>pix</h4>
            </div>
            <div className="payment-input">
              <button
                className="empty-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectPayment('ticket')
                }
                }
              >
                {paymentMethod === 'ticket' ?
                  <CgRadioChecked size={30} color={'var(--p4)'} /> :
                  <CgRadioCheck size={30} color={'var(--p4)'} />
                }
              </button>
              <span><RiBillLine size={25} color={"var(--p4)"} /> Boleto</span>
            </div>
            <div className="ticket-form">
              <h4>Boleto</h4>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="payment-btn">
          <button className="general-btn">
            Finalizar Pedido
          </button>
        </form>
      </div>
    </div>
  )
}