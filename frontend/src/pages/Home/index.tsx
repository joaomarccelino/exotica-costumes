import Teste from '../../assets/img/imagem-teste.png';
import Spotlight from '../../assets/img/spotlight.png';
import { ProductCard } from '../../components/ProductCard';
import './styles.css';

export function Home() {
  const testeProdutos = [
    {
      name: 'Body Em Microfibra E Renda White Party',
      image: Teste,
      value: 99.95
    },
    {
      name: 'Body Em Microfibra E Renda White Party',
      image: Teste,
      value: 109.93
    },
    {
      name: 'Body Em Microfibra E Renda White Party',
      image: Teste,
      value: 99.95
    },
    {
      name: 'Body Em Microfibra E Renda White Party',
      image: Teste,
      value: 39.95
    },
    {
      name: 'Body Em Microfibra E Renda White Party',
      image: Teste,
      value: 99.95
    },
    {
      name: 'Body Em Microfibra E Renda White Party',
      image: Teste,
      value: 19.65
    },
    {
      name: 'Body Em Microfibra E Renda White Party',
      image: Teste,
      value: 99.95
    },
    {
      name: 'Body Em Microfibra E Renda White Party',
      image: Teste,
      value: 99.95
    },

  ]
  return (
    <main>
      <div className="spotlight">
        <img src={Spotlight} alt="" />
      </div>
      <div className="container products">
        {testeProdutos.map(item => {
          return (
            <ProductCard
              name={item.name}
              image={item.image}
              value={item.value}
            />
          )
        })}
      </div>
      <div className="news">
        <h2>Últimas Novidades</h2>
      </div>
    </main>

  )
}