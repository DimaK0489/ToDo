import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "../api/instance";

export const useAuthMe = () => {
  return useQuery({
    queryKey: ["authMe"],
    queryFn: async () => {
      const response = await AuthAPI.authMe();
      return response.data;
    },
    enabled: !!localStorage.getItem("token"),
    retry: false,
  });
};
