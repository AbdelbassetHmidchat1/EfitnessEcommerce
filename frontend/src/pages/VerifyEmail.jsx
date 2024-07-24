import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useToken from "../auth/useToken";

export default function VerifyEmail() {
  const { uuid } = useParams();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [, setToken] = useToken();
  useEffect(() => {
    const verify = async () => {
      const response = await axios.post(
        "https://serverefitcommerce.vercel.app/api/verify-email",
        {
          uuid,
        }
      );
      console.log(response.data);
      const token = response.data.token;
      if (token) {
        setSuccess(true);
        setLoading(false);
      } else {
        setSuccess(false);
        setLoading(false);
      }
    };
    verify();
  });
  return (
    <div className="w-screen grid place-items-center h-screen bg-black">
      {loading ? (
        <p>Please wait</p>
      ) : (
        <p className={success ? "text-green-500" : "text-red-500"}>
          {success ? "Email verified successfully" : "Email not verified"}
        </p>
      )}
    </div>
  );
}
