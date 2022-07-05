import { ChangeEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../hooks/AuthContext";
import { useProducts } from "../../hooks/ProductContext";
import api from "../../services/api";
import { sizePatternP, sizePatternN, categories, subCategories } from '../../utils/commonData';
import './styles.css';

type Sizes = {
  size: string;
  quantity: number;
}

type Inputs = {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  pattern: string;
  quantity1: string | number;
  quantity2: string | number;
  quantity3: string | number;
  quantity4: string | number;
  size1: string | number;
  size2: string | number;
  size3: string | number;
  size4: string | number;
};

export function CadItemModal() {
  const [sizePattern, setSizePattern] = useState<string[] | number[]>([]);
  const [showSizes, setShowSizes] = useState<boolean>(false);
  const [image1, setImage1] = useState<FileList>();
  const [image2, setImage2] = useState<FileList>();
  const [image3, setImage3] = useState<FileList>();
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Inputs>();
  const { token } = useAuth();
  const { getProducts } = useProducts();

  function saveImage1(e: ChangeEvent<HTMLInputElement>) {
    e.target.files && setImage1(e.target.files)
  }

  function saveImage2(e: ChangeEvent<HTMLInputElement>) {
    e.target.files && setImage2(e.target.files)
  }

  function saveImage3(e: ChangeEvent<HTMLInputElement>) {
    e.target.files && setImage3(e.target.files)
  }

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const newProduct = data.pattern === 'sexshop' ?
      {
        name: data.name,
        description: data.description,
        category: data.category,
        subcategory: data.subcategory,
        status: 'ACTIVE',
        price: data.price,
        stock: [
          {
            size: 'sex',
            quantity: 3
          }
        ]
      } :
      {
        name: data.name,
        description: data.description,
        category: data.category,
        subcategory: data.subcategory,
        status: 'ACTIVE',
        price: data.price,
        stock: [
          {
            size: data.size1,
            quantity: data.quantity1
          },
          {
            size: data.size2,
            quantity: data.quantity2
          },
          {
            size: data.size3,
            quantity: data.quantity3
          },
          {
            size: data.size4,
            quantity: data.quantity4
          }
        ]
      }

    const response = await api.post('https://api.gvnrsbs.com.br/product', JSON.stringify(newProduct), {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => {
        const idproduct = res.data.response.product[0].id;
        const images = ((image1 && image2 && image3) && [image1[0], image2[0], image3[0]]) || [];
        images.forEach(async (image) => {
          const newImg = new FormData();
          newImg.append('idproduct', idproduct)
          newImg.append('status', 'ACTIVE')
          newImg.append('image', image)
          const response = await api.post('https://api.gvnrsbs.com.br/product/images', newImg, {
            headers: {
              'x-access-token': token
            }
          }).then(res => {
          });
        })
      });
    alert("Produto Adicionado!")
    setShowSizes(false);
    reset();
    const modal = document.querySelector('.cad-item-bg');
    modal?.classList.remove('active');
    getProducts();
  }

  const watchAllFields = watch();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (value.pattern === 'pmg') {
        setShowSizes(true);
        setSizePattern(sizePatternP)
      }
      if (value.pattern === 'number') {
        setShowSizes(true);
        setSizePattern(sizePatternN)
      }
      if (value.pattern === 'sexshop') {
        setShowSizes(false);
      }
    }
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  function closeModal() {
    const modal = document.querySelector('.cad-item-bg');
    modal?.classList.remove('active');
  }
  return (
    <div className="cad-item-bg">
      <div className="cad-item-modal">
        <h1>Cadastrar Produto</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="cad-item-form">
          <label htmlFor="name">Nome</label>
          <input {...register("name", { required: true })} type="text" id="name" />
          <label htmlFor="description">Descrição</label>
          <input {...register("description", { required: true })} type="text" id="description" />
          <label htmlFor="category">Categoria</label>
          <select defaultValue="DEFAULT" {...register("category", { required: true })} name="category" id="category">
            <option value="DEFAULT" disabled hidden>Selecione uma categoria...</option>
            {categories.map((category, index) => {
              return (
                <option value={category} key={index}>{category}</option>
              )
            })}
          </select>
          <label htmlFor="subcategory">Sub-Categoria</label>
          <select defaultValue="DEFAULT" {...register("subcategory", { required: true })} name="subcategory" id="subcategory">
            <option value="DEFAULT" disabled hidden>Selecione uma sub-categoria...</option>
            {subCategories.map((item, index) => {
              return (
                <option value={item} key={index}>{item}</option>
              )
            })}
          </select>
          <div className="left-right-form">
            <div className="left-form">
              <label htmlFor="price">Preço</label>
              <input {...register("price", { required: true })} type="number" step=".01" min="0" name="price" id="price" />
              <label htmlFor="pattern">Padrão de Tamanho</label>
              <select {...register("pattern")} defaultValue="DEFAULT" id="pattern">
                <option value="DEFAULT" disabled hidden>Selecione um padrão...</option>
                <option value="pmg">P, M, G</option>
                <option value="number">Numérico</option>
                <option value="sexshop">Sex-shop</option>
              </select>
              {
                showSizes &&
                <>
                  <div className="size-form">
                    <div className="size-form-size">
                      <label htmlFor="size1">Tamanho</label>
                      <select
                        id="size1"
                        {...register("size1")}
                      >
                        {sizePattern.map((item, index) =>
                          <option value={item} key={index}>{item}</option>
                        )}
                      </select>
                    </div>
                    <div className="size-form-quantity">
                      <label htmlFor="quantity1">Quantidade</label>
                      <input
                        {...register("quantity1")}
                        type="number" name="quantity1" id="quantity1" min={0}
                      />
                    </div>
                  </div>
                  <div className="size-form">
                    <div className="size-form-size">
                      <label htmlFor="size2">Tamanho</label>
                      <select
                        id="size2"
                        {...register("size2")}
                      >
                        {sizePattern.map((item, index) =>
                          <option value={item} key={index}>{item}</option>
                        )}
                      </select>
                    </div>
                    <div className="size-form-quantity">
                      <label htmlFor="quantity2">Quantidade</label>
                      <input
                        {...register("quantity2")}
                        type="number" name="quantity2" id="quantity2" min={0}
                      />
                    </div>
                  </div>
                  <div className="size-form">
                    <div className="size-form-size">
                      <label htmlFor="size3">Tamanho</label>
                      <select
                        id="size3"
                        {...register("size3")}
                      >
                        {sizePattern.map((item, index) =>
                          <option value={item} key={index}>{item}</option>
                        )}
                      </select>
                    </div>
                    <div className="size-form-quantity">
                      <label htmlFor="quantity3">Quantidade</label>
                      <input
                        {...register("quantity3")}
                        type="number" name="quantity3" id="quantity3" min={0}
                      />
                    </div>
                  </div>
                  <div className="size-form">
                    <div className="size-form-size">
                      <label htmlFor="size4">Tamanho</label>
                      <select
                        id="size4"
                        {...register("size4")}
                      >
                        {sizePattern.map((item, index) =>
                          <option value={item} key={index}>{item}</option>
                        )}
                      </select>
                    </div>
                    <div className="size-form-quantity">
                      <label htmlFor="quantity4">Quantidade</label>
                      <input
                        {...register("quantity4")}
                        type="number" name="quantity4" id="quantity4" min={0}
                      />
                    </div>
                  </div>
                </>
              }
            </div>
            <div className="right-form">
              <h2>Adicione as fotos: </h2>
              <input type="file" accept=".png, .jpg" onChange={saveImage1} />
              <input type="file" accept=".png, .jpg" onChange={saveImage2} />
              <input type="file" accept=".png, .jpg" onChange={saveImage3} />
            </div>
          </div>
          <div className="cad-btn">
            <button type="submit" className="general-btn">Adicionar</button>
          </div>
        </form>
        <button
          className="cad-close-button"
          onClick={() => closeModal()}
        >
          X
        </button>
      </div>
    </div>
  )
}