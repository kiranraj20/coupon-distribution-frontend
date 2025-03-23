import axios from "axios";
import React from "react";

const AddCoupon = ({
  newCouponCode,
  accessToken,
  setCoupons,
  coupons,
  setNewCouponCode,
  fetchData,
}) => {
  const API = 'https://coupon-distribution-backend-seven.vercel.app';
  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/api/coupons`,
        { code: newCouponCode },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setCoupons([...coupons, res.data]);
      setNewCouponCode("");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center border-1 min-w-1/2 rounded shadow shadow-xl p-5 bg-white-50">
      <h2 className="text-lg underline">Add Coupon</h2>
      <form onSubmit={handleAddCoupon} className="flex gap-5">
        <input
          className="border-1 px-2 py-1 rounded shadow shadow-lg focus:scale-105"
          type="text"
          value={newCouponCode}
          onChange={(e) => setNewCouponCode(e.target.value)}
          placeholder="New coupon code"
          required
        />
        <button
          type="submit"
          className="border-1 px-4 py-2 shadow shadow-lg cursor-pointer rounded bg-blue-400 hover:scale-110 hover:bg-blue-300"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;
