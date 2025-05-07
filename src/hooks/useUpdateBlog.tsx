import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../config/config";

type BlogData = {
  _id: string;
  title: string;
  author: string;
  description: string;
};

const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  const queryOptions = {
    mutationKey: ["blogs"],
    mutationFn: async (formData: BlogData) => {
      const response = await axios.put(`${config.apiBaseUrl}blogs`, formData);
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

export default useUpdateBlog;
