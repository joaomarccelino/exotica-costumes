import { useContext, useState } from "react"
import { createContext, ReactNode, useEffect } from "react"
import { CartItemProps } from "../../components/CartItem";
import { FavItemProps } from "../../components/FavItem";
import api from "../../services/api";

type Size = {
  size: number | string;
  quantity: number;
}

type UserAge = {
  validated: boolean;
}

type Comment = {
  id: string;
  idproduct: string;
  iduser: string;
  name: string;
  text: string;
  date: string;
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
  comments: Comment[];
}

type ProductContextType = {
  products: ProductProps[];
  selectedProduct: ProductProps;
  cartItems: CartItemProps[];
  favItems: FavItemProps[];
  handleAddItemToCart(cartItem: CartItemProps): void;
  handleAddFavItem(favItem: FavItemProps): void;
  handleUpdateCart(newItems: CartItemProps[]): void;
  handleUpdateFav(newItems: FavItemProps[]): void;
  handleFilterBySubCategory(subcategory: string): void;
  handleSetSelectedItem(item: ProductProps): void;
  handleGetLingerieItems(): void;
  handleGetSexShopItems(): void;
  handleDeleteItem(): void;
  handleInactivateItem(): void;
  getProducts(): void;
}

type ProductContextProps = {
  children: ReactNode;
}

export const ProductContext = createContext({} as ProductContextType)

export function ProductContextProvider({ children }: ProductContextProps) {
  const [validatedAge, setValidatedAge] = useState<UserAge>();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps>(products[0]);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [favItems, setFavItems] = useState<FavItemProps[]>([]);

  async function getProducts() {
    const response = await api.get('/product');
    const data = response.data.response.products;
    const filteredData = data.filter((item: ProductProps) => item.category === "Moda Íntima");
    setAllProducts(data);
    setProducts(filteredData);
  }

  async function getCartItems() {
    const cartData = await JSON.parse(localStorage.getItem('cartItem') || '[]');
    cartData && setCartItems(cartData);
  }

  async function getFavItems() {
    const favData = await JSON.parse(localStorage.getItem('favItem') || '[]');
    favData && setFavItems(favData);
  }
  useEffect(() => {
    getProducts();
    getCartItems();
    getFavItems();
  }, []);

  function handleAddItemToCart(cartItem: CartItemProps) {
    const cartData = JSON.parse(localStorage.getItem('cartItem') || '[]');
    localStorage.setItem('cartItem', JSON.stringify([...cartData, cartItem]));
    alert("Item adicionado ao carrinho!");
  }

  function handleUpdateCart(newItems: CartItemProps[]) {
    localStorage.setItem('cartItem', JSON.stringify(newItems));
    setCartItems(newItems);
  }

  function handleUpdateFav(newItems: FavItemProps[]) {
    localStorage.setItem('favItem', JSON.stringify(newItems));
    setFavItems(newItems);
    alert("Favorito removido!");
  }

  function handleAddFavItem(favItem: FavItemProps) {
    const favData = JSON.parse(localStorage.getItem('favItem') || '[]');
    localStorage.setItem('favItem', JSON.stringify([...favData, favItem]));
    alert("Favorito adicionado!");
  }

  function handleGetLingerieItems() {
    const linProducts = allProducts.filter(item => item.category === 'Moda Íntima');
    setProducts(linProducts);
  }

  function handleGetSexShopItems() {
    const sexShopProducts = allProducts.filter(item => item.category === 'SexShop');
    setProducts(sexShopProducts);
  }

  function handleFilterBySubCategory(subcategory: string) {
    const filterProducts = allProducts.filter(item => item.subcategory === subcategory);
    setProducts(filterProducts)
  }

  function handleSetSelectedItem(item: ProductProps) {
    setSelectedProduct(item);
    const stockModal = document.querySelector('.stock-modal-bg')
    stockModal?.classList.add('active');
  }

  function handleDeleteItem() {

  }

  function handleInactivateItem() {

  }

  return (
    <ProductContext.Provider
      value={
        {
          products,
          selectedProduct,
          cartItems,
          favItems,
          handleAddItemToCart,
          handleAddFavItem,
          handleUpdateCart,
          handleUpdateFav,
          handleFilterBySubCategory,
          handleSetSelectedItem,
          handleGetLingerieItems,
          handleGetSexShopItems,
          handleDeleteItem,
          handleInactivateItem,
          getProducts
        }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  return useContext(ProductContext)
}