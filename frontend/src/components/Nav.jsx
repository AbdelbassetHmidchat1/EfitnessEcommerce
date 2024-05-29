// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Nav() {
//   const [data, setData] = useState(undefined);
//   useEffect(() => {
//     const fetchdata = async () => {
//       const data = await axios.get("https://randomuser.me/api");
//       setData(data.data);
//       console.log(data.data);
//     };
//     fetchdata();
//   }, []);

//   return (
//     <>
//       <div>
//         <div>{data ? data.info.page : "loading"}</div>
//       </div>
//     </>
//   );
// }
