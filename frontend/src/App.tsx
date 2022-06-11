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
import { ProductContextProvider } from './hooks/ProductContext';
import { MyOrders } from './pages/MyOrders';
import { MyData } from './pages/MyData';

function App() {
  return (
    <>
      <ProductContextProvider>
        <StyleContextProvider>
          <Header />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<Product />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/pedidos" element={<MyOrders />} />
              <Route path="/meus-dados" element={<MyData />} />
            </Routes>
          </Router>
          <SignModal />
          <CartModal />
          <FavModal />
          <Footer />
        </StyleContextProvider>
      </ProductContextProvider>
    </>
  );
}

export default App;
