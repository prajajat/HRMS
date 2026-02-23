import {
  Button,
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
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
     <div className="w-full  flex felx-row justify-center">
        <div>
    
      <form
        onSubmit={handleSubmit(onSubmit)}
       className="p-4 mt-4 rounded-lg bg-blue-100 w-full max-w-2xl space-y-4 flex flex-col"
      >  
        <Typography>Login</Typography>
        <br />
        
        <hr />
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
      </div>
  );
}
export default Login;
