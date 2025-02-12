import React from 'react';
import { FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom'; 


const DirectoryLandingPage = () => {
  const { user, logout } = useAuth(); 
    return (
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
                  <option value="bdt">BDT</option>
                </select>
              </li>
              <li className="select-opt">
                <a href="#"><span className="lnr lnr-magnifier"></span></a>
              </li>
            </ul>
          </div>
        </li>
        <li className="head-responsive-right pull-right">
          <div className="header-top-right">
            <ul>
              <li className="header-top-contact">+1 222 777 6565</li>
              {user ? (
                      <>
                        <li className="header-top-contact">Hello, {user.name}</li>
                        <li className="header-top-contact">
                        <Link to={`/profile`} className="profile-btn">My Profile</Link>
                        </li>
                        <li className="header-top-contact">
                          <button onClick={logout} className="logout-btn">
                              Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      // Nếu chưa đăng nhập
                      <>
                        <li className="header-top-contact"><a href="/login">Sign In</a></li>
                        <li className="header-top-contact"><a href="/register">Register</a></li>
                      </>
                    )}
                  </ul>
                </div>
              </li>
            </ul>
    </header>
            <section className="top-area">
      <div className="header-area">
        <nav className="navbar navbar-default bootsnav navbar-sticky navbar-scrollspy">
          <div className="container mx-auto px-4 flex justify-between items-center py-4">
            <div className="navbar-header flex items-center">
              <button className="navbar-toggle text-xl">
                <FaBars />
              </button>
              <a className="navbar-brand text-2xl font-bold ml-4" href="index.html">
                list<span className="text-red-500">race</span>
              </a>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#home" className="hover:text-red-500">Home</a>
              <a href="#works" className="hover:text-red-500">How it works</a>
              <a href="#explore" className="hover:text-red-500">Explore</a>
              <a href="#reviews" className="hover:text-red-500">Review</a>
              <a href="#blog" className="hover:text-red-500">Blog</a>
              <a href="#contact" className="hover:text-red-500">Contact</a>
            </div>
          </div>
        </nav>
      </div>
    </section>
    <section id="home" className="welcome-hero py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold">Best place to find and explore <br /> that all you need</h2>
        <p className="text-gray-600 mt-4">
          Find Best Place, Restaurant, Hotel, Real Estate and many more in just one click
        </p>
        <div className="welcome-hero-serch-box mt-8 flex justify-center space-x-4">
          <div className="single-welcome-hero-form bg-white p-4 shadow-md rounded-lg flex items-center">
            <input type="text" placeholder="Ex: place, restaurant, food, automobile" className="border-none focus:outline-none" />
          </div>
          <div className="single-welcome-hero-form bg-white p-4 shadow-md rounded-lg flex items-center">
            <input type="text" placeholder="Ex: London, New York, Rome" className="border-none focus:outline-none" />
          </div>
          <button className="welcome-hero-btn bg-red-500 text-white px-6 py-3 rounded-lg flex items-center">
            Search <FiSearch className="ml-2" />
          </button>
        </div>
      </div>
    </section>
    <section id="list-topics" className="list-topics">
      <div className="container">
        <div className="list-topics-content">
          <ul>
            {topics.map((topic, index) => (
              <li key={index}>
                <div className="single-list-topics-content">
                  <div className="single-list-topics-icon">
                    <i className={topic.icon}></i>
                  </div>
                  <h2>
                    <a href="#">{topic.name}</a>
                  </h2>
                  <p>{topic.listings} listings</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <section id="works" className="works">
      <div className="container">
        <div className="section-header">
          <h2>how it works</h2>
          <p>Learn More about how our website works</p>
        </div>
        <div className="works-content">
          <div className="row">
            {[ 
              { icon: "flaticon-lightbulb-idea", title: "choose what to do" },
              { icon: "flaticon-networking", title: "find what you want" },
              { icon: "flaticon-location-on-road", title: "explore amazing place" }
            ].map((item, index) => (
              <div className="col-md-4 col-sm-6" key={index}>
                <div className="single-how-works">
                  <div className="single-how-works-icon">
                    <i className={item.icon}></i>
                  </div>
                  <h2><a href="#">{item.title}</a></h2>
                  <p>
                    Lorem ipsum dolor sit amet, consecte adipisicing elit, sed do eiusmod tempor incididunt ut labore magna aliqua.
                  </p>
                  <button 
                    className="welcome-hero-btn how-work-btn" 
                    onClick={() => window.location.href = '#'}>
                    read more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <section id="explore" className="explore">
    <div className="container">
      <div className="section-header">
        <h2>explore</h2>
        <p>Explore New place, food, culture around the world and many more</p>
      </div>
      {/*/.section-header*/}
      <div className="explore-content">
        <div className="row">
          <div className=" col-md-4 col-sm-6">
            <div className="single-explore-item">
              <div className="single-explore-img">
                <img src="assets/images/explore/e1.jpg" alt="explore image" />
                <div className="single-explore-img-info">
                  <button onclick="window.location.href='#'">best rated</button>
                  <div className="single-explore-image-icon-box">
                    <ul>
                      <li>
                        <div className="single-explore-image-icon">
                          <i className="fa fa-arrows-alt" />
                        </div>
                      </li>
                      <li>
                        <div className="single-explore-image-icon">
                          <i className="fa fa-bookmark-o" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="single-explore-txt bg-theme-1">
                <h2>
                  <a href="#">tommy helfinger bar</a>
                </h2>
                <p className="explore-rating-price">
                  <span className="explore-rating">5.0</span>
                  <a href="#"> 10 ratings</a>
                  <span className="explore-price-box">
                    form
                    <span className="explore-price">5$-300$</span>
                  </span>
                  <a href="#">resturent</a>
                </p>
                <div className="explore-person">
                  <div className="row">
                    <div className="col-sm-2">
                      <div className="explore-person-img">
                        <a href="#">
                          <img
                            src="assets/images/explore/person.png"
                            alt="explore person"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incid ut labore et dolore
                        magna aliqua....
                      </p>
                    </div>
                  </div>
                </div>
                <div className="explore-open-close-part">
                  <div className="row">
                    <div className="col-sm-5">
                      <button
                        className="close-btn"
                        onclick="window.location.href='#'"
                      >
                        close now
                      </button>
                    </div>
                    <div className="col-sm-7">
                      <div className="explore-map-icon">
                        <a href="#">
                          <i data-feather="map-pin" />
                        </a>
                        <a href="#">
                          <i data-feather="upload" />
                        </a>
                        <a href="#">
                          <i data-feather="heart" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="single-explore-item">
              <div className="single-explore-img">
                <img src="assets/images/explore/e2.jpg" alt="explore image" />
                <div className="single-explore-img-info">
                  <button onclick="window.location.href='#'">featured</button>
                  <div className="single-explore-image-icon-box">
                    <ul>
                      <li>
                        <div className="single-explore-image-icon">
                          <i className="fa fa-arrows-alt" />
                        </div>
                      </li>
                      <li>
                        <div className="single-explore-image-icon">
                          <i className="fa fa-bookmark-o" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="single-explore-txt bg-theme-2">
                <h2>
                  <a href="#">swim and dine resort</a>
                </h2>
                <p className="explore-rating-price">
                  <span className="explore-rating">4.5</span>
                  <a href="#"> 8 ratings</a>
                  <span className="explore-price-box">
                    form
                    <span className="explore-price">50$-500$</span>
                  </span>
                  <a href="#">hotel</a>
                </p>
                <div className="explore-person">
                  <div className="row">
                    <div className="col-sm-2">
                      <div className="explore-person-img">
                        <a href="#">
                          <img
                            src="assets/images/explore/person.png"
                            alt="explore person"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incid ut labore et dolore
                        magna aliqua....
                      </p>
                    </div>
                  </div>
                </div>
                <div className="explore-open-close-part">
                  <div className="row">
                    <div className="col-sm-5">
                      <button
                        className="close-btn open-btn"
                        onclick="window.location.href='#'"
                      >
                        open now
                      </button>
                    </div>
                    <div className="col-sm-7">
                      <div className="explore-map-icon">
                        <a href="#">
                          <i data-feather="map-pin" />
                        </a>
                        <a href="#">
                          <i data-feather="upload" />
                        </a>
                        <a href="#">
                          <i data-feather="heart" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="single-explore-item">
              <div className="single-explore-img">
                <img src="assets/images/explore/e3.jpg" alt="explore image" />
                <div className="single-explore-img-info">
                  <button onclick="window.location.href='#'">best rated</button>
                  <div className="single-explore-image-icon-box">
                    <ul>
                      <li>
                        <div className="single-explore-image-icon">
                          <i className="fa fa-arrows-alt" />
                        </div>
                      </li>
                      <li>
                        <div className="single-explore-image-icon">
                          <i className="fa fa-bookmark-o" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="single-explore-txt bg-theme-3">
                <h2>
                  <a href="#">europe tour</a>
                </h2>
                <p className="explore-rating-price">
                  <span className="explore-rating">5.0</span>
                  <a href="#"> 15 ratings</a>
                  <span className="explore-price-box">
                    form
                    <span className="explore-price">5k$-10k$</span>
                  </span>
                  <a href="#">destination</a>
                </p>
                <div className="explore-person">
                  <div className="row">
                    <div className="col-sm-2">
                      <div className="explore-person-img">
                        <a href="#">
                          <img
                            src="assets/images/explore/person.png"
                            alt="explore person"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incid ut labore et dolore
                        magna aliqua....
                      </p>
                    </div>
                  </div>
                </div>
                <div className="explore-open-close-part">
                  <div className="row">
                    <div className="col-sm-5">
                      <button
                        className="close-btn"
                        onclick="window.location.href='#'"
                      >
                        close now
                      </button>
                    </div>
                    <div className="col-sm-7">
                      <div className="explore-map-icon">
                        <a href="#">
                          <i data-feather="map-pin" />
                        </a>
                        <a href="#">
                          <i data-feather="upload" />
                        </a>
                        <a href="#">
                          <i data-feather="heart" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-md-4 col-sm-6">
            <div className="single-explore-item">
              <div className="single-explore-img">
                <img src="assets/images/explore/e4.jpg" alt="explore image" />
                <div className="single-explore-img-info">
                  <button onclick="window.location.href='#'">most view</button>
                  <div className="single-explore-image-icon-box">
                    <ul>
                      <li>
                        <div className="single-explore-image-icon">
                          <i className="fa fa-arrows-alt" />
                        </div>
                      </li>
                      <li>
                        <div className="single-explore-image-icon">
                          <i className="fa fa-bookmark-o" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="single-explore-txt bg-theme-4">
                <h2>
                  <a href="#">banglow with swiming pool</a>
                </h2>
                <p className="explore-rating-price">
                  <span className="explore-rating">5.0</span>
                  <a href="#"> 10 ratings</a>
                  <span className="explore-price-box">
                    form
                    <span className="explore-price">10k$-15k$</span>
                  </span>
                  <a href="#">real estate</a>
                </p>
                <div className="explore-person">
                  <div className="row">
                    <div className="col-sm-2">
                      <div className="explore-person-img">
                        <a href="#">
                          <img
                            src="assets/images/explore/person.png"
                            alt="explore person"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incid ut labore et dolore
                        magna aliqua....
                      </p>
                    </div>
                  </div>
                </div>
                <div className="explore-open-close-part">
                  <div className="row">
                    <div className="col-sm-5">
                      <button
                        className="close-btn"
                        onclick="window.location.href='#'"
                      >
                        close now
                      </button>
                    </div>
                    <div className="col-sm-7">
                      <div className="explore-map-icon">
                        <a href="#">
                          <i data-feather="map-pin" />
                        </a>
                        <a href="#">
                          <i data-feather="upload" />
                        </a>
                        <a href="#">
                          <i data-feather="heart" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="single-explore-item">
              <div className="single-explore-img">
                <img src="assets/images/explore/e5.jpg" alt="explore image" />
                <div className="single-explore-img-info">
                  <button onclick="window.location.href='#'">featured</button>
                  <div className="single-explore-image-icon-box">
                    <ul>
                      <li>
                        <div className="single-explore-image-icon">
                          <i className="fa fa-arrows-alt" />
                        </div>
                      </li>
                      <li>
                        <div className="single-explore-image-icon">
                          <i className="fa fa-bookmark-o" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="single-explore-txt bg-theme-2">
                <h2>
                  <a href="#">vintage car expo</a>
                </h2>
                <p className="explore-rating-price">
                  <span className="explore-rating">4.2</span>
                  <a href="#"> 8 ratings</a>
                  <span className="explore-price-box">
                    form
                    <span className="explore-price">500$-1200$</span>
                  </span>
                  <a href="#">automotion</a>
                </p>
                <div className="explore-person">
                  <div className="row">
                    <div className="col-sm-2">
                      <div className="explore-person-img">
                        <a href="#">
                          <img
                            src="assets/images/explore/person.png"
                            alt="explore person"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incid ut labore et dolore
                        magna aliqua....
                      </p>
                    </div>
                  </div>
                </div>
                <div className="explore-open-close-part">
                  <div className="row">
                    <div className="col-sm-5">
                      <button
                        className="close-btn open-btn"
                        onclick="window.location.href='#'"
                      >
                        open now
                      </button>
                    </div>
                    <div className="col-sm-7">
                      <div className="explore-map-icon">
                        <a href="#">
                          <i data-feather="map-pin" />
                        </a>
                        <a href="#">
                          <i data-feather="upload" />
                        </a>
                        <a href="#">
                          <i data-feather="heart" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="single-explore-item">
              <div className="single-explore-img">
                <img src="assets/images/explore/e6.jpg" alt="explore image" />
                <div className="single-explore-img-info">
                  <button onclick="window.location.href='#'">best rated</button>
                  <div className="single-explore-image-icon-box">
                    <ul>
                      <li>
                        <div className="single-explore-image-icon">
                          <i className="fa fa-arrows-alt" />
                        </div>
                      </li>
                      <li>
                        <div className="single-explore-image-icon">
                          <i className="fa fa-bookmark-o" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="single-explore-txt bg-theme-5">
                <h2>
                  <a href="#">thailand tour</a>
                </h2>
                <p className="explore-rating-price">
                  <span className="explore-rating">5.0</span>
                  <a href="#"> 15 ratings</a>
                  <span className="explore-price-box">
                    form
                    <span className="explore-price">5k$-10k$</span>
                  </span>
                  <a href="#">destination</a>
                </p>
                <div className="explore-person">
                  <div className="row">
                    <div className="col-sm-2">
                      <div className="explore-person-img">
                        <a href="#">
                          <img
                            src="assets/images/explore/person.png"
                            alt="explore person"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incid ut labore et dolore
                        magna aliqua....
                      </p>
                    </div>
                  </div>
                </div>
                <div className="explore-open-close-part">
                  <div className="row">
                    <div className="col-sm-5">
                      <button
                        className="close-btn"
                        onclick="window.location.href='#'"
                      >
                        close now
                      </button>
                    </div>
                    <div className="col-sm-7">
                      <div className="explore-map-icon">
                        <a href="#">
                          <i data-feather="map-pin" />
                        </a>
                        <a href="#">
                          <i data-feather="upload" />
                        </a>
                        <a href="#">
                          <i data-feather="heart" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*/.container*/}
  </section>
    </section>
        </div>
    );
};
const topics = [
    { name: "restaurant", icon: "flaticon-restaurant", listings: 150 },
    { name: "destination", icon: "flaticon-travel", listings: 214 },
    { name: "hotels", icon: "flaticon-building", listings: 185 },
    { name: "healthcare", icon: "flaticon-pills", listings: 200 },
    { name: "automotion", icon: "flaticon-transport", listings: 120 },
  ];
export default DirectoryLandingPage;
