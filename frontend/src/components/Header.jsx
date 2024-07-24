import { useState, useEffect } from "react";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import useUser from "../auth/useUser";

export default function Header({props}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((isOpen) => !isOpen);
    console.log(isOpen);
  };
  const user = useUser();

  const logout = () => {
    localStorage.removeItem("token");
  };
  useEffect(() => {}, [user]);
  const navigate = useNavigate();

  return (
    <>
      <header className="flex justify-around bg-black text-white w-full sticky top-0 items-center px-8 shadow-2xl z-10">
        <h1 className="text-white font-alex text-5xl">Efitness</h1>
        <nav className=" md:flex hidden">
          <ul className="w-full flex justify-between items-center text-xl">
            <NavLink className="my-12 mx-4" to="/">
              <li>Home</li>
            </NavLink>
            {user ? (
              <>
                <a className="my-12 mx-4" href="/" onClick={logout}>
                  <li>Log out</li>
                </a>
              </>
            ) : (
              <>
                <NavLink className="my-12 mx-4" to="/login">
                  <li>Login</li>
                </NavLink>
              </>
            )}

            <NavLink className="my-12 mx-4" to="/products">
              <li>Products</li>
            </NavLink>
          </ul>
        </nav>
        <nav>
          <ul className="w-full flex justify-end items-center text-xl">
            <li className="mx-2 ">
              <IoCartOutline
                className="size-12"
                onClick={() => (user ? navigate("/cart") : navigate("/login"))}
              />
            </li>
            <li className="mx-2 my-12 " onClick={toggleOpen}>
              <IoIosMenu className="size-12 transition-all duration-700 hover:rotate-90" />
            </li>
          </ul>
        </nav>
        {user && <nav className="md:block hidden" >Hello {user.username}</nav>}
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
          <IoClose className="size-12 transition-all duration-700 hover:rotate-90" />
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
            {user ? (
              <NavLink to={"/cart"}>
                <li>Cart</li>{" "}
              </NavLink>
            ) : (
              <NavLink to={"/login"}>
                <li>Login</li>{" "}
              </NavLink>
            )}
            <hr className="w-full" />
            <NavLink to={"/contact"}>
              <li>Contact us</li>
            </NavLink>
            <hr className="w-full" />
            <a href="/#footer">
              <li>About us</li>
            </a>
          </ul>
        </div>
      </nav>
    </>
  );
}
