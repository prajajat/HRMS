import { Button, List, ListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useGetNewNotificationCount } from "../queries/CommonQueries";
import { logout, setCount } from "../../Store/userSlice";
function Header() {
  const { userId, roles, imageUrl, notiicationCount, userName } = useSelector(
    (state) => state.user,
  );
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [profileHover, setProfileHover] = useState(false);
  const handleClick = () => {
    if (userId == -1) {
      navigator("/login");
    } else {
      dispatch(logout());
      dispatch(removeToken());
    }
  };

  const { isLoading, data, isError } = useGetNewNotificationCount();
  useEffect(() => {
    if (data != undefined) {
      dispatch(setCount({ notiicationCount: data?.data }));

      // console.log(data);
    }
  }, [data]);

  return (
    <div className="flex justify-between items-center bg-blue-400 w-full h-15 fixed top-0 right-0 left-0">
      <div className="text-Black-800 ml-10 font-bold rounded p-3 flex flex-row justify-start">
        <img src="/letter-r.png" height={30} width={30}></img>Roima HRMS
      </div>
      <div className="flex felx-row justify-end">
        <List className="flex felx-row">
          {roles.map((r) => {
            return (
              <ListItem key={r.roleId} onClick={() => navigator("/" + r.title)}>
                <Button sx={{ color: "#1c1c1f" }}>
                  {r.title + " dashboard"}
                </Button>
              </ListItem>
            );
          })}
        </List>

        {userId != -1 && (
          <>
            {/* <Button
              onClick={() => navigator("/org-chart/" + userId)}
              sx={{ color: "#1c1c1f" }}
            >
              Org. Chart
            </Button> */}
            <Button onClick={() => navigator("/notification/all")}>
              <img src="/bellBlack.png" className="h-6 w-6"></img>
              <div className="text-white mb-10 bg-green-700 rounded-full mt-3 w-5 h-5">
                {notiicationCount}
              </div>
            </Button>
          </>
        )}
        <div className="flex flex-col mt-10">
          <div
            onMouseEnter={() => setProfileHover(true)}
            onClick={() => setProfileHover(false)}
          >
            <img src={imageUrl} className="h-10 w-10"></img>
          </div>
          {profileHover && (
            <div className="sticky bg-blue-100  rounded-b-lg">
              <div className="flex flex-row justify-center w-full">
                <p>{userName}</p>
              </div>
              <hr />
              <Button onClick={handleClick}>
                {userId == -1 ? "login" : "logout"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;
