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

export function SignModal() {
  const [newUser, setNewUser] = useState<boolean>(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignInputs>();
  const onSubmit: SubmitHandler<SignInputs> = data => console.log(data);
  function closeModal() {
    const modal = document.querySelector('.sign-bg')
    modal?.classList.remove('active');
  }
  return (
    <div className="sign-bg">
      <div className="sign-modal">
        <h1>{newUser ? 'Cadastro' : 'Login'}</h1>
        <form action="" className="sign-form">
          {newUser &&
            <>
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
                  <input type="text" {...register("phone", { required: true })}/>
                </div>
                <div>
                  <label htmlFor="">CPF</label>
                  <input type="text" {...register("cpf", { required: true })}/>
                </div>
              </div>
            </>
          }
          <label htmlFor="">E-mail</label>
          <input type="text" {...register("email", { required: true })}/>
          <label htmlFor="">Senha</label>
          <input type="password" {...register("password", { required: true })}/>
          {newUser &&
            <>
              <label htmlFor="">Confirme a senha</label>
              <input type="password" {...register("confirmPassword", { required: true })}/>
            </>
          }
        </form>
        <div className="sign-btn">
          <button className="general-btn">{newUser ? 'Cadastrar' : 'Entrar'}</button>
        </div>
        <p>{newUser ? 'Já tem cadastro? ' : 'Ainda não tem cadastro?'} <a onClick={() => { setNewUser(!newUser) }}>{newUser ? 'Clique aqui' : 'Entre aqui'}</a></p>
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