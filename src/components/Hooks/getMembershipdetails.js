import { useQuery } from "react-query";
import axios from "axios";
import { getToken } from "../../utils/token";

export const useFetchAllMembership = () => {
  const { data, error, isLoading, refetch } = useQuery(
    "membership",
    async () => {
      try {
        const response = await axios.get("membership/getallmembership", {
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

export const useCurrentUserPlan = () => {
  const { data, error, isLoading } = useQuery(
    "currentUserPlan",
    async () => {
      try {
        const response = await axios.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        return response.data.plan; // Assuming the response includes a "plan" field with the user's current plan
      } catch (error) {
        throw new Error(
          "Error fetching the current user's plan: " + error.message
        );
      }
    },
    {
      // This option ensures the query will not automatically retry on failure.
      // It's useful for sensitive operations like fetching user data.
      // Adjust according to your app's needs.
      retry: false,

      // This option can be set to stale time or enabled based on user's navigation/actions
      // For example, you might want to refetch the user's plan when they navigate to a specific part of your app
      // or after they've made a change to their subscription.
      refetchOnWindowFocus: false,
    }
  );

  return { data, error, isLoading };
};
