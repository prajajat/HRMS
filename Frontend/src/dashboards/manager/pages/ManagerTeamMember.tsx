import { useNavigate } from "react-router-dom";
import { useGetTeamMember } from "../queries/ManagerDashboardQueries";

import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

function ManagerTeamMember() {
   
  const {isLoading: isLoadingAll, data: dataAll, isError: isErrorAll} = useGetTeamMember();

  const navigator = useNavigate();

  return (
    <div className="p-4  bg-gray-100">
      {isLoadingAll ? (
        <div className="flex justify-center py-3">
          <CircularProgress size="small" />
        </div>
      ) : isErrorAll ? (
                  <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
                    <p className="text-red-600">
                      Failed to load 
                    </p>
                  </div>
                ):(
        <div> 
           
               
          <Typography fontSize={36}>Your Team</Typography>
          <hr />
          <br />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {dataAll?.data?.map((user) => (
              <Card
                sx={{
                  maxWidth: 200,
                  backgroundColor: "#94b5ee",
                  margin: 5,
                }}
                key={user.userId}
              >
                <div className="flex flex-row justify-center w-full">
                  <img src={user.imageUrl} className="h-10 w-10 m-2"></img>
                </div>

                <CardContent>
                  <div className="flex flex-row justify-center w-full">
                    <Typography gutterBottom variant="h5" component="div">
                      {user.name.toUpperCase()}
                    </Typography>
                  </div>
                  <hr />
                  <Typography
                    sx={{ fontSize: 18, mb: 1.5 }}
                    variant="h5"
                    color="text.secondary"
                  >
                    {user.companyEmail}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, mb: 1.5 }}
                    variant="h5"
                    color="text.secondary"
                  >
                    {" "}
                    Designation :{user.designation}
                  </Typography>

                  <Typography
                    sx={{ fontSize: 18, mb: 1.5 }}
                    variant="h5"
                    color="text.secondary"
                  >
                    Dept :{user.departmentName}
                  </Typography>
                </CardContent>
                <Button
                  onClick={() =>
                    navigator(
                      "/employee/achievement/posts?employee=" + user.name,
                    )
                  }
                >
                  View Achievements
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default ManagerTeamMember;
