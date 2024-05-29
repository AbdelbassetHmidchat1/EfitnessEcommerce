import Footer from "../components/Footer";
import Header from "../components/Header";
import ring from "../static/images/ring.jpg";

export default function Product() {
  return (
    <>
      <Header />
      <div className="w-full md:h-[calc(100vh-144px)]  py-8 md:flex ">
        <div className="md:w-1/2 w-full h-full p-10 flex items-center justify-center ">
          <img src={ring} className="object-fill w-full h-full" alt="ring" />
        </div>
        <div className="md:w-1/2 w-full h-full p-10 flex items-center  ">
          <div>
            <h1 className="text-5xl mb-6">Couple Gold Diamond Ring</h1>
            <h2 className="text-4xl mb-4">
              Price: <span className="text-[#bc8060]"> $423.44</span>
            </h2>
            <p className="text-3l mb-3">Description</p>
            <p className="mb-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Praesentium repellendus aut reprehenderit voluptas sapiente
              voluptatibus illo veritatis aspernatur quos expedita eaque ipsa
              error pariatur tenetur fugit, dicta, iure obcaecati ea!
            </p>
            <table className="my-8 bg-black border w-full ">
              <tr className="border border-b border-white border-opacity-20">
                <td className="p-8 border-r border-opacity-10 border-white w-1/4 ">
                  Name:
                </td>
                <td className="p-8 ">Couple Gold Diamond Ring</td>
              </tr>
              <tr className="border border-b border-white border-opacity-20">
                <td className="p-8 border-r border-opacity-10 border-white w-1/4 ">
                  Type:
                </td>
                <td className="p-8 ">Sweaters</td>
              </tr>
              <tr className="border border-b border-white border-opacity-20">
                <td className="p-8 border-r border-opacity-10 border-white w-1/4 ">
                  Posted:
                </td>
                <td className="p-8 ">2023 / 09 / 26</td>
              </tr>
            </table>
            <button className="bg-white hover:bg-[#bc8060] text-black hover:text-white px-4 py-4 w-full transition-all duration-700">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
