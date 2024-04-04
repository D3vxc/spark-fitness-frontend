import { useQuery } from "react-query";
import axios from "axios";
import { getToken } from "../../utils/token"; // Adjust the import path according to your file structure

export const useFetchCurrentUser = () => {
  const { data, error, isLoading, refetch } = useQuery(
    "getCurrentUser",
    async () => {
      const token = getToken(); // Get the current user's token
      if (!token) {
        // return
        // (window.location.href = "/login"); // Redirect to login if token is not available
      }

      try {
        const response = await axios.get(`user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw new Error("Error fetching current user: " + error.message);
      }
    },
    {
      // This option prevents the query from automatically running if `token` is not available
      // It's useful for cases where you expect the user might not be authenticated yet
      enabled: !!getToken(), // This query will only run if getToken() returns a truthy value
    }
  );

  return { data, error, isLoading, refetch };
};
