import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

import './styles.css';
import { Evaluation } from '../../components/Evaluation';
import { ProductImgs } from '../../components/ProductsImgs';
import { formatPrice } from '../../utils/formatPrice';
import { useLocation } from 'react-router-dom';


import { ProductProps, useProducts } from '../../hooks/ProductContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';
import { baseURL } from '../../utils/commonData';
import { formatDate } from '../../utils/formatDate';

type ProductData = {
  product: ProductProps;
}

type CommentInput = {
  comment: string;
}


export function Product() {
  const location = useLocation();

  const data = location.state as ProductData;

  const product = data.product;

  const [comments, setComments] = useState([...product.comments] || []);
  const [size, setSize] = useState<number | string>(0);
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<CommentInput>();
  const [quantity, setQuantity] = useState(0);
  const [flagged, setFlagged] = useState(false);

  const { favItems } = useProducts();
  const { user, token } = useAuth();

  const { handleAddItemToCart, handleAddFavItem } = useProducts();


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

  const newItem = { id: product.id, name: product.name, image: product.images[0], quantity, price: product.price, size: size }
  const newFav = { id: product.id, name: product.name, images: product.images, price: product.price }

  function handleFlagItem() {
    setFlagged(!flagged);
    handleAddFavItem(newFav);
  }

  const onSubmit: SubmitHandler<CommentInput> = async data => {
    const newComment = {
      idproduct: product.id,
      iduser: user.iduser,
      name: user.name,
      text: data.comment
    }

    const newComment2 = {
      idproduct: product.id,
      iduser: user.iduser?.toString() || '',
      name: user.name,
      text: data.comment,
      id: '56',
      date: formatDate(new Date())
    }

    const response = await api.post(`${baseURL}/product/comment`, JSON.stringify(newComment), {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then(res => {
      alert("Comentário Adicionado!")
      const newComments = [...comments, newComment2];
      setComments(newComments);
      reset();
    })
      .catch(err => console.log(err));
    reset();
  }

  useEffect(() => {
    checkFlag();
  })

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
            disabled={product.stock.length === 0 || quantity <= 0 || size === 0}
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
          {comments?.map((item, index) => {
            return (
              <Evaluation
                key={index}
                iduser={item.iduser}
                name={item.name}
                date={item.date}
                text={item.text}
              />
            )
          })}
        </div>
        <form className="add-eval" onSubmit={handleSubmit(onSubmit)}>
          <textarea
            placeholder="Digite seu comentário"
            id="new-eval"
            {...register('comment')}
            cols={100}
            rows={8}
          ></textarea>
          <button className="general-btn">Adicionar</button>
        </form>
      </section>
    </>
  )
}