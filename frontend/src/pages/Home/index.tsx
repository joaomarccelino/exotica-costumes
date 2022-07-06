import { useState } from 'react';
import Spotlight from '../../assets/img/spotlight.png';
import { CadItemModal } from '../../components/CadItemModal';
import { ProductCard } from '../../components/ProductCard';
import { StockModal } from '../../components/StockModal';
import { useAuth } from '../../hooks/AuthContext';
import { useProducts } from '../../hooks/ProductContext';
import './styles.css';

export function Home() {
  const { favItems, products, selectedProduct } = useProducts();
  const { user } = useAuth();
  const adm = true;

  function handleShowCad() {
    const signModal = document.querySelector('.cad-item-bg')
    signModal?.classList.add('active');
  }

  return (
    <main>
      <div className="spotlight">
        <img src={Spotlight} alt="" />
      </div>
      {adm &&
        <div className="adm-btn">
          {user?.status === "ADM"
            &&
            <button
              className="general-btn"
              onClick={handleShowCad}
            >
              Adicionar Item
            </button>}
        </div>
      }
      <div className="container products">
        {products.map(item => {
          let flagged = false;
          favItems.forEach(fav => {
            if (fav.id === item.id) {
              flagged = true;
            }
          })
          return (
            <ProductCard
              key={item.id}
              {...item}
              flagged={flagged}
            />
          )
        })}
      </div>
      <CadItemModal />
      {
        selectedProduct &&
        <StockModal />
      }
    </main>

  )
}