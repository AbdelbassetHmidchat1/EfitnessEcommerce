import { useState, useEffect } from "react";
import axios from "axios";
import useToken from "../auth/useToken";
import useUser from "../auth/useUser";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setToken] = useToken();
  const [success, setSuccess] = useState(false);
  const user = useUser();
  const navigate = useNavigate();


  const [errMess, setErrMess] = useState(null);
  const [successMess, setSuccessMess] = useState(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };


  const login = async () => {
    if (!validateEmail(email)) {
      setErrMess("Invalid email format");
      setTimeout(() => {
        setErrMess(null);
      }, 2000);
      return;
    }

    if (!validatePassword(password)) {
      setErrMess("Password must be at least 6 characters long");
      setTimeout(() => {
        setErrMess(null);
      }, 2000);
      return;
    }

    try {
      console.log(user);
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });

      const data = response.data;
      console.log(data);
      console.log("token" + data.token);

      if (data.token) {
        setToken(data.token);
        setSuccessMess("Login successful. Redirecting now");
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setErrMess(error.response?.data?.message || "An error occurred");
      setTimeout(() => {
        setErrMess(null);
      }, 2000);
    }
  };

  return (
    <main className="w-screen h-screen bg-cover grid place-items-center placeholder:text-[#161616] ">
      <div className="w-full md:w-[600px] h-3/4 bg-[#161616] rounded-xl px-16 py-16 flex flex-col shadow-xl transition-all duration-300">
        {successMess && (
          <h1 className="text-green-500 text-xl text-center mb-12">
            {successMess}
          </h1>
        )}
        {errMess && (
          <h1 className="text-red-500 text-xl text-center mb-12">{errMess}</h1>
        )}

        <h1 className="text-white font-alex text-5xl text-center mb-12 ">
          Efitness
        </h1>
        <h1 className="text-3xl text-center mb-6">Login</h1>
        <div className="flex-1 h-full">
          <div className="h-full w-full flex items-center justify-center flex-col">
            <input
              type="text"
              className="bg-black text-xl px-4 py-4 text-white rounded shadow-lg w-full my-4 focus:border-[#bc8060] border border-black transition-all duration-300"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-black text-xl px-4 py-4 text-white rounded shadow-lg w-full my-4 focus:border-[#bc8060] border border-black transition-all duration-300"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="flex">
              <button
                disabled={!email || !password}
                className="bg-white hover:bg-black text-black hover:text-white mt-12 py-2 px-6 rounded text-xl transition-all duration-700 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black"
                onClick={login}
              >
                Log in
              </button>

              <button
                className="text-white hover:text-[#bc8060] mt-12 py-2 px-6 rounded text-sm transition-all duration-700"
                onClick={() => navigate("/forgot-password")}
              >
                forgot password?
              </button>
            </div>
            <div className="flex flex-col gap-y-4">
              <button
                className="bg-white hover:bg-black text-black hover:text-white mt-12 py-2 px-6 rounded text-xl transition-all duration-700 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black"
                onClick={() => navigate("/sign-up")}
              >
                Don't have an account? Create One
              </button>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
