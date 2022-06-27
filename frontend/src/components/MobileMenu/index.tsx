import { useState } from "react";
import { useStyle } from "../../hooks/StyleContext";
import { FiMenu } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import './styles.css';

export function MobileMenu() {
  const [active, setActive] = useState(false);
  const { theme, handleSexShop, handleRemoveSexShop, handleNight } = useStyle();
  return (
    <div className="mobile-menu">
      {active ?
        <>
          <button 
          className="empty-btn"
          onClick={() => setActive(false)}
          >
            <CgClose size={24} color={"var(--g12)"} />
          </button>
          {theme === 'sexshop' ?
            <div className="mob-sexshop-categories">
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
            <div className="mob-categories">
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
        </>
        :
        <button 
        className="empty-btn"
        onClick={() => setActive(true)}
        >
          <FiMenu size={24} color={"var(--g12)"} />
        </button>
      }
    </div>
  )
}