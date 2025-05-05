import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { registerSchema } from "../validations/register.joi";
import axios from "axios";
import { Button, Checkbox, FloatingLabel } from "flowbite-react";

type RegisterData = {
  name: {
    first: string;
    middle: string;
    last: string;
  };
  phone: string;
  email: string;
  password: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  isBusiness: boolean;
  isAdmin: boolean;
};
const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<RegisterData>({
    defaultValues: {
      name: {
        first: "",
        middle: "",
        last: "",
      },
      phone: "",
      email: "",
      password: "",
      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: 0,
        zip: 0,
      },
      isBusiness: false,
      isAdmin: false,
    },
    mode: "onChange",
    resolver: joiResolver(registerSchema),
  });

  const submitForm = async (data: RegisterData) => {
    console.log("Form submitted", data);
    try {
      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        data,
      );
      console.log("Registered Successfuly");
    } catch (error) {
      console.log("Error registering data", error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 dark:bg-gray-800">
      <form
        className="flex w-full max-w-4xl flex-col gap-6 rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800 dark:text-white">
          Register
        </h1>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {/* First Name */}
          <div>
            <FloatingLabel
              {...register("name.first")}
              variant="outlined"
              label="First Name"
              type="text"
              color={errors.name?.first ? "error" : "success"}
            />
            {errors.name?.first && (
              <p className="text-xs text-red-500">
                {errors.name?.first.message}
              </p>
            )}
          </div>

          {/* Middle Name */}
          <div>
            <FloatingLabel
              {...register("name.middle")}
              variant="outlined"
              label="Middle Name"
              type="text"
              color={errors.name?.middle ? "error" : "success"}
            />
            {errors.name?.middle && (
              <p className="text-xs text-red-500">
                {errors.name?.middle.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <FloatingLabel
              {...register("name.last")}
              variant="outlined"
              label="Last Name"
              type="text"
              color={errors.name?.last ? "error" : "success"}
            />
            {errors.name?.last && (
              <p className="text-xs text-red-500">
                {errors.name?.last.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <FloatingLabel
              {...register("email")}
              variant="outlined"
              label="Email Address"
              type="email"
              color={errors.email ? "error" : "success"}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <FloatingLabel
              {...register("password")}
              variant="outlined"
              label="Password"
              type="password"
              color={errors.password ? "error" : "success"}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <FloatingLabel
              {...register("phone")}
              variant="outlined"
              label="Phone Number"
              type="number"
              color={errors.phone ? "error" : "success"}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <FloatingLabel
              {...register("image.url")}
              variant="outlined"
              label="Image URL"
              type="text"
              color={errors.image?.url ? "error" : "success"}
            />
            {errors.image?.url && (
              <p className="text-xs text-red-500">
                {errors.image?.url.message}
              </p>
            )}
          </div>

          {/* Image Alt */}
          <div>
            <FloatingLabel
              {...register("image.alt")}
              variant="outlined"
              label="Image Alt"
              type="text"
              color={errors.image?.alt ? "error" : "success"}
            />
            {errors.image?.alt && (
              <p className="text-xs text-red-500">
                {errors.image?.alt.message}
              </p>
            )}
          </div>

          {/* State */}
          <div>
            <FloatingLabel
              {...register("address.state")}
              variant="outlined"
              label="State"
              type="text"
              color={errors.address?.state ? "error" : "success"}
            />
            {errors.address?.state && (
              <p className="text-xs text-red-500">
                {errors.address?.state.message}
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <FloatingLabel
              {...register("address.country")}
              variant="outlined"
              label="Country"
              type="text"
              color={errors.address?.country ? "error" : "success"}
            />
            {errors.address?.country && (
              <p className="text-xs text-red-500">
                {errors.address?.country.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <FloatingLabel
              {...register("address.city")}
              variant="outlined"
              label="City"
              type="text"
              color={errors.address?.city ? "error" : "success"}
            />
            {errors.address?.city && (
              <p className="text-xs text-red-500">
                {errors.address?.city.message}
              </p>
            )}
          </div>

          {/* Street */}
          <div>
            <FloatingLabel
              {...register("address.street")}
              variant="outlined"
              label="Street"
              type="text"
              color={errors.address?.street ? "error" : "success"}
            />
            {errors.address?.street && (
              <p className="text-xs text-red-500">
                {errors.address?.street.message}
              </p>
            )}
          </div>

          {/* House Number */}
          <div>
            <FloatingLabel
              {...register("address.houseNumber")}
              variant="outlined"
              label="House Number"
              type="number"
              color={errors.address?.houseNumber ? "error" : "success"}
            />
            {errors.address?.houseNumber && (
              <p className="text-xs text-red-500">
                {errors.address?.houseNumber.message}
              </p>
            )}
          </div>

          {/* Zip */}
          <div>
            <FloatingLabel
              {...register("address.zip")}
              variant="outlined"
              label="Zip"
              type="number"
              color={errors.address?.zip ? "error" : "success"}
            />
            {errors.address?.zip && (
              <p className="text-xs text-red-500">
                {errors.address?.zip.message}
              </p>
            )}
          </div>
        </div>

        {/* Checkboxes */}
        <div className="mt-4 flex w-full flex-col items-center gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Checkbox {...register("isBusiness")} id="isBusiness" />
            <label
              htmlFor="isBusiness"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Business account
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox {...register("isAdmin")} id="isAdmin" />
            <label
              htmlFor="isAdmin"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Admin
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isValid}
          className="mt-6 w-full rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Submit
        </Button>
        <Button type="button" onClick={() => reset()}>
          Reset Form.
        </Button>
      </form>
    </main>
  );
};

export default Register;
