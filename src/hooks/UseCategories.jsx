import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getCategories = async () => {
  const response = await axios.get(
    "https://knowledgeshop.runasp.net/api/Categories",
    {
      headers: {
        "Accept-Language": "en",
      },
    }
  );

  return response.data.response.data;
};

export const UseCategories = () => {
  const {
    data: data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
    staleTime:1000*60*5,
  });

  return { data, isLoading, isError };
};
 