import { Button, List, ListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Store/userSlice";
import { removeToken } from "../Store/tokenSlice";

function Header() {
  const { userId, roles } = useSelector((state) => state.user);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    if (userId == -1) {
      navigator("/login");
    } else {
      dispatch(logout());
      dispatch(removeToken());
    }
  };

  return (
    <div className="flex justify-between items-center bg-blue-400 w-full ">
      <div className="text-black-600">Roima HRMS</div>
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
            <Button
              onClick={() => navigator("/org-chart/" + userId)}
              sx={{ color: "#1c1c1f" }}
            >
              Org. Chart
            </Button>
            <Button onClick={() => navigator("/notification/all")}>
              <img src="/bellBlack.png" className="h-8 w-8"></img>
            </Button>
          </>
        )}
        <Button onClick={handleClick} sx={{ color: "#1c1c1f" }}>
          {userId == -1 ? "login" : "logout"}
        </Button>
      </div>
    </div>
  );
}
export default Header;
