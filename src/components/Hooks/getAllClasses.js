import { useQuery } from "react-query";
import axios from "axios";

export const useFetchAllClasses = () => {
  const { data, error, isLoading, refetch } = useQuery(
    "getClasses",
    async () => {
      try {
        const response = await axios.get("classes/allclasses");
        return response.data;
      } catch (error) {
        throw new Error("Error fetching users: " + error.message);
      }
    }
  );

  return { data, error, isLoading, refetch };
};
