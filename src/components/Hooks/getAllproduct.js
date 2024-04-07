import { useQuery } from "react-query";
import axios from "axios";
import { getToken } from "../../utils/token";

export const useFetchAllProduct = () => {
  // console.log("token here", getToken());
  const { data, error, isLoading, refetch } = useQuery("Product", async () => {
    try {
      const response = await axios.get("products/allproducts", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      // console.log("response", response);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  });

  return { data, error, isLoading, refetch };
};
