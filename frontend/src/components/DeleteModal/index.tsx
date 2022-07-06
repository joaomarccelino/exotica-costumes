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


export function DeleteModal() {
  const { token } = useAuth();
  const { deletedProduct } = useProducts();
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<SizeInputs>();
  const onSubmit: SubmitHandler<SizeInputs> = async data => {
    const newProduct = {
      productid: deletedProduct.id,
      name: deletedProduct.name,
      description: deletedProduct.description,
      category: deletedProduct.category,
      price: deletedProduct.price,
      status: 'INACTIVE'
    }

    const response = await api.patch(`${baseURL}/product`, JSON.stringify(newProduct), {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => {
        console.log(res)
        alert("Produto excluído!")
        reset()
        closeModal();
      })
  }

  function closeModal() {
    const modal = document.querySelector('.del-modal-bg')
    modal?.classList.remove('active');
  }

  return (
    <div className="del-modal-bg">
      <div className="del-modal">
        <h1>Apagar Produto</h1>
        <h2>{deletedProduct?.name}</h2>
        <img src={`${baseURL}/${deletedProduct.images[1]}`} alt="" />
        <div className="del-form">
          <form className="del-btn" onSubmit={handleSubmit(onSubmit)}>
            <button className="general-btn">Excluir</button>
          </form>
          <button
            className="close-button"
            onClick={() => closeModal()}
          >
            X
          </button>
        </div>
      </div>
    </div>
  )
}