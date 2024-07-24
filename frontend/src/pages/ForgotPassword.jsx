import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const submit = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/forgot-password",
      { email }
    );
    navigate("/");
  };

  return (
    <main className="w-screen h-screen bg-cover grid place-items-center placeholder:text-[#161616] ">
      <div className="w-full md:w-[600px]  h-3/4 bg-[#161616] rounded-xl px-16 py-32  flex flex-col shadow-xl transition-all duration-300">
        <h1 className="text-white font-alex text-5xl text-center mb-12 ">
          Efitness
        </h1>
        <h1 className="text-3xl text-center mb-6">Forgot password</h1>
        <div className="flex-1 h-full">
          <div className="h-full w-full flex items-center justify-center  flex-col">
            <input
              type="text"
              className="bg-black text-xl px-4 py-4 text-white rounded shadow-lg w-full my-4 focus:border-[#bc8060] border border-black transition-all duration-300  "
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button
              disabled={!email}
              className=" bg-white hover:bg-black text-black hover:text-white mt-12 py-2 px-6  rounded text-xl transition-all duration-700 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black "
              onClick={submit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
