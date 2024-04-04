import { useQuery } from "react-query";
import axios from "axios";

export const useFetchAllProduct = () => {
  const { data, error, isLoading, refetch } = useQuery("allProducts", 
  async () => {
    try {
      const response = await axios.get("products/allproducts");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  });


  return { data, error, isLoading, refetch };
};
