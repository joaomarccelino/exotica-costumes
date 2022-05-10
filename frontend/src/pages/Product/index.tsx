import { useState } from 'react';
import Fav from '../../assets/img/fav-btn.svg';
import './styles.css';
import { Evaluation } from '../../components/Evaluation';
import { ProductImgs } from '../../components/ProductsImgs';
import { AmountInput } from '../../components/AmountInput';

export function Product() {
  const [size, setSize] = useState<number>(0);
  const [amount, setAmount] = useState(0);

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

  const productTest = {
    name: 'Body Em Microfibra E Renda White Party',
    price: 69.90,
    sizes: [38, 40, 42, 44, 46, 48],
  }


  const evalTest = [
    {
      by: "Giovanni Rios Barros",
      on: "08/05/2022",
      text: "Comprei esse sutiã após experimentar e comprar em loja física. Gostei tanto que comprei de outras cores no site. Me surpreendeu a qualidade do material, o conforto que ele oferece e o quanto veste bem. Com certeza me tornei consumidora fiel da marca. ",
      like: false,
      dislike: false
    },
    {
      by: "Giovanni Rios Barros",
      on: "08/05/2022",
      text: "Comprei esse sutiã após experimentar e comprar em loja física. Gostei tanto que comprei de outras cores no site. Me surpreendeu a qualidade do material, o conforto que ele oferece e o quanto veste bem. Com certeza me tornei consumidora fiel da marca. ",
      like: false,
      dislike: false
    },
    {
      by: "Giovanni Rios Barros",
      on: "08/05/2022",
      text: "Comprei esse sutiã após experimentar e comprar em loja física. Gostei tanto que comprei de outras cores no site. Me surpreendeu a qualidade do material, o conforto que ele oferece e o quanto veste bem. Com certeza me tornei consumidora fiel da marca. ",
      like: false,
      dislike: false
    }
  ]


  const productPrice = productTest.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (
    <>
      <main className="product container">
        <ProductImgs />
        <div className="product-info">
          <a href="">
            <img src={Fav} alt="" />
          </a>
          <h1>{productTest.name}</h1>
          <span className="price-title">a partir de</span>
          <span className="prod-price">{`R$ ${productPrice.replace('.', ',')}`}</span>
          <span className="sizes-title">Escolha o tamanho</span>
          <div className="sizes">
            {productTest.sizes.map(item => {
              return (
                <button className="size" onClick={() => selectSize(item)}>
                  {item}
                </button>
              )
            })}
          </div>
            <AmountInput amountProp={amount} />
          <button className="general-btn">COMPRAR</button>
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
          {evalTest.map(item => {
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