import useUser from "../auth/useUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { AiFillCreditCard, AiOutlineDelete } from "react-icons/ai";
import Footer from "../components/Footer";

export default function Cart() {
  const user = useUser();
  const userId = user._id;
  const [items, setItems] = useState([]);
  const names = items?.map((item) => item.itemId.name).toString();

  useEffect(() => {
    console.log(user);
    const fetchCart = async () => {
      const response = await axios.post("http://localhost:4000/api/cart", {
        userId,
      });

      setItems(response.data.cart);
    };

    fetchCart();
  }, [items]);

  function sumOfPrices(items) {
    return items?.reduce((total, item) => total + item.itemId.price, 0);
  }



  const deleteItem = async (itemId) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/delete-item",
        { itemId, userId }
      );
      setItems(response.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  if (sumOfPrices(items) > 0 && user.isVerified) {
    return (
      <>
        <Header />
        <h1 className="text-4xl text-center">Cart</h1>

        <div className="h-[calc(100vh-144px)]  w-full">
          <div className="w-full  p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items ? (
              items.map((item, index) => (
                <>
                  <div className="flex flex-col">
                    <Link key={index} to={`/product/${item.itemId._id}`}>
                      <div className="p-4 flex flex-col transition-all duration-700 bg-black rounded-lg shadow-md hover:shadow-lg">
                        <style>
                          {`
                  .hover-image-${index} {
                    background-image: url(${item.itemId.url[1]});
                  }
                  .hover-image-${index}:hover {
                    background-image: url(${item.itemId.url[0]});
                  }
                `}
                        </style>
                        <div
                          className={`hover-image-${index} h-48 bg-cover bg-center rounded-t-lg transition-all duration-500`}
                          alt={item.itemId.description}
                        />
                        <div className="mt-4 flex flex-col items-center">
                          <p className="text-sm line-clamp-1">
                            {item.itemId.name}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div
                      className="flex items-center justify-between w-full"
                      title="Remove Item"
                    >
                      <p className="text-sm">
                        {item.itemId.price}
                        <span className="text-green-500">DH</span>
                      </p>
                      <p
                        className="text-sm"
                        onClick={() => deleteItem(item.itemId._id)}
                      >
                        <AiOutlineDelete className="text-red-500 w-8 h-8 " />
                      </p>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <div className="w-screen h-screen grid place-items-center">
                <p>Loading</p>
              </div>
            )}
          </div>
          <div className="p-4  text-white rounded-lg shadow-md my-8">
            <p className="text-lg font-semibold mb-2">Items</p>
            <ul className="list-disc pl-5">
              {items?.map((item) => (
                <li key={item.itemId._id} className="mb-1 cursor-default">
                  {item.itemId.name}
                </li>
              ))}
            </ul>
            <p className="text-lg font-semibold mt-4">Total Price</p>
            <p className="text-2xl text-green-500">{sumOfPrices(items)}DH</p>
          </div>
          <a
            href={`https://api.whatsapp.com/send?phone=212659550403&text=hello I want to buy ${names} `}
          >
            <div className="md:absolute bottom-2 right-2 rouded-all p-16 flex flex-col items-center hover:text-green-500">
              <AiFillCreditCard className="w-16 h-16 hover:text-green-500" />
              <p>Order now</p>
            </div>
          </a>
        </div>
      </>
    );
  } else if (!user.isVerified) {
    return (
      <>
        <Header />
        <div className="w-full h-[calc(100vh-144px)] grid place-items-center ">
          <p>Account not activated check you inbox</p>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className="w-full h-[calc(100vh-144px)] grid place-items-center ">
          <p>No items found, add a product to the cart</p>
        </div>
        <Footer />
      </>
    );
  }
}
