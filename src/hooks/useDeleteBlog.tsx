import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../config/config";

const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const queryOptions = {
    mutationKey: ["blogs"],
    mutationFn: async (id: string) => {
      const response = await axios.delete(`${config.apiBaseUrl}blogs/${id}`);
      if (!response) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  };
  return useMutation(queryOptions);
};

export default useDeleteBlog;
