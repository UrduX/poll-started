import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { io } from "socket.io-client";
import cookie from "js-cookie";
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const token = cookie.get("token") || null;
  useEffect(() => {
    const newSocket = io(`${process.env.WEB_URL + "/poll"}`, {
      reconnection: true,
      reconnectionDelay: 1000,
      query: { token },
    });
    setSocket(newSocket);
    newSocket.connect();
    // return () => newSocket.close();
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
