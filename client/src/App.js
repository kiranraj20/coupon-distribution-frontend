import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import UserCoupon from './pages/UserCoupon';
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useContext(AuthContext);
  return isAdmin ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAdmin } = useContext(AuthContext);
  return isAdmin ? <Navigate to="/admin" /> : children; // Redirect to admin if already logged in
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<UserCoupon />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;