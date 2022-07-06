import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../hooks/AuthContext";
import { useProducts } from "../../hooks/ProductContext";
import api from "../../services/api";
import { baseURL } from "../../utils/commonData";
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
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<SizeInputs>();
  const onSubmit: SubmitHandler<SizeInputs> = async data => {
    const newStock = {
      idproduct: selectedProduct.id,
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

    const response = await api.patch(`${baseURL}/product/stock`, JSON.stringify(newStock), {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => { 
        console.log(res)
        alert("Estoque atualizado!")
        reset()
        closeModal();
       })
  }

  function closeModal() {
    const modal = document.querySelector('.stock-modal-bg')
    modal?.classList.remove('active');
  }

  return (
    <div className="stock-modal-bg">
      <div className="stock-modal">
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
              defaultValue={selectedProduct?.stock[0].quantity}
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
              defaultValue={selectedProduct?.stock[1].quantity}
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
              defaultValue={selectedProduct?.stock[2].quantity}
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
              defaultValue={selectedProduct?.stock[3].quantity}
              type="number" name="quantity4" id="quantity4" min={0}
            />
          </div>
        </div>
        <form className="stock-btn" onSubmit={handleSubmit(onSubmit)}>
          <button className="general-btn">Atualizar</button>
        </form>
        <button
          className="close-button"
          onClick={() => closeModal()}
        >
          X
        </button>
      </div>
    </div>
  )
}