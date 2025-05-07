import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../config/config";

const useGetSingleBlog = (id: string) => {
  console.log(id);
  const queryOptions = {
    queryKey: ["blogs", id],
    queryFn: async () => {
      const response = await axios.get(`${config.apiBaseUrl}blogs/${id}`);
      if (!response) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
    enabled: !!id,
  };
  return useQuery(queryOptions);
};

export default useGetSingleBlog;
