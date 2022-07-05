import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../hooks/AuthContext";
import { useProducts } from "../../hooks/ProductContext";
import api from "../../services/api";
import './style.css';

type SizeInputs = {
  quantity1: number;
  quantity2: number;
  quantity3: number;
  quantity4: number;
}


export function StockModal() {
  const { token } = useAuth();
  const { selectedProduct } = useProducts();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SizeInputs>({
    defaultValues: {
      quantity1: selectedProduct?.stock[0].quantity || 0,
      quantity2: selectedProduct?.stock[1].quantity || 0,
      quantity3: selectedProduct?.stock[2].quantity || 0,
      quantity4: selectedProduct?.stock[3].quantity || 0
    }
  });
  const onSubmit: SubmitHandler<SizeInputs> = async data => {
    const newStock = {
      productId: selectedProduct.id,
      stock: [
        {
          size: selectedProduct?.stock[0].size,
          quantity: data.quantity1
        },
        {
          size: selectedProduct?.stock[1].size,
          quantity: data.quantity2
        },
        {
          size: selectedProduct?.stock[2].size,
          quantity: data.quantity3
        },
        {
          size: selectedProduct?.stock[3].size,
          quantity: data.quantity4
        }
      ]
    }

    const response = await api.post('https://api.gvnrsbs.com.br/product/stock', JSON.stringify(newStock), {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => { console.log(res) })
  }

  return (
    <div className="stock-modal-bg">
      <form onSubmit={handleSubmit(onSubmit)} className="stock-modal">
        <h1>Atualizar Estoque</h1>
        <h2>{selectedProduct?.name}</h2>
        <div className="stock-form">
          <div className="stock-form-size">
            <span>{selectedProduct?.stock[0].size || 'Tamanho não cadastrado'}</span>
          </div>
          <div className="stock-form-quantity">
            <label htmlFor="quantity1">Quantidade</label>
            <input
              {...register("quantity1")}
              type="number" name="quantity1" id="quantity1" min={0}
            />
          </div>
        </div>
        <div className="stock-form">
          <div className="stock-form-size">
            <span>{selectedProduct?.stock[1].size || 'Tamanho não cadastrado'}</span>
          </div>
          <div className="stock-form-quantity">
            <label htmlFor="quantity2">Quantidade</label>
            <input
              {...register("quantity2")}
              type="number" name="quantity2" id="quantity2" min={0}
            />
          </div>
        </div>
        <div className="stock-form">
          <div className="stock-form-size">
            <span>{selectedProduct?.stock[2].size || 'Tamanho não cadastrado'}</span>
          </div>
          <div className="stock-form-quantity">
            <label htmlFor="quantity3">Quantidade</label>
            <input
              {...register("quantity3")}
              type="number" name="quantity3" id="quantity3" min={0}
            />
          </div>
        </div>
        <div className="stock-form">
          <div className="stock-form-size">
            <span>{selectedProduct?.stock[3].size || 'Tamanho não cadastrado'}</span>
          </div>
          <div className="stock-form-quantity">
            <label htmlFor="quantity4">Quantidade</label>
            <input
              {...register("quantity4")}
              type="number" name="quantity4" id="quantity4" min={0}
            />
          </div>
        </div>
        <div className="stock-btn">
          <button className="general-btn">Atualizar</button>
        </div>
      </form>
    </div>
  )
}