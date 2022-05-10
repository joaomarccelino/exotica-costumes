import { Footer } from './components/Footer';
import { Header } from './components/Header';
import './global.css';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { Product } from './pages/Product';

function App() {
  return (
    <>
      <Header />
      <Cart />
      <Footer />
    </>
  );
}

export default App;
