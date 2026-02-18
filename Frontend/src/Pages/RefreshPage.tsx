import { useNavigate } from "react-router-dom";
import { useRefresh } from "../Query/useQueries";
import { useDispatch } from "react-redux";
import { setToken } from "../Store/tokenSlice";

function RefreshPage() {
  const navigator = useNavigate();
  const { isLoading, data, isError } = useRefresh();
  const dispatch = useDispatch();
  if (isError) {
    navigator("/login");
  }
  if (!isLoading && data?.data != null) {
    dispatch(setToken({ token: data.data.accessToken }));
    alert("Now you can contiue with last tab.");
    window.close();
    console.log(data.data.accessToken);
  }
  return <>Refresh</>;
}
export default RefreshPage;
