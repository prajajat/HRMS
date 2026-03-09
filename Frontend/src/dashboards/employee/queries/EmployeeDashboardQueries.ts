import { useQuery } from "@tanstack/react-query";
import { getEmpDashboardInfo } from "../apis/EmployeeDashboardApis";
 

export const useGetEmpDashboardInfo = () => {
  return useQuery({ queryKey: ["emp-Dashboard-info"], queryFn: getEmpDashboardInfo });
};