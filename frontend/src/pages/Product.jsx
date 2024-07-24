import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import useUser from "../auth/useUser";

export default function Product() {
  const [items, setItems] = useState([]);
  const { _id } = useParams();

  useEffect(() => {
    console.log(_id);
    const retrieveItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/items");
        setItems(response.data.items);
        console.log(items);
      } catch (error) {
        console.error("Error fetching items", error);
      }
    };
    retrieveItems();
  }, []);

  const item = items.find((item) => item._id == _id);
  const user = useUser();

  const userId = user ? user._id : null;

  const add = async (itemId) => {
    try {
      if (userId) {
        const response = await axios.post(
          "http://localhost:4000/api/add-cart",
          {
            userId,
            itemId,
          }
        );
        setSuccessMsg(response.data.message);
        setTimeout(() => {
          setSuccessMsg(null);
        }, 2000);
      } else {
        setErrorMsg("Log in first");
        setTimeout(() => {
          setErrorMsg(null);
        }, 2000);
      }
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setTimeout(() => {
        setErrorMsg(null);
      }, 2000);
    }
  };
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  return (
    <>
      <Header />

      {item && (
        <>
          {errorMsg && (
            <div className="w-full grid place-items-center bg-red-500 transition-all duration-700">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="w-full grid place-items-center bg-green-500  transition-all duration-700">
              {successMsg}
            </div>
          )}

          <div className="w-full md:h-[calc(100vh-144px)] py-8 md:flex">
            <div className="md:w-1/2 w-full h-full p-10 flex items-center justify-center transition-all duration-700">
              <img
                src={item.url[0]}
                onMouseOver={(e) => (e.currentTarget.src = item.url[0])}
                onMouseLeave={(e) => (e.currentTarget.src = item.url[1])}
                className="object-fill w-full h-full transition-all duration-1000 opacity-100 hover:opacity-100"
                alt="ring"
              />
            </div>
            <div className="md:w-1/2 w-full h-full p-10 flex items-center">
              <div>
                <h1 className="text-4xl mb-6">{item.name}</h1>
                <h2 className="text-4xl mb-4">
                  Price:<span className="text-[#bc8060]"> {item.price} DH</span>
                </h2>
                <p className="text-3l mb-3">Description</p>
                <p className="mb-2">{item.description}</p>
                <table className="my-8 bg-black border w-full">
                  <tr className="border border-b border-white border-opacity-20">
                    <td className="p-8 border-r border-opacity-10 border-white w-1/4">
                      Name:
                    </td>
                    <td className="p-8">{item.name}</td>
                  </tr>
                  <tr className="border border-b border-white border-opacity-20">
                    <td className="p-8 border-r border-opacity-10 border-white w-1/4">
                      Type:
                    </td>
                    <td className="p-8">{item.category}</td>
                  </tr>
                  <tr className="border border-b border-white border-opacity-20">
                    <td className="p-8 border-r border-opacity-10 border-white w-1/4">
                      Posted:
                    </td>
                    <td className="p-8">2023 / 09 / 26</td>
                  </tr>
                </table>
                <button
                  className="bg-white hover:bg-[#bc8060] text-black hover:text-white px-4 py-4 w-full transition-all duration-700"
                  onClick={() => {
                    add(item._id);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
