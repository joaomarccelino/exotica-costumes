import { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import InputMask from 'react-input-mask';
import { Address, useAuth } from "../../hooks/AuthContext";
import { brStates, gender } from "../../utils/commonData";
import './styles.css';

type SignInputs = {
  name: string;
  gender: string;
  phone: string;
  cpf: string;
  address: Address;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignModal() {
  const [newUser, setNewUser] = useState<boolean>(false);
  const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm<SignInputs>({ shouldUnregister: true });
  const { handleLogin, handleRegister } = useAuth();

  function sendLogin(data: SignInputs) {
    const newLogin = {
      email: data.email,
      pwd: data.password
    }
    handleLogin(newLogin);
    closeModal();
  }

  function sendRegister(data: SignInputs) {
    const newRegister = {
      email: data.email,
      pwd: data.password,
      name: data.name,
      gender: data.gender,
      telephone: data.phone,
      cpf: data.cpf,
      status: 'ACTIVE',
      address: { ...data.address, status: 'ACTIVE' }
    }
    handleRegister(newRegister);
    closeModal();
    reset();

  }

  const onSubmit: SubmitHandler<SignInputs> = async data => {
    newUser ? sendRegister(data) : sendLogin(data);
  };
  function closeModal() {
    const modal = document.querySelector('.sign-bg')
    modal?.classList.remove('active');
  }
  return (
    <div className="sign-bg">
      <div className="sign-modal">
        <h1>{newUser ? 'Cadastro' : 'Login'}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="sign-form">
          {newUser &&
            <>
              <label htmlFor="">Nome</label>
              <input type="text" {...register("name", { required: true })} />
              <label htmlFor="">Gênero</label>
              <select {...register("gender", { required: true })}>
                <option value="" selected disabled hidden>Escolha um gênero</option>
                {gender.map((item, index) =>
                  <option value={item} id={index.toString()}>{item}</option>
                )}
              </select>
              <div className="tel-cpf">
                <div>
                  <label htmlFor="phone">Telefone</label>
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, onBlur, ref } }) => (
                      <InputMask
                        mask="(99)99999-9999"
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={ref}
                      />
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="cpf">CPF</label>
                  <Controller
                    control={control}
                    name="cpf"
                    render={({ field: { onChange, onBlur, ref } }) => (
                      <InputMask
                        mask="999.999.999-99"
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={ref}
                      />
                    )}
                  />
                </div>
              </div>
              <label htmlFor="addressName">Nome do Endereço <small>Ex.(Casa)</small></label>
              <input type="text" {...register("address.name", { required: true })} />
              <label htmlFor="address">Endereço</label>
              <input type="text" {...register("address.address", { required: true })} />
              <label htmlFor="district">Bairro</label>
              <input type="text" {...register("address.district", { required: true })} />
              <label htmlFor="city">Cidade</label>
              <input type="text" {...register("address.city", { required: true })} />
              <label htmlFor="state">Estado</label>
              <select {...register("address.state", { required: true })} >
                <option value="" selected disabled hidden>Estado</option>
                {brStates.map((item, index) =>
                  <option value={item} id={index.toString()}>{item}</option>
                )}
              </select>
              <label htmlFor="country">País</label>
              <input type="text" {...register("address.country", { required: true })} />
              <label htmlFor="cep">CEP</label>
              <input type="text" {...register("address.cep", { required: true })} />
            </>
          }
          <label htmlFor="email">E-mail</label>
          <input type="text" {...register("email", { required: true })} />
          <label htmlFor="password">Senha</label>
          <input type="password" {...register("password", { required: true })} />
          {newUser &&
            <>
              <label htmlFor="confirmPassword">Confirme a senha</label>
              <input type="password" {...register("confirmPassword", { required: true })} />
            </>
          }
          <div className="sign-btn">
            <button className="general-btn">{newUser ? 'Cadastrar' : 'Entrar'}</button>
          </div>
        </form>
        <p className="set-new-sign">{newUser ? 'Já tem cadastro? ' : 'Ainda não tem cadastro?'} <a onClick={() => { setNewUser(!newUser) }}>{newUser ? 'Clique aqui' : 'Entre aqui'}</a></p>
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