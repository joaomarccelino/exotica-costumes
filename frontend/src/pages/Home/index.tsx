import { useEffect, useState } from 'react';
import Spotlight from '../../assets/img/spotlight.png';
import { ProductCard } from '../../components/ProductCard';
import { Slider } from '../../components/Slider';
import './styles.css';

type Size = {
  size: number;
  available: number;
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
  price: number;
  sizes: Size[];
  evaluations: Evaluation[];
}
export function Home() { 

  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function getProducts() {
    setLoading(true);
    fetch('products.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    getProducts();
  }, [])
  return (
    <main>
      <div className="spotlight">
        <img src={Spotlight} alt="" />
      </div>
      <div className="container products">
        {products.map(item => {
          return (
            <ProductCard
              key={item.id}
              {...item}
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
    </main>

  )
}