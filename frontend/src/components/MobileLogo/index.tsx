import WhiteLogo from '../../assets/img/white-logo.svg';
import BlackLogo from '../../assets/img/black-logo.svg';
import { useStyle } from '../../hooks/StyleContext';

export function MobileLogo() {  
  const { theme } = useStyle();
  function handleLogo() {
    if (theme === 'dark') {
      return BlackLogo;
    } else if (theme === 'sexshop') {
      return BlackLogo;
    } else {
      return WhiteLogo;
    }
  }
  return (
    <a href="/" className="mobile-logo">
      <img src={handleLogo()} alt="Exótica" />
    </a>
  )
}