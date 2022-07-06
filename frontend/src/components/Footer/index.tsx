import Logo from '../../assets/img/light-logo.svg';
import DarkLogo from '../../assets/img/dark-logo.svg';
import SexShopLogo from '../../assets/img/sexshop-logo.svg';

import { BsWhatsapp, BsInstagram, BsFacebook } from 'react-icons/bs';
import { CgMail } from 'react-icons/cg';

import './styles.css';
import { useStyle } from '../../hooks/StyleContext';

export function Footer() {

  const { theme } = useStyle();

  function handleLogo() {
    if (theme === 'dark') {
      return DarkLogo;
    } else if (theme === 'sexshop') {
      return SexShopLogo;
    } else {
      return Logo;
    }
  }
  return (
    <footer className="footer-bg">
      <div className="footer container">
        <div className="logo-copy">
          <a href="/"><img src={handleLogo()} alt="" /></a>
          <p>© 2022 Exótica Costumes. Todos direitos reservados.</p>
        </div>
        <div className="contact">
          <h3>Contato</h3>
          <div className="social-icons">
            <a href="https://www.whatsapp.com/" className="empty-btn">
              <BsWhatsapp size={24} color={"var(--p4)"} />
            </a>
            <a href="https://www.instagram.com/exoticacostumes/"  className="empty-btn">
              <BsInstagram size={24} color={"var(--p4)"} />
            </a>
            <a href="mailto:joao.marcelino.esc@gmail.com"  className="empty-btn">
              <CgMail size={24} color={"var(--p4)"} />
            </a>
            <a href="https://www.facebook.com/exotca.costumes"  className="empty-btn">
              <BsFacebook size={24} color={"var(--p4)"} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}