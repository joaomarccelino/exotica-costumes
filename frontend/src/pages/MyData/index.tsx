import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Address, useAuth } from "../../hooks/AuthContext";
import { gender, brStates } from "../../utils/commonData";
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


export function MyData() {
  const { user } = useAuth();
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
      {
        (user.iduser !== undefined) &&
        <form action="" className="data-form">
          <label htmlFor="">Nome</label>
          <input type="text" defaultValue={user.name} {...register("name", { required: true },)} />
          <label htmlFor="">Gênero</label>
          <select defaultValue={user.gender} {...register("gender", { required: true })}>
            <option value="" selected disabled hidden>Escolha um gênero</option>
            {gender.map(item =>
              <option value={item}>{item}</option>
            )}
          </select>
          <div className="tel-cpf">
            <div>
              <label htmlFor="">Telefone</label>
              <input type="text" defaultValue={user.telephone} {...register("phone", { required: true })} />
            </div>
            <div>
              <label htmlFor="">CPF</label>
              <input type="text" defaultValue={user.cpf} {...register("cpf", { required: true })} />
            </div>
          </div>
          <label htmlFor="addressName">Nome do Endereço <small>Ex.(Casa)</small></label>
          <input type="text" defaultValue={user.address[0].name} {...register("address.name", { required: true })} />
          <label htmlFor="address">Endereço</label>
          <input type="text" defaultValue={user.address[0].address} {...register("address.address", { required: true })} />
          <label htmlFor="district">Bairro</label>
          <input type="text" defaultValue={user.address[0].district} {...register("address.district", { required: true })} />
          <label htmlFor="city">Cidade</label>
          <input type="text" defaultValue={user.address[0].city} {...register("address.city", { required: true })} />
          <label htmlFor="state">Estado</label>
          <select defaultValue={user.address[0].state} {...register("address.state", { required: true })} >
            <option value="" selected disabled hidden>Estado</option>
            {brStates.map((item, index) =>
              <option value={item} id={index.toString()}>{item}</option>
            )}
          </select>
          <label htmlFor="country">País</label>
          <input defaultValue={user.address[0].country} type="text" {...register("address.country", { required: true })} />
          <label htmlFor="cep">CEP</label>
          <input defaultValue={user.address[0].cep} type="text" {...register("address.cep", { required: true })} />

          <label htmlFor="">E-mail</label>
          <input type="text" defaultValue={user.email} {...register("email", { required: true })} />
          <label htmlFor="">Senha</label>
          <input type="password" defaultValue={user.pwd} {...register("password", { required: true })} />

          <label htmlFor="">Confirme a senha</label>
          <input type="password" {...register("confirmPassword", { required: true })} />
        </form>}
      <div className="my-data-btn">
        <button className="general-btn">
          Alterar
        </button>
      </div>
    </div>
  )
}