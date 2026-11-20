import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export default function UseProductsDetails(id) {
    const getProductsDetails=async()=>{
        const response=await axios.get(`https://knowledgeshop.runasp.net/api/Products/${id}`,
            {
                headers:{
                    "Accept-Language":"en"
                }
            }

        )      ;
        return response.data.response;
    }
  return useQuery({
    queryKey:["productD",id],
    queryFn:getProductsDetails,
    staleTime:1000*60*5,

  })
}