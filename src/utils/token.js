import Cookies from "js-cookie";

export const getToken = () => {
  const userToken = Cookies.get("token");
  console.log("userToken", userToken);
  if (!userToken) {
    // window.location.href = "/login";
  }
  return userToken;
};
