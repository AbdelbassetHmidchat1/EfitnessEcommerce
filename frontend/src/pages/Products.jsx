import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [items, setItems] = useState([]);
  const men = items.filter((item) => item.category === "Men");
  const women = items.filter((item) => item.category === "Women");
  const equipment = items.filter((item) => item.category === "Equipment");

  const [selectedCategory, setSelectedCategory] = useState("Men");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getFilteredItems = () => {
    switch (selectedCategory) {
      case "Women":
        return women;
      case "Equipment":
        return equipment;
      default:
        return men;
    }
  };

  const filteredItems = getFilteredItems();
  useEffect(() => {
    const retrieveItems = async () => {
      const response = await axios.get("https://serverefitcommerce.vercel.app/api/items");
      setItems(response.data.items);
    };
    retrieveItems();
  }, [items]);

  return (
    <div className="md:flex w-screen ">
      <div className="w-full md:w-[10%] flex md:flex-col md:py-0 sticky top-0 ">
        <div
          className="h-full w-full grid place-items-center cursor-pointer hover:text-[#bc8060] transition-all duration-300"
          onClick={() => handleCategoryClick("Men")}
        >
          <p className="text-inherit transition-all duration-300">Men</p>
        </div>
        <div
          className="h-full w-full grid place-items-center cursor-pointer hover:text-[#bc8060] transition-all duration-300"
          onClick={() => handleCategoryClick("Women")}
        >
          <p className="text-inherit transition-all duration-300">Women</p>
        </div>
        <div
          className="h-full w-full grid place-items-center cursor-pointer hover:text-[#bc8060] transition-all duration-300"
          onClick={() => handleCategoryClick("Equipment")}
        >
          <p className="text-inherit transition-all duration-300">Equipment</p>
        </div>
      </div>
      <div className="md:w-[90%] w-full md:h-screen ">
        <div className="md:w-full md:h-full md:grid md:grid-cols-4 md:border-l   border-l-white border-opacity-60  ">
          {filteredItems.map((item, index) => (
            <Link to={`/product/${item._id}`}>
              <div
                key={index}
                className="p-8 h-full  md:h-full w-full  flex flex-col transition-all duration-700     "
              >
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
                  className={`hover-image-${index} h-[200px] md:h-full self-center md:w-full w-1/2 transition-all duration-500 bg-cover bg-center`}
                  alt={item.description}
                />
                <p className="text-white text-sm max-w-[50%] md:max-w-full  self-center line-clamp-1 ">
                  {item.name}
                </p>
                <p className="text-gray-500 text-sm max-w-[50%] md:max-w-full  self-center">
                  {item.price} <span className="text-green-800">DH</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
