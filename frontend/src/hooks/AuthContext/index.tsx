import { useContext } from "react"
import { createContext, ReactNode, useEffect } from "react"
import { usePersistedState } from "../../utils/usePersistedState";

type AuthContextType = {
  theme: string;
  handleSexShop(): void;
  handleRemoveSexShop(): void;
  handleNight(): void;
}

type AuthContextProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function StyleContextProvider({ children }: AuthContextProps) {
  const [theme, setTheme] = usePersistedState<string>('theme', 'dark')

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
    <AuthContext.Provider value={{ theme, handleSexShop, handleRemoveSexShop, handleNight }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useStyle = () => {
  return useContext(AuthContext)
}