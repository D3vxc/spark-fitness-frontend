import Cookies from "js-cookie";

export const getToken = () => {
  const userToken = Cookies.get("token");
  if (!userToken) {
    window.location.href = "/login";
  }
  return userToken;
};
