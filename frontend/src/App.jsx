import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./home/Home"
import AdminDashboard from "./pages/AdminDashBoard"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
function App() {


  return (
   <BrowserRouter>
    <Routes>
        {/* <Route path="/" element={<Nagivate to="/admin-dashboard"/>}></Route> */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
        <Route path="/employee-dashboard" element={<EmployeeDashboard/>}></Route>
        
    </Routes>
   </BrowserRouter>
  )
}

export default App
