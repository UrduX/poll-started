import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import cookie from "js-cookie";
import dynamic from "next/dynamic";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const token = cookie.get("token") || null;
  useEffect(() => {
    const newSocket = io(`${process.env.WEB_URL + "/poll"}`, {
      query: { token },
    });
    newSocket.connect();
    setSocket(newSocket);
    // return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// export const SocketProvider = dynamic(async () => await Provider);

export const useSocket = () => useContext(SocketContext);
