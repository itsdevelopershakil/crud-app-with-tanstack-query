import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../config/config";

const useGetAllBlogs = () => {
  const queryOptions = {
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axios(config.apiBaseUrl + "blogs");
      if (!response) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  };
  return useQuery(queryOptions);
};

export default useGetAllBlogs;
