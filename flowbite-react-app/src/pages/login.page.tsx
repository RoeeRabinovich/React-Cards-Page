import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/login.joi";
import axios from "axios";
import { Button, FloatingLabel } from "flowbite-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userActions } from "../../store/userSlice";

// type FormData = {
//   email: string;
//   password: string;
// };

const Login = () => {
  const dispatch = useDispatch();
  const initialFormData = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(loginSchema),
  });

  const submitForm = async (form: typeof initialFormData) => {
    try {
      const token = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        form,
      );
      console.log(token.data);
      toast.success("Login Successful");

      //parsed token with atob
      const parsedToken = JSON.parse(atob(token.data.split(".")[1]));

      // get user data from token & set it in headers
      axios.defaults.headers.common["x-auth-token"] = token.data;

      // get user data from api
      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
          parsedToken._id,
      );
      //update user data
      dispatch(userActions.login(res.data));
    } catch (error) {
      console.log("Error submitting data", error);
      toast.error("Failed to Login.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">
      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">
        <FloatingLabel
          {...register("email")}
          variant="outlined"
          label="Email address"
          type="email"
          color={errors.email ? "error" : "success"}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <FloatingLabel
          {...register("password")}
          variant="outlined"
          label="Password"
          type="password"
          color={errors.password ? "error" : "success"}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <Button type="submit" className="w-full" disabled={!isValid}>
          Login
        </Button>
      </form>
    </main>
  );
};

export default Login;
