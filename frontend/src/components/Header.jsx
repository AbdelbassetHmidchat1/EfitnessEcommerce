import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import useUser from "../auth/useUser";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((isOpen) => !isOpen);
    console.log(isOpen);
  };

  return (
    <>
      <header className="flex justify-around bg-black text-white w-full sticky top-0 items-center px-8 shadow-2xl z-10">
        <h1 className="text-white font-alex text-5xl">Efitness</h1>
        <nav className=" md:flex hidden">
          <ul className="w-full flex justify-between items-center text-xl">
            <NavLink className="my-12 mx-4" to="/">
              <li>Home</li>
            </NavLink>
            <NavLink className="my-12 mx-4" to="/login">
              <li>Login</li>
            </NavLink>
            <NavLink className="my-12 mx-4" to="/contact">
              <li>Contact us</li>
            </NavLink>
          </ul>
        </nav>
        <nav>
          <ul className="w-full flex justify-end items-center text-xl">
            <li className="mx-2 ">
              <IoCartOutline className="size-12" />
            </li>
            <li className="mx-2 hidden md:block my-12">
              <AiOutlineUser className="size-12" />
            </li>
            <li className="mx-2 my-12 md:hidden" onClick={toggleOpen}>
              <IoIosMenu className="size-12 transition-all duration-700 hover:rotate-90" />
            </li>
          </ul>
        </nav>
      </header>
      <nav
        className={`fixed h-screen top-0 z-20 left-0 w-screen flex transition-all  duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }  `}
      >
        <h1
          className="text-sm absolute top-10 right-10 z-20 cursor-pointer text-white"
          onClick={toggleOpen}
        >
          close
        </h1>
        <div
          className={`w-full  bg-black h-full duration-300 transition-all opacity-30`}
        ></div>
        <div
          className={`absolute top-0 right-0  h-full border duration-300  border-white bg-black shadow-xl ${
            isOpen ? " w-[300px]" : "w-0"
          }   `}
        >
          <ul className="w-full text-xl text-white h-full  flex flex-col justify-around items-center py-28 px-8">
            <li>Home</li>
            <hr className="w-full" />
            <li>Login</li>
            <hr className="w-full" />
            <li>Contact us</li>
            <hr className="w-full" />
            <li>About us</li>
          </ul>
        </div>
      </nav>
    </>
  );
}
