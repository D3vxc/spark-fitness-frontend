import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { getToken } from "../../utils/token";

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  const updateCart = useMutation(
    async ({ productId, quantity }) => {
      const response = await axios.post(
        "/cart/updateCart",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Cart");
      },
    }
  );

  return updateCart;
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  const removeItem = useMutation(
    async (productId) => {
      const response = await axios.delete("/cart/removeFromCart", {
        data: { productId },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Cart");
      },
    }
  );

  return removeItem;
};
