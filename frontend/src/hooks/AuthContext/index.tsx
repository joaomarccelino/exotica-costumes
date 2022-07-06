import { useContext, useState } from "react"
import { createContext, ReactNode, useEffect } from "react"
import api from "../../services/api";
import { baseURL } from "../../utils/commonData";

export type Address = {
  idaddress?: number;
  name: string;
  address: string;
  district: string;
  city: string;
  state: string;
  country: string;
  cep: string;
  status: string;
}

type User = {
  iduser?: number;
  email: string;
  pwd: string;
  name: string;
  gender: string;
  telephone: string;
  cpf: string;
  status: string;
  address: Address[];
}

type RegisterUser = {
  iduser?: number;
  email: string;
  pwd: string;
  name: string;
  gender: string;
  telephone: string;
  cpf: string;
  status: string;
  address: Address;
}

type Login = {
  email: string;
  pwd: string;
}

type AuthContextType = {
  user: User;
  token: string;
  handleLogin(login: Login): void;
  handleRegister(user: RegisterUser): void;
  handleSignOut(): void;
}

type AuthContextProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProps) {
  const TOKEN_KEY = "@exotica-Token";
  const [user, setUser] = useState<User>({} as User);
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function handleLogin(login: Login) {
    const response = await api.post(`${baseURL}/user/login`, JSON.stringify(login), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setToken(res.data.token);
      setUser(res.data.user[0]);
      localStorage.setItem(TOKEN_KEY, JSON.stringify(res.data.token));
      localStorage.setItem('user', JSON.stringify(res.data.user[0]));
      alert("Logado(a) com sucesso!")
    }).catch(e => alert(e));
  }

  async function handleRegister(user: RegisterUser) {
    console.log(user);
    const response = await api.post(`${baseURL}/user`, JSON.stringify(user), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      alert("Cadastrado(a) com sucesso!")
    })
  }
  async function handleCheckLogin() {
    setLoading(true);
    const userData = await JSON.parse(localStorage.getItem('user') || '[]');
    const tokenData = await JSON.parse(localStorage.getItem(TOKEN_KEY) || '[]')
    userData && setUser(userData);
    tokenData && setToken(tokenData);
    setLoading(false);
  }

  function getUser() {
    const userData = JSON.parse(localStorage.getItem('user') || '[]');
    userData && setUser(userData);
  }


  async function handleSignOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('user')
    setUser({} as User)
    setToken('')
    alert("Você saiu!")
  }

  useEffect(() => {
    handleCheckLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, handleLogin, handleRegister, handleSignOut }}>
      {
        loading ?
          <h1>Carregando</h1> :
          children
      }
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}