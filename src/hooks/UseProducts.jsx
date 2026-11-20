import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getProducts = async () => {
  const response = await axios.get(
    "https://knowledgeshop.runasp.net/api/Products",
    {
      headers: {
        "Accept-Language": "en",
      },
    }
  );

  return response.data.response.data;
};

export const UseProducts = () => {
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["Products"],
    queryFn: getProducts,
    staleTime:1000*60*5,
  });

  return { products, productsLoading, productsError };
};
