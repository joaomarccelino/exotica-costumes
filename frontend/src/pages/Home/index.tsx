import { useEffect, useState } from 'react';
import Spotlight from '../../assets/img/spotlight.png';
import { CadItemModal } from '../../components/CadItemModal';
import { ProductCard } from '../../components/ProductCard';
import { Slider } from '../../components/Slider';
import { useProducts } from '../../hooks/ProductContext';
import api from '../../services/api';
import './styles.css';

type Size = {
  size: number | string;
  quantity: number;
}

type Evaluation = {
  id: string;
  by: string;
  on: string;
  text: string;
  like: boolean;
  dislike: boolean;
}

export type ProductProps = {
  id: string;
  name: string;
  image: string;
  images: string[];
  description: string;
  price: number;
  stock: Size[];
  flagged?: boolean;
  evaluations: Evaluation[];
}
export function Home() { 

  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {favItems} = useProducts();
  const adm = true;

  function handleShowCad() {
    const signModal = document.querySelector('.cad-item-bg')
    signModal?.classList.add('active');
  }

  async function getProducts() {
    const response = await api.get('');
    const data = response.data.response.products;
    console.log(data);
    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  }, [])
  return (
    <main>
      <div className="spotlight">
        <img src={Spotlight} alt="" />
      </div>
      {adm && 
      <div className="adm-btn">
        <button 
        className="general-btn"
        onClick={handleShowCad}
        >
          Adicionar Item
        </button>
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
      <div className="news">
        <h2>Últimas Novidades</h2>
        <Slider />
        <button className="general-btn">
          Saiba mais
        </button>
      </div>
      <CadItemModal />
    </main>

  )
}