import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errMess, setErrMess] = useState(null);
  const [successMess, setSuccessMess] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signup = async () => {
    if (!validateEmail(email)) {
      setErrMess("Invalid email format");
      setTimeout(() => setErrMess(null), 2000);
      return;
    }

    if (password.length < 6) {
      setErrMess("Password must be at least 6 characters long");
      setTimeout(() => setErrMess(null), 2000);
      return;
    }

    if (password !== passwordConfirm) {
      setErrMess("Passwords do not match");
      setTimeout(() => setErrMess(null), 2000);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/signup", {
        username,
        email,
        password,
      });

      console.log(response.data);
      
      setSuccessMess("Sign-up successful. Redirecting now");
      setTimeout(() => {
        setSuccessMess(null);
        navigate("/email-sent");
      }, 2000);
    } catch (error) {
      console.log(error);
      setErrMess(error.response?.data?.message || "An error occurred");
      setTimeout(() => setErrMess(null), 2000);
    }
  };

  return (
    <main className="w-screen h-screen bg-cover grid place-items-center placeholder:text-[#161616]">
      <div className="w-full md:w-[600px] bg-[#161616] rounded-xl px-16 py-8 flex flex-col shadow-xl transition-all duration-300">
        {successMess && (
          <h1 className="text-green-500 text-xl text-center mb-12">
            {successMess}
          </h1>
        )}
        {errMess && (
          <h1 className="text-red-500 text-xl text-center mb-12">{errMess}</h1>
        )}
        <h1 className="text-white font-alex text-5xl text-center mb-12">
          Efitness
        </h1>
        <h1 className="text-3xl text-center mb-6">Sign up</h1>
        <div className="flex-1 h-full">
          <div className="h-full w-full flex items-center justify-center flex-col">
            <input
              type="text"
              className="bg-black text-xl px-4 py-4 text-white rounded shadow-lg w-full my-4 focus:border-[#bc8060] border border-black transition-all duration-300"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-black text-xl px-4 py-4 text-white rounded shadow-lg w-full my-4 focus:border-[#bc8060] border border-black transition-all duration-300"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
            />
            <button
              disabled={
                !username ||
                !email ||
                !password ||
                !passwordConfirm ||
                password !== passwordConfirm
              }
              className="bg-white hover:bg-black text-black hover:text-white mt-12 py-2 px-6 rounded text-xl transition-all duration-700 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black"
              onClick={signup}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
