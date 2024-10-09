import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import GoogleSign from "../components/GoogleSign/GoogleSign";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Values.username == "" ||
        Values.email == "" ||
        Values.password == "" ||
        Values.address == ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/sign-up`,
          Values

        );
        alert(response.data.message);
        navigate("/LogIn");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    const profile = jwtDecode(credentialResponse.credential);
    setValues((prevValues) => ({
      ...prevValues,
      username: profile.name,
      email: profile.email,
    }));
  };

  return (
    <GoogleOAuthProvider clientId="982455320861-ub1r35mdj4jr23adohi83q5nrffm3gh5.apps.googleusercontent.com">
      <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
        <div className="bg-zinc-800 rounded-1g px-8 py-5 w-full md:w-3/6 lg:w-2/6">
          <p className="text-zinc-200 text-xl">Sign Up</p>
          <div className="mt-4">
            <div>
              <label htmlFor="" className="text-zinc-400">
                Username
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="username"
                name="username"
                required
                value={Values.username}
                onChange={change}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="" className="text-zinc-400">
                Email
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="xyz@example.com"
                name="email"
                required
                value={Values.email}
                onChange={change}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="" className="text-zinc-400">
                Password
              </label>
              <input
                type="password"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="password"
                name="password"
                required
                value={Values.password}
                onChange={change}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="" className="text-zinc-400">
                Address
              </label>
              <textarea
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="address"
                name="address"
                required
                value={Values.address}
                onChange={change}
              />
            </div>
            <div className="mt-4">
              <button
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
                onClick={submit}
              >
                SignUp
              </button>
            </div>
            {Values.username == "" && Values.email == "" && (
              <div className="mt-4">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError=
                  {() => {
                    console.log("Login Failed");
                  }}
                  render=
                  {(renderProps) => (
                    <button
                      className="w-full bg-white text-zinc-900 font-semibold py-2 flex items-center justify-center rounded gap-4 hover:bg-zinc-100 transition-all duration-300"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <FcGoogle className="text-3xl" /> Sign up with Google
                    </button>
                  )}
                />
              </div>
            )}
            {/* <GoogleLogin/> */}
            {/* <div className="mt-4">
            <button
              className="w-full bg-white text-zinc-900 font-semibold py-2 flex items-center justify-center rounded gap-4 hover:bg-zinc-100 transition-all duration-300"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="text-3xl" /> Sign up with google
            </button>
          </div> */}
            <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
              Or
            </p>
            <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
              Already have an account? &nbsp;
              <Link to="/logIn" className="hover:text-blue-500">
                <u>LogIn</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};
export default SignUp;
