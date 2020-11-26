import axios from "axios";
import cookie from "js-cookie";
export default function useApi() {
  const token = cookie.get("token") || null;
  return axios.create({
    baseURL: "http://localhost:3000/api/",
    headers: { token },
  });
}
