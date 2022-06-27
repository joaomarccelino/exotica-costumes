import { AiOutlineLogout } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import './styles.css';
export function MobileAuthMenu() {
  function handleShowSubMenu() {
    const cartModal = document.querySelector('.user-menu')
    cartModal?.classList.toggle('active');
  }
  return (
    <div>
      <button className="empty-btn mob-login-btn" onClick={handleShowSubMenu}>
        <div className="mob-login-btn-icon">
          <FaRegUser size={20} color={"var(--g1)"} />
        </div>
        <span>Olá João!</span>
      </button>
      <div className="user-menu">
        <ul>
          <li>
            <a href="/meus-dados">
              Meus dados
            </a>
          </li>
          <li>
            <a href="/pedidos">
              Meus pedidos
            </a>
          </li>
          <li>
            <button className="sign-out-btn empty-btn">
              Sair
              <AiOutlineLogout color="#FF3333" size={20}   />
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}