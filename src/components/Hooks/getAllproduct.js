import { useQuery } from "react-query";
import axios from "axios";
import { getToken } from "../../utils/token";

export const useFetchAllProduct = () => {
  const { data, error, isLoading, refetch } = useQuery(
    "allProducts",
    async () => {
      try {
        const response = await axios.get("products/allproducts", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        return response.data;
      } catch (error) {
        throw new Error("Error fetching users: " + error.message);
      }
    }
  );

  return { data, error, isLoading, refetch };
};
