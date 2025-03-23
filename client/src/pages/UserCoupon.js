import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InstructionPage from "./InstructionPage";

const UserCoupon = () => {

  const API = 'https://coupon-distribution-backend-seven.vercel.app';
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const claimCoupon = async () => {
    try {
      const res = await axios.get(`${API}/api/claim`, {
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
      <InstructionPage />
      <h2 className="text-2xl underline">FREE COUPONS</h2>
      <div className="flex flex-col gap-5 items-center justify-center border-1 rounded shadow shadow-xl p-20 bg-gray-50">
        <button
          onClick={handleAdmin}
          className="border-1 px-5 py-2 shadow shadow-lg cursor-pointer rounded bg-blue-400 hover:scale-110 hover:bg-blue-300 w-full"
        >
          Admin
        </button>
        <button
          onClick={claimCoupon}
          className="border-1 px-5 py-2 shadow shadow-lg cursor-pointer rounded bg-blue-400 hover:scale-110 hover:bg-blue-300 w-full"
        >
          Claim Coupon
        </button>
        <p className="text-lg font-bold">{message}</p>
      </div>
    </div>
  );
};

export default UserCoupon;
