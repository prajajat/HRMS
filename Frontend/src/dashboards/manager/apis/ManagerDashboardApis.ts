import { instance } from "../../../Api/Axios";

export const getTeamMember = async () =>
  await instance.get("/api/user/team-members").then((res) => res);