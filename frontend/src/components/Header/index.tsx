import Logo from '../../assets/img/light-logo.svg';
import DarkLogo from '../../assets/img/dark-logo.svg';
import Sign from '../../assets/img/sign-icon.svg';
import Cart from '../../assets/img/cart.svg';
import Fav from '../../assets/img/fav-btn.svg';
import Light from '../../assets/img/light-button.svg'

import './styles.css';
import { useState } from 'react';

export function Header() {
  const [night, setNight] = useState(false);

  function nightMode() {
    document.documentElement.classList.toggle('dark-mode');
    setNight(!night);
  }

  return (
    <header className="header-bg">
      <div className="container header">
        <div className="main-menu">
          <a href="/" className="logo">
            <img src={night ? DarkLogo : Logo} alt="Exótica" />
          </a>
          <form action="" className="search">
            <input type="text" placeholder="O que você procura?" className="searchInput" />
          </form>
          <div className="actions">
            <a href="/" className="login-btn">
              <img src={Sign} alt="." />
              <span>Login ou Cadastro</span>
            </a>
            <a href="/">
              <img src={Cart} alt="Carrinho" />
            </a>
            <a href="/">
              <img src={Fav} alt="Favoritos" />
            </a>
            <a onClick={() => nightMode()}>
              <img src={Light} alt="Modo Claro/Escuro" />
            </a>
          </div>
        </div>
        <div className="categories">
          <a href="/">SUTIÃ</a>
          <a href="/">CALCINHA</a>
          <a href="/">BODY</a>
          {night ? <a href="" className="sex-shop-cat">SEX-SHOP</a> : ''}
          <a href="/">MODELADOR</a>
          <a href="/">PLUS</a>
          <a href="/">FITNESS</a>
        </div>
      </div>
    </header>
  )
}