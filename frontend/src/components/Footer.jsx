import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoPinterest,
  IoLogoTwitter,
  IoLogoYoutube,
} from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" w-full p-12 " id="footer">
      <div className=" grid md:grid-cols-5 grid-cols-1 gap-x-12 gap-y-8 w-full">
        <div className="md:col-span-3  ">
          <h1 className="text-white font-alex text-5xl">Efitness</h1>
          <h2 className="my-8">
            Welcome to eFitness – your premier destination for high-performance
            activewear and gym essentials. Explore our curated selection of
            cutting-edge apparel and accessories designed to elevate your
            workout experience. From sleek workout gear to stylish athleisure,
            eFitness offers the perfect blend of fashion and function to fuel
            your fitness journey. Discover the power of style in motion with
            eFitness.
          </h2>
          <ul className="flex w-full justify-around ">
            <li>
              <IoLogoPinterest className="hover:text-red-500 md:size-16 size-12" />
            </li>
            <li>
              <IoLogoTwitter className="hover:text-blue-500 md:size-16 size-12" />
            </li>
            <li>
              <IoLogoInstagram className="hover:text-pink-500 md:size-16 size-12" />
            </li>
            <li>
              <IoLogoFacebook className="hover:text-blue-950 md:size-16 size-12" />
            </li>
            <li>
              <IoLogoYoutube className="hover:text-red-500 md:size-16 size-12" />
            </li>
          </ul>
        </div>
        <div>
          <h1 className="mb-8 text-4xl  ">Information</h1>
          <ul className="divide-black divide-y-8">
            <NavLink to={"/contact"}>
              <li>Contact us</li>
            </NavLink>
          </ul>
        </div>
        <div>
          <h1 className="mb-8 text-4xl">Quick</h1>
          <ul className=" divide-black divide-y-8 ">
            <NavLink to={"/products"}>
              <li>Shop now</li>
            </NavLink>
            {/* <a href="https://api.whatsapp.com/send?phone=212659550403&text=[rffoeroferoifebf]">Send Message</a> */}
          </ul>
        </div>
      </div>
    </footer>
  );
}
