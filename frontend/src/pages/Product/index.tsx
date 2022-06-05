import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

import './styles.css';
import { Evaluation } from '../../components/Evaluation';
import { ProductImgs } from '../../components/ProductsImgs';
import { AmountInput } from '../../components/AmountInput';
import { formatPrice } from '../../utils/formatPrice';
import { useLocation } from 'react-router-dom';
import { ProductProps } from '../Home';

import { useProducts } from '../../hooks/ProductContext';

type ProductData = {
  product: ProductProps;
}


export function Product() {
  const [size, setSize] = useState<number>(0);
  const [amount, setAmount] = useState(0);
  const [flagged, setFlagged] = useState(false);

  const { handleAddItemToCart, handleAddFavItem } = useProducts();

  const location = useLocation();

  const data = location.state as ProductData;

  const product = data.product;  
  
  function selectSize(size: number) {
    const sizes = document.querySelectorAll('.size');
    sizes.forEach(item => {
      if (size === +item.innerHTML) {
        item.classList.add('selected');
        setSize(size);
      } else {
        item.classList.remove('selected');
      }
    })
  }

  const newItem = { id: product.id, name: product.name, image: product.image, amount, price: product.price }
  const newFav = {id: product.id, name: product.name, image: product.image, price: product.price}

  function handleFlagItem() {
    setFlagged(!flagged);
    handleAddFavItem(newFav);
  }

  return (
    <>
      <main className="product container">
        <ProductImgs />
        <div className="product-info">
          <button
            className="header-btn"
            onClick={() => handleFlagItem()}
          >
            <div className={flagged ? "filled-heart" : "unfilled-heart"}>
              <AiOutlineHeart size={25} color={flagged ? "#FFF" : "var(--p2)"} />
            </div>
          </button>
          <h1>{product.name}</h1>
          <span className="price-title">a partir de</span>
          <span className="prod-price">{`R$ ${formatPrice(product.price)}`}</span>
          <span className="sizes-title">Escolha o tamanho</span>
          <div className="sizes">
            {product.sizes.map(item => {
              return (
                item.available > 0 &&
                <button className="size" onClick={() => selectSize(item.size)}>
                  {item.size}
                </button>
              )
            })}
          </div>
          <AmountInput amountProp={amount} />
          <button
            className="general-btn"
            onClick={() => handleAddItemToCart(newItem)}
          >
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </main>
      <section className="container description">
        <h2>Descrição</h2>
        <div className="prod-description">
          <p>O Sutiã Triângulo com Bojo sem Aro em Microfibra é o básico essencial, item obrigatório na sua gaveta de lingerie!</p>
          <p>- Desenvolvido em microfibra macia</p>
          <p>- Bojo triângulo em espuma macia e flexível</p>
          <p>- Sem aro, para mais conforto</p>
          <p>- Alças fixas e reguláveis</p>
          <p>- Ideal para leve e média sustentação</p>
          <p>- Perfeito para usar com roupas decotadas</p>
        </div>
      </section>
      <section className="container evaluations-container">
        <h2>Avaliações</h2>
        <div className="evaluations">
          {product.evaluations.map(item => {
            return (
              <Evaluation
                by={item.by}
                on={item.on}
                text={item.text}
                like={item.like}
                dislike={item.dislike}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}