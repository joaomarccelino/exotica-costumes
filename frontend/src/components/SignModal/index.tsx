import { useState } from "react";
import { gender } from "../../utils/commonData";
import './styles.css';
export function SignModal() {
  const [newUser, setNewUser] = useState<boolean>(false);
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
              <input type="text" />
              <label htmlFor="">Gênero</label>
              <select name="" id="">
                <option value="" selected disabled hidden>Escolha um gênero</option>
                {gender.map(item =>
                  <option value={item}>{item}</option>
                )}
              </select>
              <div className="tel-cpf">
                <div>
                  <label htmlFor="">Telefone</label>
                  <input type="text" />
                </div>
                <div>
                  <label htmlFor="">CPF</label>
                  <input type="text" />
                </div>
              </div>
            </>
          }
          <label htmlFor="">E-mail</label>
          <input type="text" />
          <label htmlFor="">Senha</label>
          <input type="password" />
          {newUser &&
            <>
              <label htmlFor="">Confirme a senha</label>
              <input type="password" />
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