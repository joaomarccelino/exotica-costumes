import { useEffect, useState } from 'react';

import { BsCreditCard } from 'react-icons/bs';
import { CgRadioCheck, CgRadioChecked } from 'react-icons/cg';
import { RiBillLine } from 'react-icons/ri';

import { months, years, paymentOptions } from '../../utils/commonData';
import { CartItem } from '../../components/CartItem';
import './styles.css';
import { useProducts } from '../../hooks/ProductContext';
import { ItemResume } from '../../components/ItemResume';
import { useForm } from 'react-hook-form';

type OrderInputs = {
  customerName: string;
  address: string;
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
  const [totalValue, setTotalValue] = useState(0);
  const [shipping, setShipping] = useState(56.50);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const { register, handleSubmit, watch, formState: { errors } } = useForm<OrderInputs>();
  function calcTotalValue() {
    let total = 0
    cartItems.forEach(item => {
      total += item.price
    })
    setTotalValue(total);
  }

  function handleSelectPayment(method: string) {
    if (method === 'credit') setPaymentMethod('credit');
    if (method === 'pix') setPaymentMethod('pix');
    if (method === 'ticket') setPaymentMethod('ticket');
  }

  useEffect(() => {
    calcTotalValue()
  }, [])

  const { cartItems } = useProducts();

  return (
    <div className="cart container">
      <h1>Finalizar Compra</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => {
            return (
              <CartItem
                key={item.id}
                {...item}
              />
            )
          })}
        </div>
       <ItemResume totalValue={totalValue} shipping={shipping}  />
      </div>
      <div className="payment">
        <h2>Pagamento</h2>
        <div className="payment-forms">
          <form action="" className="delivery-form">
            <h3>Entrega</h3>
            <label htmlFor="">Nome</label>
            <input type="text" {...register("customerName", { required: true })} />
            <label htmlFor="">Endereço</label>
            <input type="text" {...register("address", { required: true })} />
            <label htmlFor="">Bairro</label>
            <input type="text"  {...register("neighborhood", { required: true })}/>
            <label htmlFor="">Cidade</label>
            <input type="text"  {...register("city", { required: true })}/>
            <label htmlFor="">Estado</label>
            <input type="text"  {...register("state", { required: true })}/>
            <label htmlFor="">CEP</label>
            <input type="text"  {...register("cep", { required: true })}/>
          </form>
          <form action="" className="payment-form">
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
                  <input type="text" id="cardNumber"  {...register("paymentData.cardNumber", { required: true })}/>
                </div>
                <div className="sec-code">
                  <label htmlFor="securityCode">Cód segurança</label>
                  <input type="text" id="securityCode"  {...register("paymentData.securityCode", { required: true })}/>
                </div>
                <div className="card-name">
                  <label htmlFor="cardName">Nome no cartão</label>
                  <input type="text" id="cardName" {...register("paymentData.cardName", { required: true })}/>
                </div>
                <div className="exp-date">
                  <label htmlFor="">Validade</label>
                  <div className="expiration-date">
                    <select id="month"  {...register("paymentData.expirationMonth", { required: true })}>
                      <option value="" selected disabled hidden>Mês</option>
                      {months.map(item => {
                        return (
                          <option value={item}>{item}</option>
                        )
                      })}
                    </select>
                    <select id="year" {...register("paymentData.expirationYear", { required: true })}>
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
                  <select id="portion" {...register("paymentData.portion", { required: true })}>
                    {paymentOptions.map(item => {
                      return (
                        <option value={item}>{item}</option>
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
          </form>
        </div>
        <div className="payment-btn">
          <button className="general-btn">
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  )
}