import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Nagivate to="/admin-dashboard"/>}></Route> */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/room/:id" element={<DetailRoom />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/room" element={<Room />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
        <Route
          path="/employee-dashboard"
          element={<EmployeeDashboard />}
        ></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>

        {/* Host layout với nested routes */}
        <Route path="/host" element={<HostLayout />}>
          <Route index element={<HostPage />} />
          <Route path="room" element={<HostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
