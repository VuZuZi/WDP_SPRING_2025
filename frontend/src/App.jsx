import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext"; // Lấy role từ authContext

import Home from "./home/Home";
import AdminDashboard from "./pages/AdminDashBoard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import DetailRoom from "./pages/detail_room";
import Room from "./pages/room";
import HostLayout from "./pages/HostLayout";
import HostPage from "./pages/HostPage";

// Component bảo vệ route
const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth(); // Lấy user từ authContext
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return element;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/room/:id" element={<DetailRoom />} />
        <Route path="/room" element={<Room />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Chỉ Admin mới vào được Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              allowedRoles={["admin"]}
            />
          }
        />

        {/* Chỉ Employee mới vào được Employee Dashboard */}
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute
              element={<EmployeeDashboard />}
              allowedRoles={["employee"]}
            />
          }
        />

        {/* Host Pages */}
        <Route
          path="/my-rooms"
          element={
            <ProtectedRoute element={<HostLayout />} allowedRoles={["host"]} />
          }
        >
          <Route index element={<HostPage />} />
          <Route path="room" element={<HostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
