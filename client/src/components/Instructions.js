import React from 'react';
import './Instructions.css'; // Optional: For styling

const Instructions = () => {
  // Replace these with your actual Vercel deployment URLs
  const frontendUrl = 'https://coupon-distribution-frontend-three.vercel.app';
  const backendUrl = 'https://coupon-distribution-backend-seven.vercel.app/';

  return (
    <div className="instructions-container">
      <h1>How the Coupon Distribution Application Works</h1>

      <section>
        <h2>Overview</h2>
        <p>
          This is a full-stack web application designed to distribute coupons to users in a round-robin manner and provide an admin panel for managing those coupons. Whether you're a guest user looking to claim a discount or an admin managing the system, this app has you covered!
        </p>
      </section>

      <section>
        <h2>How It Works</h2>
        <h3>For Users</h3>
        <ul>
          <li>
            <strong>Claim a Coupon</strong>: Visit <a href={`${frontendUrl}/`}>{frontendUrl}/</a> and click "Claim Coupon". You’ll receive the next available coupon if you haven’t claimed one in the last minute.
          </li>
          <li>
            <strong>Abuse Prevention</strong>: To keep it fair, you can only claim one coupon every minute. We track this using your browser session and IP address.
          </li>
          <li>
            <strong>Feedback</strong>: After claiming, you’ll see a message like "Coupon claimed: SAVE10" or an error if no coupons are available or if you need to wait.
          </li>
        </ul>

        <h3>For Admins</h3>
        <ul>
          <li>
            <strong>Login</strong>: Go to <a href={`${frontendUrl}/login`}>{frontendUrl}/login</a> and log in with admin credentials. If your session is still valid, you’ll be taken straight to the admin panel.
          </li>
          <li>
            <strong>Manage Coupons</strong>: At <a href={`${frontendUrl}/admin`}>{frontendUrl}/admin</a>, you can:
            <ul>
              <li>Add new coupons.</li>
              <li>Edit coupon codes or toggle their availability.</li>
              <li>Delete unclaimed coupons.</li>
              <li>View all coupons (paginated, 5 per page).</li>
            </ul>
          </li>
          <li>
            <strong>Track Claims</strong>: See a history of who claimed which coupons, also paginated (5 per page), updated every 5 seconds.
          </li>
          <li>
            <strong>Security</strong>: Your session uses tokens that refresh automatically, so you don’t need to log in often unless you close the tab.
          </li>
        </ul>
      </section>

      <section>
        <h2>API Endpoints</h2>
        <p>
          The backend is hosted at <a href={backendUrl}>{backendUrl}</a>. Below are the key endpoints powering the app:
        </p>

        <h3>User Endpoints</h3>
        <ul>
          <li>
            <strong>GET {backendUrl}/api/claim</strong>
            <p>Claims the next available coupon. Returns the coupon code or an error if none are available or if you’re on cooldown.</p>
            <pre><code>Example Response:<br />{`{ "coupon": "SAVE10" }`}</code></pre>
          </li>
        </ul>

        <h3>Admin Endpoints</h3>
        <ul>
          <li>
            <strong>POST {backendUrl}/api/admin/login</strong>
            <p>Logs in the admin with credentials. Returns access and refresh tokens.</p>
            <pre><code>Request:<br />{`{ "username": "admin", "password": "secret123" }`}<br />Response:<br />{`{ "accessToken": "...", "refreshToken": "..." }`}</code></pre>
          </li>
          <li>
            <strong>POST {backendUrl}/api/admin/refresh</strong>
            <p>Refreshes the access token using the refresh token.</p>
            <pre><code>Request:<br />{`{ "refreshToken": "..." }`}<br />Response:<br />{`{ "accessToken": "..." }`}</code></pre>
          </li>
          <li>
            <strong>POST {backendUrl}/api/admin/logout</strong>
            <p>Logs out the admin by invalidating the refresh token.</p>
          </li>
          <li>
            <strong>GET {backendUrl}/api/admin/coupons?page=1&limit=5</strong>
            <p>Lists all coupons with pagination. Requires admin token.</p>
            <pre><code>Response:<br />{`{ "coupons": [...], "total": 10, "currentPage": 1, "totalPages": 2 }`}</code></pre>
          </li>
          <li>
            <strong>POST {backendUrl}/api/admin/coupons</strong>
            <p>Adds a new coupon. Requires admin token.</p>
            <pre><code>Request:<br />{`{ "code": "NEW10" }`}<br />Response:<br />{`{ "code": "NEW10", "isClaimed": false, "isActive": true, ... }`}</code></pre>
          </li>
          <li>
            <strong>PUT {backendUrl}/api/admin/coupons/:id</strong>
            <p>Updates a coupon’s code or active status. Requires admin token.</p>
            <pre><code>Request:<br />{`{ "code": "UPDATED10", "isActive": false }`}</code></pre>
          </li>
          <li>
            <strong>DELETE {backendUrl}/api/admin/coupons/:id</strong>
            <p>Deletes an unclaimed coupon. Requires admin token.</p>
          </li>
          <li>
            <strong>GET {backendUrl}/api/admin/claims?page=1&limit=5</strong>
            <p>Lists claim history with pagination. Requires admin token.</p>
            <pre><code>Response:<br />{`{ "claims": [...], "total": 8, "currentPage": 1, "totalPages": 2 }`}</code></pre>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Instructions;