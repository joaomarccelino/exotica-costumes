import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { sizePatternP, sizePatternN, categories } from '../../utils/commonData';
import './styles.css';

type Sizes = {
  size: string;
  quantity: number;
}

type Inputs = {
  name: string;
  description: string;
  category: string;
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
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const watchAllFields = watch();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type)
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
          <select {...register("category", { required: true })} name="category" id="category">
            <option value="" selected disabled hidden>Selecione uma categoria...</option>
            {categories.map((category) => {
              return (
                <option value={category}>{category}</option>
              )
            })}
          </select>
          <div className="left-right-form">
            <div className="left-form">
              <label htmlFor="price">Preço</label>
              <input {...register("price", { required: true })} type="number" name="price" id="price" />
              <label htmlFor="pattern">Padrão de Tamanho</label>
              <select {...register("pattern")} id="pattern">
                <option value="" selected disabled hidden>Selecione um padrão...</option>
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
                        {sizePattern.map(item =>
                          <option value={item}>{item}</option>
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
                        {sizePattern.map(item =>
                          <option value={item}>{item}</option>
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
                        {sizePattern.map(item =>
                          <option value={item}>{item}</option>
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
                        {sizePattern.map(item =>
                          <option value={item}>{item}</option>
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
              <input type="file" />
              <input type="file" />
              <input type="file" />
              <input type="file" />
            </div>
          </div>
        </form>
        <button
          className="cad-close-button"
          onClick={() => closeModal()}
        >
          X
        </button>
        <div className="cad-btn">
          <button className="general-btn">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}