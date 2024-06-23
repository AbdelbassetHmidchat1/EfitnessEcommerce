import Header from "../components/Header";
import { useState } from "react";
import { IoMdRewind } from "react-icons/io";
import { IoEarthSharp } from "react-icons/io5";
import { HiOutlineLockClosed } from "react-icons/hi2";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <>
      <Header />
      <div className="w-full h-[calc(100vh-144px)]  flex flex-col ">
        <h1 className="text-5xl mb-4 text-center"> Contact Us </h1>
        <div className="flex-1 md:flex  p-16 md:gap-x-8 w-full  justify-between items-center">
          <div className="md:w-1/2 w-full h-full flex items-center justify-center">
          <div className="bg-[#131014] md:w-fit w-full    gap-y-16 h-full flex flex-col justify-between items-center py-8 ">
            <div className="  grid place-items-center grid-cols-2 h-full  gap-x-8  px-8">
              <IoMdRewind className="w-16 h-16 text-[#bc8060] justify-self-start" />
              <div className="divide-y-8 divide-[#131014] justify-self-start ">
                <h1 className="text-[#bc8060]">Easy returns</h1>
                <p>30 days return policy</p>
              </div>
            </div>
            <div className="  grid place-items-center grid-cols-2 h-full  gap-x-8  px-8">
              <IoEarthSharp className="w-16 h-16 text-[#bc8060] justify-self-start" />
              <div className="divide-y-8 divide-[#131014] justify-self-start ">
                <h1 className="text-[#bc8060]">Free shipping</h1>
                <p>On all orders Above <br /> 1000 MAD</p>
              </div>
            </div>
            <div className="  grid place-items-center grid-cols-2 h-full  gap-x-8  px-8">
              <HiOutlineLockClosed className="w-16 h-16 text-[#bc8060] justify-self-start" />
              <div className="divide-y-8 divide-[#131014] justify-self-start ">
                <h1 className="text-[#bc8060]">Secure payments</h1>
                <p>24/7 dedicated <br /> support</p>
              </div>
            </div>
           
          </div>
          </div>
          <div className="md:w-1/2 w-full h-full flex justify-center items-center">
            <div>
              <input
                type="text"
                className="bg-black text-xl px-4 py-4 text-white rounded shadow-lg w-full my-4 focus:border-[#bc8060] border border-white transition-all duration-300  "
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <input
                type="text"
                className="bg-black text-xl px-4 py-4 text-white rounded shadow-lg w-full my-4 focus:border-[#bc8060] border border-white transition-all duration-300  "
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <textarea
                type="text"
                placeholder="Subject"
                className="bg-black text-xl px-4 py-4 text-white rounded shadow-lg  w-full my-4 focus:border-[#bc8060] border border-white transition-all duration-300 "
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
              />
              <button className=" mt-12 py-2 px-6 border rounded-xl text-xl  transition-all duration-700  border-white  text-center block mx-auto bg-white hover:bg-[#bc8060] text-black hover:text-white">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
