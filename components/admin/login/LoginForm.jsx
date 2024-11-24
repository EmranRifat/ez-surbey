import Link from "next/link";
import PasswordResetModal from "../modal/PasswordResetModal";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Button, Input, Checkbox } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useUserLogin } from "lib/hooks/admin/auth/useLoginAdmin";
import Cookies from "js-cookie";

function LoginForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { mutate,isLoading } = useUserLogin();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [rememberMe, setRememberMe] = useState(false);

  // Define cookieOptions
  const cookieOptions = {
    expires: rememberMe ? 7 : undefined, // Expires in 7 days if "Remember me" is checked
    path: '/',
    // Add other options as needed
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      setLoading(true);
      setError(""); 

      console.log("login values==>>", values);

      mutate(values, {
        onSuccess: (response) => {
          console.log("Form submitted successfully");
          console.log("response==>>", response);
         
          // Adjusted property names
          if (response.access_token && response.refresh_token) {

            Cookies.set("access", response.access_token, cookieOptions);
            Cookies.set("refresh", response.refresh_token, cookieOptions);

            setLoading(false);
            router.push("/");
          } else {
            setError(response.error || "Login failed");
            setLoading(false);
          }
        },

        onError: (error) => {
          setLoading(false);
          console.error("An error occurred while submitting the form", error);
          setError(error.message || "An error occurred while submitting the form");
        },
      });
    },
  });

  return (
    <div className="w-full lg:w-1/2 px-4 md:px-8 xl:pl-12 pt-10">
      <PasswordResetModal
        isActive={modalOpen}
        modalData={modalData}
        handelModalData={setModalData}
        handleActive={setModalOpen}
      />

      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center h-full w-2/3 border-2 rounded-2xl shadow-xl py-10 bg-white">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large pb-10 pt-6 md:px-0 px-4">
            {/* Optional Logo */}
            {/* 
            <div className="flex justify-center items-center">
              <Image
                src="/logo/EMTS Only Bird.svg"
                alt="Logo"
                width={80}
                height={80}
              />
            </div>
            */}

            <p className="pb-4 text-center md:text-xl text-black font-poppins font-semibold">
              ez-Servey Dashboard Login
            </p>

            <form
              className="flex flex-col gap-4 text-black"
              onSubmit={formik.handleSubmit}
            >
              <Input
                label="User Name"
                labelPlacement="outside"
                name="username"
                placeholder="Enter your username"
                type="text"
                variant="bordered"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="text-black"
                aria-label="User Name"
              />

              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-600">{formik.errors.username}</div>
              ) : null}

              <Input
                endContent={
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="focus:outline-none"
                    aria-label={isVisible ? "Hide password" : "Show password"}
                  >
                    {isVisible ? (
                      <Icon
                        className="text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="text-black"
                aria-label="Password"
              />

              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600">{formik.errors.password}</div>
              ) : null}

              <div className="flex items-center justify-between px-1 py-2">
                <Checkbox
                  isSelected={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  name="remember"
                  size="sm"
                >
                  Remember me
                </Checkbox>
                <Link
                  onClick={() => setModalOpen(true)}
                  className="text-default-500"
                  href="#"
                  size="sm"
                >
                  Forgot password?
                </Link>
              </div>
              <Button color="primary" type="submit" isLoading={loading}>
                Sign In
              </Button>

              {error && <p className="pb-2 text-danger mt-2">{error}</p>}
            </form>
            <p className="text-center text-small text-default-500">
              <Link href="/signup" size="sm">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
