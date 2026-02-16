import {
  Button,
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useLogin } from "../Query/useQueries";
import { useForm } from "react-hook-form";
import { setToken } from "../Store/tokenSlice";
import { login } from "../Store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Login() {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });

  const { mutate, isPending, isError, error } = useLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data: any) => {
    console.log(data);
    mutate(data, {
      onSuccess: (response: any) => {
        console.log("Login successful:", response.data);
        dispatch(
          login({
            userId: response.data.userId,
            roles: response.data.roles,
          }),
        );
        if (response.data.accessToken != null) {
          console.log("new token");
          dispatch(setToken({ token: response.data.accessToken }));
        }
        navigate("/");
      },
    });
  };
  return (
    <div className="w-100 align-middle flex flex-row justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  border p-20 rounded-lg "
      >
        <FormControl>
          <InputLabel htmlFor="my-input">Email address </InputLabel>
          <Input
            type="text"
            className="mt-10 mb-10 "
            {...register("email", {
              required: "Please enter mail",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Password</InputLabel>
          <Input
            type="password"
            className="mt-10 mb-10"
            {...register("password", {
              required: "Please enter password.",
              validate: (value) =>
                /[0-9]/.test(value) || "Must contain at least one digit",
            })}
          />
        </FormControl>
        <Button type="submit">{isPending ? "submiting..." : "login"}</Button>
        {isError && (
          <p style={{ color: "red" }}>
            {/* {error?.response?.data?.message || 'Login failed'} */}
          </p>
        )}
      </form>
    </div>
  );
}
export default Login;
