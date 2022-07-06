import { useState } from "react";
import { useStyle } from "../../hooks/StyleContext";
import { FiMenu } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import './styles.css';
import { useProducts } from "../../hooks/ProductContext";

export function MobileMenu() {
  const [active, setActive] = useState(false);
  const { theme, handleRemoveSexShop} = useStyle();
  const { handleFilterBySubCategory } = useProducts();

  function handleShowAgeModal() {
    const ageModal = document.querySelector('.age-modal');
    ageModal?.classList.add('active');
  }
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
            <div className="mob-categories">
              <button className="empty-btn" onClick={() => { handleFilterBySubCategory("Sutiã") }}>SUTIÃ</button>
              <button className="empty-btn" onClick={() => { handleFilterBySubCategory("Calcinha") }}>CALCINHA</button>
              <button className="empty-btn" onClick={() => { handleFilterBySubCategory("Body") }}>BODY</button>
              {theme === 'dark' &&
                <button className="empty-btn sex-shop-cat"
                  onClick={handleShowAgeModal}>
                  SEX-SHOP
                </button>
              }
              <button className="empty-btn" onClick={() => { handleFilterBySubCategory("Modelador") }}>MODELADOR</button>
              <button className="empty-btn" onClick={() => { handleFilterBySubCategory("Plus") }}>PLUS</button>
              <button className="empty-btn" onClick={() => { handleFilterBySubCategory("Linha Noite") }}>LINHA NOITE</button>
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