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
    
        <div className="flex justify-between items-center bg-gray-300 ">
          <div>Roima HRMS{userId}</div>
          <div className="flex felx-row justify-end">
            <List className="flex felx-row">
              {roles.map((r) => {
                return (
                  <ListItem
                    key={r.roleId}
                    onClick={() => navigator("/" + r.title)}
                  >
                    <Button>{r.title + " dashboard"}</Button>
                  </ListItem>
                );
              })}
            </List>
            <Button onClick={handleClick}>
              {userId == -1 ? "login" : "logout"}
            </Button>
          </div>
        </div>
      
  );
}
export default Header;
