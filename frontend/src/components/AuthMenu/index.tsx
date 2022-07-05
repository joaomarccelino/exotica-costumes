import { AiOutlineLogout } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { useAuth } from "../../hooks/AuthContext";
import './styles.css';
export function AuthMenu() {
  const {user, handleSignOut} = useAuth();

  function handleShowSubMenu() {
    const cartModal = document.querySelector('.user-menu')
    cartModal?.classList.toggle('active');
  }
  return (
    <div>
      <button className="empty-btn login-btn" onClick={handleShowSubMenu}>
        <div className="login-btn-icon">
          <FaRegUser size={20} color={"var(--p2)"} />
        </div>
        <span>Olá {user.name}!</span>
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
            <button 
            onClick={handleSignOut}
            className="sign-out-btn empty-btn"
            >
              Sair
              <AiOutlineLogout color="#FF3333" size={20}   />
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}