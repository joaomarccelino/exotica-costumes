import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { gender } from "../../utils/commonData";
import './styles.css';
type SignInputs = {
  name: string;
  gender: string;
  phone: string;
  cpf: string;
  email: string;
  password: string;
  confirmPassword: string;
}


export function MyData() {
  const [newUser, setNewUser] = useState<boolean>(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignInputs>();
  const onSubmit: SubmitHandler<SignInputs> = data => console.log(data);
  function closeModal() {
    const modal = document.querySelector('.sign-bg')
    modal?.classList.remove('active');
  }
  return (
    <div className="container my-data">
      <h1>Alterar/Consultar meus dados</h1>
      <form action="" className="data-form">
        <label htmlFor="">Nome</label>
        <input type="text" {...register("name", { required: true })} />
        <label htmlFor="">Gênero</label>
        <select {...register("gender", { required: true })}>
          <option value="" selected disabled hidden>Escolha um gênero</option>
          {gender.map(item =>
            <option value={item}>{item}</option>
          )}
        </select>
        <div className="tel-cpf">
          <div>
            <label htmlFor="">Telefone</label>
            <input type="text" {...register("phone", { required: true })} />
          </div>
          <div>
            <label htmlFor="">CPF</label>
            <input type="text" {...register("cpf", { required: true })} />
          </div>
        </div>

        <label htmlFor="">E-mail</label>
        <input type="text" {...register("email", { required: true })} />
        <label htmlFor="">Senha</label>
        <input type="password" {...register("password", { required: true })} />

        <label htmlFor="">Confirme a senha</label>
        <input type="password" {...register("confirmPassword", { required: true })} />

      </form>
      <div className="my-data-btn">
        <button className="general-btn">
          Alterar
        </button>
      </div>
    </div>
  )
}