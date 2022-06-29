import { useContext, useState } from "react"
import { createContext, ReactNode, useEffect } from "react"
import { CartItemProps } from "../../components/CartItem";
import { FavItemProps } from "../../components/FavItem";
import api from "../../services/api";

type Size = {
  size: number | string;
  quantity: number;
}

type Evaluation = {
  id: string;
  by: string;
  on: string;
  text: string;
  like: boolean;
  dislike: boolean;
}

export type ProductProps = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  images: string[];
  description: string;
  price: number;
  stock: Size[];
  flagged?: boolean;
  evaluations: Evaluation[];
}

type ProductContextType = {
  products: ProductProps[];
  cartItems: CartItemProps[];
  favItems: FavItemProps[];
  handleAddItemToCart(cartItem: CartItemProps): void;
  handleAddFavItem(favItem: FavItemProps): void;
  handleUpdateCart(newItems: CartItemProps[]): void;
  handleFilterBySubCategory(subcategory: string): void;
}

type ProductContextProps = {
  children: ReactNode;
}

export const ProductContext = createContext({} as ProductContextType)

export function ProductContextProvider({ children }: ProductContextProps) {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [favItems, setFavItems] = useState<FavItemProps[]>([]);

  async function getProducts() {
    const response = await api.get('');
    const data = response.data.response.products;
    console.table(data);
    setProducts(data);
  }

  function getCartItems() {
    const cartData = JSON.parse(localStorage.getItem('cartItem') || '[]');
    cartData && setCartItems(cartData);
  }

  function getFavItems() {
    const favData = JSON.parse(localStorage.getItem('favItem') || '[]');
    favData && setFavItems(favData);
  }
  useEffect(() => {
    getProducts();
    getCartItems();
    getFavItems();
  }, []);

  function handleAddItemToCart(cartItem: CartItemProps) {
    console.log("Clicou");
    const cartData = JSON.parse(localStorage.getItem('cartItem') || '[]');
    localStorage.setItem('cartItem', JSON.stringify([...cartData, cartItem]));
    alert("Item adicionado com sucesso!");
  }

  function handleUpdateCart(newItems: CartItemProps[]) {
    localStorage.setItem('cartItem', JSON.stringify(newItems));
    const cartData = JSON.parse(localStorage.getItem('cartItem') || '[]');
    console.log(cartData);
    setCartItems(newItems);
  }

  function handleAddFavItem(favItem: FavItemProps) {
    const favData = JSON.parse(localStorage.getItem('favItem') || '[]');
    localStorage.setItem('favItem', JSON.stringify([...favData, favItem]));
    alert("Item adicionado com sucesso!");
  }

  function handleFilterBySubCategory(subcategory: string) {
    const filterProducts = products.filter(item => item.category == subcategory);
    console.log(filterProducts)
  }



  return (
    <ProductContext.Provider value={{ products, cartItems, favItems, handleAddItemToCart, handleAddFavItem, handleUpdateCart, handleFilterBySubCategory }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  return useContext(ProductContext)
}