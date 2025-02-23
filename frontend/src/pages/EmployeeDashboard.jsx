import React from "react";
import './image.css';
const EmployeeDashboard = () =>{
    return(
        <div>
        <header id="header-top" className="header-top">
             <ul>
               <li>
                 <div className="header-top-left">
                   <ul>
                     <li className="select-opt">
                       <select name="language" id="language">
                         <option value="default">EN</option>
                         <option value="Bangla">BN</option>
                         <option value="Arabic">AB</option>
                       </select> 
                     </li>
                       
                     
                     <li className="select-opt">
                       <select name="currency" id="currency">
                         <option value="usd">USD</option>
                         <option value="euro">Euro</option>
                         <option  ption value="bdt">BDT</option>
                       </select>
                     </li>
                     <li className="select-opt">
                       <a href="#"><span className="lnr lnr-magnifier"></span></a>
                     </li>
                   </ul>
                 </div>
               </li>
               <li className="head-responsive-right pull-right">
                <li className="header-top-contact">+84 0908 290 345</li>
<li className="select-opt">
  <a href="/login">SignOut</a>
</li>
<li className="select-opt" href="/profile">
  {/* <a href="/profile"> */}
    <img 
      src="https://i.pravatar.cc/40" 
      alt="User Avatar" 
      className="avatar-img"
    />
  {/* </a> */}
</li>
               </li>
             </ul>
           </header>
           <nav className="navbar">
             <div className="logo">
               <span className="text-black">List</span><span className="text-red">ROOM RENT</span>
             </div>
             <div className="nav-links">
               <a href="/">HOME</a>
               <a href="#">ROOM</a>
               <a href="#">EXPLORE</a>
               <a href="#">REVIEW</a>
               <a href="#">BLOG</a>
               <a href="#">CONTACT</a>
             </div>
           </nav>
        </div>
    )
}

export default EmployeeDashboard;