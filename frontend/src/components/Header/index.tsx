import Logo from '../../assets/img/light-logo.svg';
import DarkLogo from '../../assets/img/dark-logo.svg';
import SexShopLogo from '../../assets/img/sexshop-logo.svg';

import { FaRegUser } from 'react-icons/fa';
import { HiOutlineSearchCircle } from 'react-icons/hi';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineBulb } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

import './styles.css';
import { useStyle } from '../../hooks/StyleContext';
import { useState } from 'react';
import { AuthMenu } from '../AuthMenu';
import { MobileMenu } from '../MobileMenu';
import { MobileActions } from '../MobileActions';
import { MobSearchButton } from '../MobSearchButton';
import { MobileLogo } from '../MobileLogo';
import { useProducts } from '../../hooks/ProductContext';

export function Header() {
  const [subcategory, setSubcategory] = useState('');
  const { theme, handleSexShop, handleRemoveSexShop, handleNight } = useStyle();
  const { handleFilterBySubCategory } = useProducts();
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

  function handleShowSearchInput() {
    const searchInput = document.querySelector('.responsive-search');
    searchInput?.classList.toggle('active');
  }

  function handleShowAgeModal() {
    const ageModal = document.querySelector('.age-modal');
    ageModal?.classList.add('active');
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
        <div className="responsive-search">
          <input type="text" placeholder="O que você procura?" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="searchInput" />
          <button
            className="empty-btn input-search"
            onClick={() => { handleFilterBySubCategory(subcategory) }}
          >
            <BsSearch size={20} color={"var(--g11)"} />
          </button>
        </div>
        <div className="main-menu">
          <a href="/" className="logo">
            <img src={handleLogo()} alt="Exótica" />
          </a>
          <MobileLogo />
          <div className="header-options">
            <div className="search">
              <input type="text" placeholder="O que você procura?" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="searchInput" />
              <button
                className="empty-btn input-search"
                onClick={() => { handleFilterBySubCategory(subcategory) }}
              >
                <BsSearch size={20} color={"var(--g11)"} />
              </button>
            </div>
            <button
              className="search-btn empty-btn"
              onClick={handleShowSearchInput}
            >
              <HiOutlineSearchCircle size={40} color={"var(--p2)"} />
            </button>
            <MobSearchButton handleShowSearchInput={handleShowSearchInput} />
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
                  <AiOutlineShoppingCart size={25} color="var(--g1)" />
                </div>
              </button>
              <button
                className="header-btn"
                onClick={() => handleShowFav()}
              >
                <div className="header-icon">
                  <AiOutlineHeart size={25} color="var(--g1)" />
                </div>
              </button>
              <button onClick={handleNight} className="header-btn">
                <div className="header-icon n-mode">
                  <AiOutlineBulb size={25} color="var(--p2)" />
                </div>
              </button>
            </div>
            <MobileActions
              isAuth
              handleShowFav={handleShowFav}
              handleShowCart={handleShowCart}
              handleShowSignIn={handleShowSignIn}
            />
          </div>
        </div>
        <MobileMenu />
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
                onClick={handleShowAgeModal}
              >
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