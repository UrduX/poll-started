import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

import axios from "axios";
import useAPI from "../hooks/useAPI";
import cookie from "js-cookie";

const AuthProvider = ({ children }) => {
  const API = useAPI();
  const [isAuth, setIsAuth] = useState(cookie.get("token") || null);

  const checkAuthAgain = async () => {
    const { data: connectionData } = await axios.get("https://ipapi.co/json/");
    const ip = connectionData.ip;
    const { data: authData } = await API.post("auth", { ip });
    cookie.set("token", authData.token);
  };

  useEffect(async () => {
    if (isAuth) return;
    const { data: connectionData } = await axios.get("https://ipapi.co/json/");
    const ip = connectionData.ip;
    const { data: authData } = await API.post("auth", { ip });
    if (authData.token) {
      setIsAuth(true);
      cookie.set("token", authData.token);
    } else setIsAuth(false);
  }, []);

  const providerValues = useMemo(() => [checkAuthAgain], [checkAuthAgain]);

  return (
    <AuthContext.Provider value={providerValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
