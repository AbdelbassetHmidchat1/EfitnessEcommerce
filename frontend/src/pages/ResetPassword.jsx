import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errMess, setErrMess] = useState(null);
  const [successMess, setSuccessMess] = useState(null);
  const { passwordResetCode } = useParams();
  const navigate = useNavigate();

  const submit = async () => {
    if (password !== passwordConfirm) {
      setErrMess("Passwords do not match");
      setTimeout(() => setErrMess(null), 2000);
      return;
    }

    try {
      const response = await axios.put("https://serverefitcommerce.vercel.app/api/reset-password", {
        password,
        passwordResetCode,
      });

      console.log(response.data);
      setSuccessMess("Password changed successfully. Redirecting now");
      setTimeout(() => {
        setSuccessMess(null);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setErrMess(error.response?.data?.message || "An error occurred");
      setTimeout(() => setErrMess(null), 2000);
    }
  };

  useEffect(() => {
    console.log(passwordResetCode);
  }, [passwordResetCode]);

  return (
    <main className="w-screen h-screen bg-cover grid place-items-center placeholder:text-[#161616] ">
      <div className="w-full md:w-[600px] h-3/4 bg-[#161616] rounded-xl px-16 py-32 flex flex-col shadow-xl transition-all duration-300">
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
        <h1 className="text-3xl text-center mb-6">Reset Password</h1>
        <div className="flex-1 h-full">
          <div className="h-full w-full flex items-center justify-center flex-col">
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
              disabled={passwordConfirm !== password}
              className="bg-white hover:bg-black text-black hover:text-white mt-12 py-2 px-6 rounded text-xl transition-all duration-700 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black"
              onClick={submit}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
