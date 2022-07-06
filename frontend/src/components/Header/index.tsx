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
import { useAuth } from '../../hooks/AuthContext';

export function Header() {
  const [subcategory, setSubcategory] = useState('');
  const { user } = useAuth();
  const { theme, handleRemoveSexShop, handleNight } = useStyle();
  const { handleFilterBySubCategory } = useProducts();


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
                (user.status === 'ACTIVE' || user.status === 'ADM') ?
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
              isAuth={(user.status === 'ACTIVE' || user.status === 'ADM')}
              handleShowFav={handleShowFav}
              handleShowCart={handleShowCart}
              handleShowSignIn={handleShowSignIn}
            />
          </div>
        </div>
        <MobileMenu />
        {theme === 'sexshop' ?
          <div className="sexshop-categories">
            <button className="empty-btn" onClick={() => { handleFilterBySubCategory("Estimulantes") }}>ESTIMULANTES</button>
            <button className="empty-btn" onClick={() => { handleFilterBySubCategory("Massagem") }}>MASSAGEM</button>
            <button
              className=" empty-btn sex-shop-cat"
              onClick={handleRemoveSexShop}
            >
              MODA ÍNTIMA
            </button>
            <button className="empty-btn" onClick={() => { handleFilterBySubCategory("Fantasias") }}>FANTASIAS</button>
            <button className="empty-btn" onClick={() => { handleFilterBySubCategory("Próteses") }} >PRÓTESES</button>
          </div>
          :
          <div className="categories">
            <button className="empty-btn" onClick={() => { handleFilterBySubCategory("Sutiã") }}>SUTIÃ</button>
            <button className="empty-btn" onClick={() => { handleFilterBySubCategory("Calcinha") }}>CALCINHA</button>
            <button className="empty-btn" onClick={() => { handleFilterBySubCategory("Body") }}>BODY</button>
            {theme === 'dark' &&
              <button className="empty-btn sex-shop-cat"
                onClick={handleShowAgeModal}
              >
                SEX-SHOP
              </button>
            }
            <button className="empty-btn"  onClick={() => { handleFilterBySubCategory("Modelador")}}>MODELADOR</button>
            <button className="empty-btn"  onClick={() => { handleFilterBySubCategory("Plus")}}>PLUS</button>
            <button className="empty-btn"  onClick={() => { handleFilterBySubCategory("Linha Noite")}}>LINHA NOITE</button>
          </div>
        }
      </div>
    </header>
  )
}