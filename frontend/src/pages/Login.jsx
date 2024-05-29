import { useState, useEffect } from "react";
import axios from "axios";
import useToken from "../auth/useToken";
import useUser from "../auth/useUser";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setToken] = useToken();
  const [success, setSuccess] = useState(false);
  const user = useUser();
  const navigate = useNavigate();

  const login = async () => {
    try {
      console.log(user);
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });

      const data = response.data;

      console.log("token" + data.token);

      if (data.token) {
        setToken(data.token);
      }
     

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(user);
  });

  return (
    <main className="w-screen h-screen bg-cover grid place-items-center placeholder:text-[#161616] ">
      <div className="w-full md:w-[600px]  h-3/4 bg-[#161616] rounded-xl px-16 py-32  flex flex-col shadow-xl transition-all duration-300">
        {success && (
          <h1 className="text-green-500 text-5xl text-center mb-12">
            Login Successfull redirecting to home page now
          </h1>
        )}

        <h1 className="text-white font-alex text-5xl text-center mb-12 ">
          Efitness
        </h1>
        <h1 className="text-3xl text-center mb-6">Login</h1>
        <div className="flex-1 h-full">
          <div className="h-full w-full flex items-center justify-center  flex-col">
            <input
              type="text"
              className="bg-black text-xl px-4 py-4 text-white rounded shadow-lg w-full my-4 focus:border-[#bc8060] border border-black transition-all duration-300  "
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-black text-xl px-4 py-4 text-white rounded shadow-lg  w-full my-4 focus:border-[#bc8060] border border-black transition-all duration-300 "
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              disabled={!email || !password}
              className=" bg-white hover:bg-black text-black hover:text-white mt-12 py-2 px-6  rounded text-xl transition-all duration-700 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black "
              onClick={login}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
