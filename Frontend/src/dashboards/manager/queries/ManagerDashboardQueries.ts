import { useQuery } from "@tanstack/react-query";
import { getTeamMember } from "../apis/ManagerDashboardApis";

export const useGetTeamMember = () => {
  return useQuery({ queryKey: ["teamMember"], queryFn: getTeamMember });
};
