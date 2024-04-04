import { useQuery } from "react-query";
import axios from "axios";

export const useFetchAllUsers = () => {
  const { data, error, isLoading, refetch } = useQuery("getUsers", async () => {
    try {
      const response = await axios.get("user/getusers");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  });

  return { data, error, isLoading, refetch };
};
