import { useQuery } from "react-query";
import axios from "axios";
import { getToken } from "../../utils/token";

export const useFetchCart = () => {
  const { data, error, isLoading, refetch } = useQuery("cart", async () => {
    try {
      const response = await axios.get("cart/getCarts", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Error fetching cart data: " + error.message);
    }
  });
  return { data, error, isLoading, refetch };
};

export const useAddToCart = (productId, quantity) => {
  const { data, error, isLoading, refetch } = useQuery(
    "addToCart",
    async () => {
      try {
        const response = await axios.post(
          "cart/addToCart",
          {
            productId,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error("Error fetching cart data: " + error.message);
      }
    }
  );
  return { data, error, isLoading, refetch };
};
