import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

import './styles.css';
import { Evaluation } from '../../components/Evaluation';
import { ProductImgs } from '../../components/ProductsImgs';
import { formatPrice } from '../../utils/formatPrice';
import { useLocation } from 'react-router-dom';


import { ProductProps, useProducts } from '../../hooks/ProductContext';

type ProductData = {
  product: ProductProps;
}


export function Product() {
  const [size, setSize] = useState<number | string>(0);
  const [quantity, setQuantity] = useState(0);
  const [flagged, setFlagged] = useState(false);

  const { favItems } = useProducts();

  const { handleAddItemToCart, handleAddFavItem } = useProducts();

  const location = useLocation();

  const data = location.state as ProductData;

  const product = data.product;

  function selectSize(size: number | string) {
    const sizes = document.querySelectorAll('.size');
    sizes.forEach(item => {
      if (size.toString() === item.innerHTML) {
        item.classList.add('selected');
        setSize(size);
      } else {
        item.classList.remove('selected');
      }
    })
  }

  function checkFlag() {
    favItems.forEach(item => {
      if (item.id === product.id) {
        setFlagged(true);
      }
    })
  }

  const newItem = { id: product.id, name: product.name, images: product.images, quantity, price: product.price }
  const newFav = { id: product.id, name: product.name, images: product.images, price: product.price }

  function handleFlagItem() {
    setFlagged(!flagged);
    handleAddFavItem(newFav);
  }

  useEffect(() => {
    checkFlag();
    console.log(size, quantity)
  }, [])

  return (
    <>
      <main className="product container">
        <ProductImgs images={product.images} />
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
          <span className="prod-price">{formatPrice(product.price)}</span>
          {
            product.stock.length > 0 ?
              <span className="sizes-title">Escolha o tamanho</span>
              :
              <span className="unavaible-product">Produto Indisponível</span>
          }
          <div className="sizes">
            {
              product.stock.map(item => {
                return (
                  item.quantity > 0 &&
                  <button className="size" onClick={() => selectSize(item.size)}>
                    {item.size}
                  </button>
                )
              })
            }
          </div>
          <div className="quantity-input">
            <span className="quantity-title">Quantidade</span>
            <div className="quantity-buttons">
              <button onClick={() => { (quantity > 0) && setQuantity(quantity - 1) }}>-</button>
              <span>{quantity}</span>
              <button onClick={() => { setQuantity(quantity + 1) }}>+</button>
            </div>
          </div>
          <button
            className="general-btn"
            onClick={() => handleAddItemToCart(newItem)}
            disabled={product.stock.length === 0 || quantity <= 0 || size == 0}
          >
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </main>
      <section className="container description">
        <h2>Descrição</h2>
        <div className="prod-description">
          <p>{product.description}</p>
        </div>
      </section>
      <section className="container evaluations-container">
        <h2>Avaliações</h2>
        <div className="evaluations">
          {product.evaluations?.map(item => {
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
        <div className="add-eval">
          <textarea
            placeholder="Digite seu comentário"
            name="new-eval"
            id="new-eval"
            cols={100}
            rows={8}
          ></textarea>
          <button className="general-btn">Adicionar</button>
        </div>
      </section>
    </>
  )
}