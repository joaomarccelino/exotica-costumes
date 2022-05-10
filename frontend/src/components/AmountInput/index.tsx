import { useState } from "react";
import './styles.css';

type AmountInputProps = {
  amountProp: number;
}

export function AmountInput({amountProp}: AmountInputProps) {
  const [amount, setAmount] = useState(amountProp);
  return (
    <div className="amount-input">
      <span className="amount-title">Quantidade</span>
      <div className="amount-buttons">
        <button onClick={() => { (amount > 0) && setAmount(amount - 1) }}>-</button>
        <span>{amount}</span>
        <button onClick={() => { setAmount(amount + 1) }}>+</button>
      </div>
    </div>
  )
}