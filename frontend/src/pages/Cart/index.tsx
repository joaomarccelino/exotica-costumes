import { useEffect, useState } from 'react';
import CartImg from '../../assets/img/prod-test1.jpg';

import { BsCreditCard } from 'react-icons/bs';

import {RiBillLine} from 'react-icons/ri';

import { months, years, paymentOptions } from '../../utils/commonData';

import { CartItem } from '../../components/CartItem';
import './styles.css';
import { formatPrice } from '../../utils/formatPrice';
export function Cart() {
  const [totalValue, setTotalValue] = useState(0);
  const [shipping, setShipping] = useState(56.50);
  function calcTotalValue() {
    let total = 0
    cartItems.forEach(item => {
      total += item.price
    })
    setTotalValue(total);
  }

  useEffect(() => {
    calcTotalValue()
  }, [])

  const cartItems = [
    {
      image: CartImg,
      price: 99.90,
      name: 'Body Em Microfibra E Renda White Party',
      amount: 3,
    },
    {
      image: CartImg,
      price: 99.90,
      name: 'Body Em Microfibra E Renda White Party',
      amount: 3,
    },
    {
      image: CartImg,
      price: 99.90,
      name: 'Body Em Microfibra E Renda White Party',
      amount: 3,
    }
  ]
  return (
    <div className="cart container">
      <h1>Finalizar Compra</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => {
            return (
              <CartItem
                image={item.image}
                price={item.price}
                name={item.name}
                amount={item.amount}
              />
            )
          })}
        </div>
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
      </div>
      <div className="payment">
        <h2>Pagamento</h2>
        <div className="payment-forms">
          <form action="" className="delivery-form">
            <h3>Entrega</h3>
            <label htmlFor="">Nome</label>
            <input type="text" />
            <label htmlFor="">Endereço</label>
            <input type="text" />
            <label htmlFor="">Bairro</label>
            <input type="text" />
            <label htmlFor="">Cidade</label>
            <input type="text" />
            <label htmlFor="">Estado</label>
            <input type="text" />
            <label htmlFor="">CEP</label>
            <input type="text" />
          </form>
          <form action="" className="payment-form">
            <h3>Forma de pagamento</h3>
            <div className="payment-input">
              <input type="radio" name="payment-option" id="credit-card" />
              <label htmlFor="credit-card"><BsCreditCard size={25} color={"var(--p4)"}/> Cartão de Crédito</label>
            </div>
            <div className="credit-form">
              <div className="card-number">
                <label htmlFor="cardNumber">Número do cartão</label>
                <input type="text" name="cardNumber" id="cardNumber" />
              </div>
              <div className="sec-code">
                <label htmlFor="securityCode">Cód segurança</label>
                <input type="text" name="securityCode" id="securityCode" />
              </div>
              <div className="card-name">
                <label htmlFor="cardName">Nome no cartão</label>
                <input type="text" id="cardName" name="cardName" />
              </div>
              <div className="exp-date">
                <label htmlFor="">Validade</label>
                <div className="expiration-date">
                  <select name="month" id="month">
                    <option value="" selected disabled hidden>Mês</option>
                    {months.map(item => {
                      return (
                        <option value={item}>{item}</option>
                      )
                    })}
                  </select>
                  <select name="year" id="year">
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
                <select name="portion" id="portion">
                  {paymentOptions.map(item => {
                    return (
                      <option value={item}>{item}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="payment-input">
              <input type="radio" name="payment-option" id="pix" />
              <label htmlFor="pix"><RiBillLine size={25} color={"var(--p4)"}/> Pix</label>
            </div>
            <div className="pix-form">
              <h4>pix</h4>
            </div>
            <div className="payment-input">
              <input type="radio" name="payment-option" id="ticket" />
              <label htmlFor="ticket"><RiBillLine size={25} color={"var(--p4)"}/> Boleto</label>
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