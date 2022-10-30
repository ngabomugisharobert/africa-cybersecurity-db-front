import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { baseURL, fetchPost } from "../../../utils/fetchAPI";
import jwt from "jsonwebtoken";
import { Button } from "@material-tailwind/react";

const Index = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    setLoading(true);
    await fetchPost(`${baseURL}/auth/login`, { email, password })
      .then((res) => {
        console.log(res.data, "✅✅✅✅✅✅✅✅");
        const token = res.data.token;
        //save token into local storage
        if (token) console.log("token decoded", jwt.decode(token));
        localStorage.setItem("token", token);
        setLoading(false);
        router.push("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "❌❌❌❌❌❌❌❌");
        if (err) setError(err && err.response.data.error);
      });
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://source.unsplash.com/K4mSJ7kc0As/600x800")',
              }}
            />
            {/* Col */}
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* if there is an error display a message */}
                  {error && (
                    <p className="text-xs italic text-red-500">{error}</p>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    className="mr-2 leading-tight"
                    type="checkbox"
                    id="checkbox_id"
                  />
                  <label className="text-sm" htmlFor="checkbox_id">
                    Remember Me
                  </label>
                </div>
                <div className="mb-6 text-center">
                  <Button
                    onClick={handleSubmit}
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Sign In
                  </Button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link href="/auth/register">
                    <p className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                      Create an Account!
                    </p>
                  </Link>
                </div>
                <div className="text-center">
                  <Link href="/auth/forget-password">
                    <p className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                      Forgot Password?
                    </p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
