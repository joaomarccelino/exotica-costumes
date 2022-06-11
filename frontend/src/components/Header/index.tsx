import Logo from '../../assets/img/light-logo.svg';
import DarkLogo from '../../assets/img/dark-logo.svg';
import SexShopLogo from '../../assets/img/sexshop-logo.svg';

import { FaRegUser } from 'react-icons/fa';

import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineBulb } from 'react-icons/ai';

import './styles.css';
import { useStyle } from '../../hooks/StyleContext';
import { useState } from 'react';
import { AuthMenu } from '../AuthMenu';

export function Header() {
  const { theme, handleSexShop, handleRemoveSexShop, handleNight } = useStyle();
  const [isAuth, setIsAuth] = useState(true);
  function handleShowSignIn() {
    const signModal = document.querySelector('.sign-bg')
    signModal?.classList.add('active');
  }

  function handleShowCart() {
    const cartModal = document.querySelector('.cart-modal')
    cartModal?.classList.add('active');
  }

  function handleShowFav() {
    const favModal = document.querySelector('.fav-modal')
    favModal?.classList.add('active');
  }

  function handleLogo() {
    if (theme === 'dark') {
      return DarkLogo;
    } else if (theme === 'sexshop') {
      return SexShopLogo;
    } else {
      return Logo;
    }
  }

  return (
    <header className="header-bg">
      <div className="container header">
        <div className="main-menu">
          <a href="/" className="logo">
            <img src={handleLogo()} alt="Exótica" />
          </a>
          <form action="" className="search">
            <input type="text" placeholder="O que você procura?" className="searchInput" />
          </form>
          <div className="actions">
            {
              isAuth ?
                <AuthMenu /> :
                <button
                  className="login-btn header-btn"
                  onClick={() => handleShowSignIn()}
                >
                  <div className="login-btn-icon">
                    <FaRegUser size={20} color={"var(--p2)"} />
                  </div>
                  <span>Login ou Cadastro</span>
                </button>
            }
            <button
              className="header-btn"
              onClick={() => handleShowCart()}
            >
              <div className="header-icon">
                <AiOutlineShoppingCart size={25} color="#fff" />
              </div>
            </button>
            <button
              className="header-btn"
              onClick={() => handleShowFav()}
            >
              <div className="header-icon">
                <AiOutlineHeart size={25} color="#FFF" />
              </div>
            </button>
            <button onClick={handleNight} className="header-btn">
              <div className="header-icon n-mode">
                <AiOutlineBulb size={25} color="var(--p2)" />
              </div>
            </button>
          </div>
        </div>
        {theme === 'sexshop' ?
          <div className="sexshop-categories">
            <a href="/">ESTIMULANTES</a>
            <a href="/">MASSAGEM</a>
            <button
              className=" empty-btn sex-shop-cat"
              onClick={handleRemoveSexShop}
            >
              MODA ÍNTIMA
            </button>
            <a href="/">FANTASIAS</a>
            <a href="/">PRÓTESES</a>
          </div>
          :
          <div className="categories">
            <a href="/">SUTIÃ</a>
            <a href="/">CALCINHA</a>
            <a href="/">BODY</a>
            {theme === 'dark' &&
              <button className="empty-btn sex-shop-cat"
                onClick={handleSexShop}>
                SEX-SHOP
              </button>
            }
            <a href="/">MODELADOR</a>
            <a href="/">PLUS</a>
            <a href="/">FITNESS</a>
          </div>
        }
      </div>
    </header>
  )
}