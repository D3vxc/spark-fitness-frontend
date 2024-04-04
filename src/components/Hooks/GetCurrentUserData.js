
import { useQuery } from "react-query";
import axios from "axios";
import token, { getToken } from "../../utils/token.js";

export const FetchUser = () => {
  console.log("Token here", getToken());
  const { data, error, isLoading, refetch } = useQuery("get-self", async () => {
    try {
      const response = await axios.get("user/get-self", {
        headers: {
         Authorization: ` Bearer ${getToken()}`,
        },
      });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      // It's good practice to log the error or handle it appropriately
      console.error("Error fetching user:", error);
      throw new Error("Error fetching user: " + error.message);
    }
  });

  return { data, error, isLoading, refetch };
};