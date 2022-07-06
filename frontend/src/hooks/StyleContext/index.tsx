import { useContext } from "react"
import { createContext, ReactNode, useEffect } from "react"
import { usePersistedState } from "../../utils/usePersistedState";
import { useProducts } from "../ProductContext";

type SwitchContextType = {
  theme: string;
  handleSexShop(): void;
  handleRemoveSexShop(): void;
  handleNight(): void;
}

type SwitchContextProps = {
  children: ReactNode;
}

export const StyleContext = createContext({} as SwitchContextType)

export function StyleContextProvider({ children }: SwitchContextProps) {
  const [theme, setTheme] = usePersistedState<string>('theme', 'dark')
  const {handleGetLingerieItems} = useProducts();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('sexshop')
    } else if (theme === 'sexshop') {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.add('sexshop')
    }
    else {
      document.documentElement.classList.remove('dark-mode')
      document.documentElement.classList.remove('sexshop')
    }
  }, [theme])

  function handleSexShop() {
    setTheme(theme === 'dark' ? 'sexshop' : 'dark');
  }

  function handleRemoveSexShop() {
    setTheme(theme === 'sexshop' ? 'dark' : 'sexshop');
    handleGetLingerieItems()
  }

  function handleNight() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setTheme(theme === 'sexshop' ? 'light' : 'dark');
    if (theme ==='dark' || theme === 'sexshop') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  return (
    <StyleContext.Provider value={{ theme, handleSexShop, handleRemoveSexShop, handleNight }}>
      {children}
    </StyleContext.Provider>
  )
}

export const useStyle = () => {
  return useContext(StyleContext)
}