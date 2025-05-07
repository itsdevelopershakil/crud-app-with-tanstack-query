import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../config/config";

type FormData = {
  title: string;
  author: string;
  description: string;
};

const useCreateBlog = () => {
  const queryClient = useQueryClient();

  const queryOptions = {
    mutationKey: ["blogs"],
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(`${config.apiBaseUrl}blogs`, formData);
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

export default useCreateBlog;
