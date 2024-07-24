import Header from "../components/Header";
import { Cursor, Typewriter } from "react-simple-typewriter";
import gym from "../static/images/gym.jpg";
import gymwoman from "../static/images/gymwoman.jpg";
import gymman from "../static/images/gymman.jpg";
import man1 from "../static/images/man1.jpg";
import man2 from "../static/images/man2.jpg";
import woman1 from "../static/images/woman1.jpg";
import woman2 from "../static/images/woman2.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "../components/Footer";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useUser from "../auth/useUser";

export default function App() {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const [items, setItems] = useState([]);
  const user = useUser();
  console.log(user);
  useEffect(() => {
    const retrieveItems = async () => {
      try {
        const response = await axios.get("https://serverefitcommerce.vercel.app/api/items");
        setItems(response.data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    retrieveItems();
  }, []);

  const men = items.filter((item) => item.category === "Men");

  return (
    <>
      <Header />

      <Fade>
        <main
          className={`w-full bg-black grid place-items-center h-[calc(100vh-144px)] bg-cover bg-center`}
          style={{
            backgroundImage: `url(${gym})`,
          }}
        >
          <div className="text-white">
            <p className="text-5xl mb-72">
              <Typewriter
                loop
                words={["Become a Beast today", "Shop now"]}
                typeSpeed={100}
                deleteSpeed={50}
              />
              <Cursor cursorColor="white" cursorStyle="|" />
            </p>
          </div>
        </main>
      </Fade>
      <Carousel
        swipeable
        draggable
        showDots={false}
        responsive={responsive}
        ssr
        infinite
        autoPlaySpeed={1000}
        keyBoardControl
        customTransition="all 1.5s"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className="w-full h-full"
      >
        <Fade>
          <div
            className="h-screen w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${gymman})`,
            }}
          >
            <div className="w-3/6 h-full">
              <div className="w-full h-full flex items-center justify-center flex-col">
                <h1 className="text-4xl">
                  Fitness is not an
                  <span className="text-pink-400 text-4xl"> age</span> thing
                  <br /> or a
                  <span className="text-4xl text-blue-400"> gender</span> thing
                  <h1 className="text-5xl mb-12">It's a motivation thing</h1>
                </h1>
                <a href="#shop">
                  <button className="my-6 py-2 px-4 text-2xl text-black hover:text-white transition-all duration-700 bg-white hover:bg-black border-white border">
                    Shop now
                  </button>
                </a>
              </div>
            </div>
          </div>
        </Fade>
        <Fade>
          <div
            className="h-screen w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${gymwoman})`,
            }}
          >
            <div className="w-3/6 h-full">
              <div className="w-full h-full flex items-center justify-center flex-col">
                <h1 className="text-4xl">
                  Fitness is not an{" "}
                  <span className="text-pink-400 text-4xl">age</span> thing{" "}
                  <br /> or a{" "}
                  <span className="text-4xl text-blue-400">gender</span> thing
                  <h1 className="text-5xl">It's a motivation thing</h1>
                </h1>
                <a href="#shop">
                  <button className="my-6 py-2 px-4 text-2xl text-black hover:text-white transition-all duration-700 bg-white hover:bg-black border-white border">
                    Shop now
                  </button>
                </a>
              </div>
            </div>
          </div>
        </Fade>
      </Carousel>
      <Fade>
        <div className="w-full py-16" id="shop">
          <h1 className="text-4xl text-center pb-16 pt-28">First Release</h1>
          <div className="md:flex md:w-full md:justify-around grid grid-cols-2 grid-rows-2 place-items-center">
            {men.map((item, index) => (
              <Link key={index} to={`/product/${item._id}`}>
                <div className="py-4">
                  <style>
                    {`
                   .hover-image-${index} {
                     background-image: url(${item.url[1]});
                   }
                   .hover-image-${index}:hover {
                     background-image: url(${item.url[0]});
                   }
                `}
                  </style>
                  <div
                    className={`hover-image-${index} md:w-[20vw] md:h-[20vw] transition-all duration-500 bg-cover w-[40vw] h-[40vw]`}
                    alt={item.description}
                  />
                  <p className="text-white text-sm max-w-[40vw]">{item.name}</p>
                  <p className="text-gray-500 text-sm">
                    {item.price} <span className="text-green-800">DH</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <Link to={"/products"}>
            <button className="mx-auto block my-6 py-2 px-4 text-2xl text-black hover:text-white transition-all duration-700 bg-white hover:bg-black rounded border-white border">
              View all products
            </button>
          </Link>
        </div>
      </Fade>
      <Fade>
        <div className="w-full bg-[#131014] flex flex-col py-16">
          <h1 className="text-center text-4xl"> From Black Lovers</h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-rows-2 place-items-center gap-8 md:p-16 px-8 py-16 bg-[#131014]">
            <div className="w-full h-full bg-black py-8 px-4 shadow-xl">
              <div
                className="size-24 rounded-full bg-center bg-cover mx-auto bg-white "
                style={{ backgroundImage: `url(${man1})` }}
              ></div>
              <p className="my-4 text-center h-14 flex items-center justify-center">
                I'm delighted with the purchase Efitness products are one of the
                best in business!
              </p>
              <h1 className="text-center mb-2 text-xl">Joey Mosby</h1>
            </div>
            <div className="w-full h-full bg-black py-8 px-4 shadow-xl">
              <div
                className="size-24 rounded-full bg-center bg-cover mx-auto bg-white "
                style={{ backgroundImage: `url(${man2})` }}
              ></div>
              <p className="my-4 text-center h-14 flex items-center justify-center">
                Exceptional quality and performance, these fitness products
                surpassed all expectations.
              </p>
              <h1 className=" text-center text-xl mx-auto mb-2">
                Chandler Eriksen
              </h1>
            </div>
            <div className="w-full h-full bg-black py-8 px-4 shadow-xl">
              <div
                className="size-24 rounded-full mx-auto bg-cover bg-center bg-white "
                style={{ backgroundImage: `url(${woman1})` }}
              ></div>
              <p className="my-4 text-center h-14 flex items-center justify-center">
                Top-tier fitness products, unmatched in quality and
                effectiveness.
              </p>
              <h1 className="text-center text-xl mb-2">Carla Aldrin</h1>
            </div>
            <div className="w-full h-full bg-black py-8 px-4 shadow-xl">
              <div
                className="size-24 rounded-full mx-auto bg-center bg-white bg-cover "
                style={{ backgroundImage: `url(${woman2})` }}
              ></div>
              <p className="my-4 text-center h-14 flex items-center justify-center">
                Impressive fitness gear, exceeding expectations with their
                durability and functionality.
              </p>
              <h1 className="text-center text-xl mb-2">Alisha Samaan</h1>
            </div>
          </div>
        </div>
      </Fade>
      <Fade>
        <Footer />
      </Fade>
    </>
  );
}
