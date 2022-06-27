import { AiOutlineBulb, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { useStyle } from "../../hooks/StyleContext";
import { MobileAuthMenu } from "../MobileAuthMenu";
import './style.css';

type MobileActionsProps = {
  isAuth: boolean;
  handleShowSignIn(): void;
  handleShowCart(): void;
  handleShowFav(): void;
}

export function MobileActions(
  {
    isAuth,
    handleShowSignIn,
    handleShowCart,
    handleShowFav
  }: MobileActionsProps) {
  const { theme, handleSexShop, handleRemoveSexShop, handleNight } = useStyle();
  return (
    <div className="mobile-actions">
    {
      isAuth ?
        <MobileAuthMenu /> :
        <button
          className="mob-login-btn header-btn"
          onClick={() => handleShowSignIn()}
        >
          <div className="login-btn-icon">
            <FaRegUser size={20} color={"var(--g12)"} />
          </div>
          <span>Login ou Cadastro</span>
        </button>
    }
    <button
      className="header-btn"
      onClick={() => handleShowCart()}
    >
      <div className="mob-header-icon">
        <AiOutlineShoppingCart size={25} color="var(--g1)" />
      </div>
    </button>
    <button
      className="header-btn"
      onClick={() => handleShowFav()}
    >
      <div className="mob-header-icon">
        <AiOutlineHeart size={25} color="var(--g1)" />
      </div>
    </button>
    <button onClick={handleNight} className="header-btn">
      <div className="mob-header-icon n-mode">
        <AiOutlineBulb size={25} color="var(--g1)" />
      </div>
    </button>
  </div>
  )
}