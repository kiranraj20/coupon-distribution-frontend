import axios from "axios";
import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const ViewCoupon = ({
  setCoupons,
  coupons,
  accessToken,
  couponPage,
  setCouponPage,
  couponTotalPages,
  fetchData,
}) => {
  const API = 'https://coupon-distribution-backend-seven.vercel.app';
  const handleUpdateCoupon = async (id, updatedCode) => {
    try {
      const res = await axios.put(
        `${API}/api/coupons/${id}`,
        { code: updatedCode },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setCoupons(coupons.map((c) => (c._id === id ? res.data : c)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleCoupon = async (id, currentStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/coupons/${id}`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setCoupons(coupons.map((c) => (c._id === id ? res.data : c)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        await axios.delete(`http://localhost:5000/api/coupons/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setCoupons(coupons.filter((c) => c._id !== id));
        fetchData();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to delete coupon");
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center border-1 min-w-1/2 max-w-full rounded shadow shadow-xl p-5 bg-gray-50">
      <h2 className="text-lg underline">Coupons</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Code</th>
            <th>Claimed</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {coupons.map((coupon) => (
            <tr key={coupon._id} className="">
              <td>
                <div className="flex items-center justify-center">
                  <input
                    className="border-1 px-2 py-1 rounded shadow shadow-lg focus:scale-105 my-1"
                    defaultValue={coupon.code}
                    onBlur={(e) =>
                      handleUpdateCoupon(coupon._id, e.target.value)
                    }
                  />
                </div>
              </td>
              <td className="flex items-center justify-center my-1">
                {coupon.isClaimed ? "Yes" : "No"}
              </td>
              <td>
                <div className="flex items-center justify-center">
                  <input
                    className="flex items-center justify-center cursor-pointer my-1"
                    type="checkbox"
                    checked={coupon.isActive}
                    onChange={() =>
                      handleToggleCoupon(coupon._id, coupon.isActive)
                    }
                  />
                </div>
              </td>
              <td className="flex items-center justify-center py-1">
                <button
                  onClick={() => handleDeleteCoupon(coupon._id)}
                  className="border-1 px-4 py-1 shadow shadow-lg cursor-pointer rounded bg-blue-400 hover:scale-110 hover:bg-blue-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination flex w-1/2 justify-between">
        <button
          disabled={couponPage === 1}
          onClick={() => setCouponPage(couponPage - 1)}
        >
          <FaAngleLeft className="text-xl cursor-pointer" />
        </button>
        <span>
          Page {couponPage} of {couponTotalPages}
        </span>
        <button
          disabled={couponPage === couponTotalPages}
          onClick={() => setCouponPage(couponPage + 1)}
        >
          <FaAngleRight className="text-xl cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default ViewCoupon;
