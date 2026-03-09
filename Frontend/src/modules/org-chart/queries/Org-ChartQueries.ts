import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../apis/Org-ChartApis";

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["user-", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};