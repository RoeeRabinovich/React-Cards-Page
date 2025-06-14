import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/login.joi";
import axios from "axios";
import { Button, FloatingLabel } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userActions } from "../../store/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TUser } from "../../store/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: TUser) => state.userSlice.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

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

      toast.success("Login Successful", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

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

      localStorage.setItem("token", token.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.log("Error submitting data", error);
      toast.error("Failed to Login.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-800">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-6 text-center shadow-md dark:bg-gray-900"
      >
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          Login to your account
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Please enter your email and password to login.
        </p>
        <FloatingLabel
          {...register("email")}
          variant="outlined"
          label="Email address"
          type="email"
          color={errors.email ? "error" : "default"}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <FloatingLabel
          {...register("password")}
          variant="outlined"
          label="Password"
          type="password"
          color={errors.password ? "error" : "default"}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <Button type="submit" className="w-full" disabled={!isValid}>
          Login
        </Button>
        <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
          Don't have an account?
        </p>
        <a
          href="/register"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Register here
        </a>
      </form>
    </main>
  );
};

export default Login;
