import axios from "axios";
import cookie from "js-cookie";
export default function useApi() {
  const token = cookie.get("token") || null;
  return axios.create({
    baseURL: `${process.env.WEB_URL + "/api/"}`,
    headers: { token },
  });
}
