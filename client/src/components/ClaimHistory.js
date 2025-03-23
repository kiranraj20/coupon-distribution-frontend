import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const ClaimHistory = ({ claims, claimPage, setClaimPage, claimTotalPages }) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center border-1 min-w-1/2 max-w-full rounded shadow shadow-xl p-5">
      <h2 className="text-lg underline">Claim History</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>IP</th>
            <th>Cookie ID</th>
            <th>Coupon</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim._id}>
              <td>
                <div className="flex items-center justify-center">
                  {claim.ip}
                </div>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  {claim.cookieId}
                </div>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  {claim.couponId.code}
                </div>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  {new Date(claim.timestamp).toLocaleString()}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination flex w-1/2 justify-between">
        <button
          disabled={claimPage === 1}
          onClick={() => setClaimPage(claimPage - 1)}
        >
          <FaAngleLeft className="text-xl cursor-pointer" />
        </button>
        <span>
          Page {claimPage} of {claimTotalPages}
        </span>
        <button
          disabled={claimPage === claimTotalPages}
          onClick={() => setClaimPage(claimPage + 1)}
        >
          <FaAngleRight className="text-xl cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default ClaimHistory;
