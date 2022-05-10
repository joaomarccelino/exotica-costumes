import Logo from '../../assets/img/light-logo.svg';
import DarkLogo from '../../assets/img/dark-logo.svg';
import Whats from '../../assets/img/whats.svg';
import Insta from '../../assets/img/insta.svg';
import Gmail from '../../assets/img/gmail.svg';
import Face from '../../assets/img/face.svg';
import './styles.css';

export function Footer() {
  return (
    <footer className="footer-bg">
      <div className="footer container">
        <div className="logo-copy">
          <a href=""><img src={Logo} alt="" /></a>
          <p>© 2022 Exótica Costumes. Todos direitos reservados.</p>
        </div>
        <div className="contact">
          <h3>Contato</h3>
          <div className="social-icons">
            <a href="">
              <img src={Whats} alt="Whatsapp" />
            </a>
            <a href="">
              <img src={Insta} alt="Instagram" />
            </a>
            <a href="">
              <img src={Gmail} alt="Gmail" />
            </a>
            <a href="">
              <img src={Face} alt="Facebook" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}