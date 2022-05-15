import { CartModal } from './components/CartModal';
import { FavModal } from './components/FavModal';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SignModal } from './components/SignModal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StyleContextProvider } from './hooks/StyleContext';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { Product } from './pages/Product';
import './global.css';

function App() {
  return (
    <>
      <StyleContextProvider>
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
        <SignModal />
        <CartModal />
        <FavModal />
        <Footer />
      </StyleContextProvider>
    </>
  );
}

export default App;
