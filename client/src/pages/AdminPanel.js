import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import AddCoupon from "../components/AddCoupon";
import ViewCoupon from "../components/ViewCoupon";
import ClaimHistory from "../components/ClaimHistory";
import InstructionPage from "./InstructionPage";

const AdminPanel = () => {
  const { accessToken, logout } = useContext(AuthContext);
  const [coupons, setCoupons] = useState([]);
  const [claims, setClaims] = useState([]);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [couponPage, setCouponPage] = useState(1);
  const [claimPage, setClaimPage] = useState(1);
  const [couponTotalPages, setCouponTotalPages] = useState(1);
  const [claimTotalPages, setClaimTotalPages] = useState(1);
  const limit = 5;

  const API = 'https://coupon-distribution-backend-seven.vercel.app';

  const fetchData = async () => {
    try {
      const [couponRes, claimRes] = await Promise.all([
        axios.get(
          `${API}/api/coupons?page=${couponPage}&limit=${limit}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        ),
        axios.get(
          `${API}/api/claims?page=${claimPage}&limit=${limit}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        ),
      ]);
      setCoupons(couponRes.data.coupons);
      setClaims(claimRes.data.claims);
      setCouponTotalPages(couponRes.data.totalPages);
      setClaimTotalPages(claimRes.data.totalPages);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) logout();
    }
  };

  const handleHome = () => {
    window.location.href = "/";
  }

  // useEffect(() => {
  //   if (accessToken) {
  //     fetchData();
  //     const interval = setInterval(fetchData, 5000);
  //     return () => clearInterval(interval);
  //   }
  // }, [accessToken, couponPage, claimPage, logout]);

  useEffect(() => {
    if (accessToken) fetchData();
  }, [accessToken, logout, couponPage, claimPage]);

  return (
    <div className="admin-panel flex flex-col gap-5 items-center justify-center min-h-screen bg-blue-50 pt-5">
      <InstructionPage />
      <h1 className="text-2xl underline">Admin Panel</h1>
      <div className="flex flex-col gap-5 items-center justify-center border-1 min-w-1/2 rounded shadow shadow-xl p-5 bg-gray-50">
        <div className="flex gap-5">
          <button
            onClick={handleHome}
            className="border-1 px-4 py-2 shadow shadow-lg cursor-pointer rounded bg-blue-400 hover:scale-110 hover:bg-blue-300"
          >
            Home
          </button>
          <button
            onClick={logout}
            className="border-1 px-4 py-2 shadow shadow-lg cursor-pointer rounded bg-blue-400 hover:scale-110 hover:bg-blue-300"
          >
            Logout
          </button>
          <button
            onClick={fetchData}
            className="border-1 px-4 py-2 shadow shadow-lg cursor-pointer rounded bg-blue-400 hover:scale-110 hover:bg-blue-300"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Add Coupon */}
      <AddCoupon
        newCouponCode={newCouponCode}
        accessToken={accessToken}
        setCoupons={setCoupons}
        coupons={coupons}
        setNewCouponCode={setNewCouponCode}
        fetchData={fetchData}
      />

      {/* View Coupons */}
      <ViewCoupon
        coupons={coupons}
        setCoupons={setCoupons}
        accessToken={accessToken}
        couponPage={couponPage}
        setCouponPage={setCouponPage}
        couponTotalPages={couponTotalPages}
        fetchData={fetchData}
      />

      {/* User Claim History */}
      <ClaimHistory
        claims={claims}
        claimPage={claimPage}
        setClaimPage={setClaimPage}
        claimTotalPages={claimTotalPages}
      />
    </div>
  );
};

export default AdminPanel;
