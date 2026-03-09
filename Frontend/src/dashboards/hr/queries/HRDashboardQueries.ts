import { useQuery } from "@tanstack/react-query";
import { getHrDashboardInfo } from "../apis/HRDashboardApis";

export const useGetHrDashboardInfo = () => {
  return useQuery({ queryKey: ["Hr-Dashboard-info"], queryFn: getHrDashboardInfo });
};