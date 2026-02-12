import { useMutation, useQuery} from "@tanstack/react-query";
import { loginApi,getAllTravelDetails, getTravelDetailsById } from "../Api/Axios";
 
 
export const useLogin = () => { 
  console.log("jiji")
          return useMutation({ 
                       mutationFn:loginApi, 
                         onSuccess: (response) => { 
                                console.log(response);
                           
                               // queryClient.invalidateQueries(['profile']
                         }
                        }
                      )};


    export const useGetAllTravel = () => { 
      return useQuery(
      { queryKey: ['travel'], queryFn: getAllTravelDetails 

      } 
    )}; 

     export const useGetTravelById = (id) => { 
      return useQuery(
      { queryKey: ['travel',id], queryFn:()=> getTravelDetailsById(id) , enabled: !!id,

      } 
      
    )}; 