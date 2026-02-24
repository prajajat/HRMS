import { useNavigate, useParams } from "react-router-dom";
import {
  useGetALLUser,
  useGetTeamMember,
  useGetUserById,
} from "../Query/useQueries";
import ChartCard from "../Components/ChartCard";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";

function ManagerTeamMember() {
  const navigator = useNavigate();

  const {
    isLoading: isLoadingAll,
    data: dataAll,
    isError: isErrorAll,
  } = useGetTeamMember();

  return (
    <div className="p-4  bg-gray-100">
      {isLoadingAll ? (
        <div className="flex justify-center py-3">
          <CircularProgress size="small" />
        </div>
      ) : (
        <div>
          <Typography fontSize={36}>Your Team</Typography>
          <hr />
          <br />
          <div className="mb-4 max-w-xs">
            {dataAll?.data?.map((user) => (
              <Card
                sx={{
                  maxWidth: 200,
                  maxHeight: 280,
                  backgroundColor: blue,
                  margin: 5,
                }}
              >
                <img src={user.imageUrl} className="h-10 w-10"></img>

                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {user.name}
                  </Typography>
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
