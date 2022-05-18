import { useContext, useState } from "react"
import { createContext, ReactNode, useEffect } from "react"
import { CartItemProps } from "../../components/CartItem";
import { FavItemProps } from "../../components/FavItem";

type ProductContextType = {
  cartItems: CartItemProps[];
  favItems: FavItemProps[];
  handleAddItemToCart(cartItem: CartItemProps): void;
  handleAddFavItem(favItem: FavItemProps): void;
}

type ProductContextProps = {
  children: ReactNode;
}

export const ProductContext = createContext({} as ProductContextType)

export function ProductContextProvider({ children }: ProductContextProps) {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [favItems, setFavItems] = useState<FavItemProps[]>([]);

  function getCartItems() {
    const cartData = JSON.parse(localStorage.getItem('cartItem') || '[]');
    cartData && setCartItems(cartData);
  }

  function getFavItems() {
    const favData = JSON.parse(localStorage.getItem('favItem') || '[]');
    favData && setFavItems(favData);
  }
  useEffect(() => {
    getCartItems();
    getFavItems();
  }, [cartItems, favItems]);

  function handleAddItemToCart(cartItem: CartItemProps) {
    const cartData = JSON.parse(localStorage.getItem('cartItem') || '[]');
    localStorage.setItem('cartItem', JSON.stringify([...cartData, cartItem]));
    alert("Item adicionado com sucesso!");
  }

  function handleAddFavItem(favItem: FavItemProps) {
    const favData = JSON.parse(localStorage.getItem('favItem') || '[]');
    localStorage.setItem('favItem', JSON.stringify([...favData, favItem]));
    alert("Item adicionado com sucesso!");
  }



  return (
    <ProductContext.Provider value={{ cartItems, favItems, handleAddItemToCart, handleAddFavItem }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  return useContext(ProductContext)
}