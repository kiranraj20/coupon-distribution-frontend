import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserCoupon = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const claimCoupon = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/claim", {
        withCredentials: true,
      });
      setMessage(`Coupon claimed: ${res.data.coupon}`);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
      console.error(err); // Log the full error
    }
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen bg-blue-50">
      <h2 className="text-2xl underline">FREE COUPONS</h2>
      <div className="flex flex-col gap-5 items-center justify-center border-1 rounded shadow shadow-xl p-20">
        <button
          onClick={handleAdmin}
          className="border-1 px-5 py-2 shadow shadow-lg cursor-pointer rounded bg-blue-300 hover:scale-110 hover:bg-blue-400 w-full"
        >
          Admin
        </button>
        <button
          onClick={claimCoupon}
          className="border-1 px-5 py-2 shadow shadow-lg cursor-pointer rounded bg-blue-300 hover:scale-110 hover:bg-blue-400 w-full"
        >
          Claim Coupon
        </button>
        <p className="text-lg font-bold">{message}</p>
      </div>
    </div>
  );
};

export default UserCoupon;
