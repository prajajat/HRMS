 import{ Button ,Input,InputLabel,FormControl, FormHelperText} from '@mui/material'
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {login} from '../Api/Axios'

function Login (){
   const mutation = useMutation({
    mutationFn: (data) => {
      return login(data);
    },
  })
    const { register, handleSubmit } = useForm({
                                              shouldUseNativeValidation: true,
                                            })
  const onSubmit = async (loginData: any) => {
    console.log(loginData);
    mutation.mutate(loginData);
  }
    return (
     <div> 
     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full md:w-auto border " >
       
       <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input type="text"  className='mt-10 mb-10 '
        {...register("email", {
          required: "Please enter mail",
          pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",}
        })}  
      />
     </FormControl>
    <FormControl>
        <InputLabel htmlFor="my-input">Password</InputLabel>
        <Input type="password"  className='mt-10 mb-10'
        {...register("password", {
          required: "Please enter password.",
          validate: (value) =>
                /[0-9]/.test(value) || "Must contain at least one digit",
        })}  
      />
     </FormControl>
      <Button type="submit" >login</Button>
    </form>

     </div>
    
    );
}
export default Login;