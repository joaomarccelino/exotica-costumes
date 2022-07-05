import { useState } from 'react';
import { useStyle } from '../../hooks/StyleContext';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import './style.css';
import { useProducts } from '../../hooks/ProductContext';

export function AgeModal() {
  const [birthDay, setBirthDay] = useState<Date>();
  const {handleGetSexShopItems} = useProducts();
  const { handleSexShop } = useStyle();

  function handleHideAgeModal() {
    const ageModal = document.querySelector('.age-modal');
    ageModal?.classList.remove('active');
  }

  function calcAge() {
    let timeDiff = birthDay && Math.abs(Date.now() - birthDay.getTime()) || 0;
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    if (age >= 18) {
      handleHideAgeModal()
      handleSexShop()
      handleGetSexShopItems();
    } else {
      alert("Você precisa ter mais de 18 anos!");
    }
  }

  return (
    <div className="age-modal">
      <div className="age-form">
        <DatePicker selected={birthDay} onChange={(date:Date) => setBirthDay(date)} />
        <button
          className="general-btn"
          onClick={() => calcAge()}
        >
          Confirme sua idade
        </button>
      </div>
    </div>
  )
}