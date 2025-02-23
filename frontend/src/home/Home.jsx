import React from 'react';
import { FiSearch } from "react-icons/fi";
import b1 from "../../public/images/blog/b1.jpg";
import b2 from "../../public/images/blog/b2.jpg";
import b3 from "../../public/images/blog/b3.jpg";
import e1 from "../../public/images/explore/e1.jpg";
import e2 from "../../public/images/explore/e2.jpg";
import e3 from "../../public/images/explore/e3.jpg";
import e4 from "../../public/images/explore/e4.jpg";
import e5 from "../../public/images/explore/e5.jpg";
import e6 from "../../public/images/explore/e6.jpg";
import person from "../../public/images/explore/person.png";
import './animate.css';
import './bootsnav.css';
import './bootstrap.min.css';
import './flaticon.css';
import './font-awesome.min.css';
import './home.css';
import './linearicons.css';
import './responsive.css';
import './slick-theme.css';
import './slick.css';
import logowelcome from "./welcome-hero/banner.jpg";
const DirectoryLandingPage = () => {
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
          <div className="header-top-right">
            <ul>
              <li className="header-top-contact">+84 0908 290 345</li>
              <li className="header-top-contact"><a href="/login">sign in</a></li>
              <li className="header-top-contact"><a href="/register">register</a></li>
            </ul>
          </div>
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

    <section id="home" className="welcome-hero py-16 bg-gray-100">
    <div className="absolute inset-0">
    <img
          src={logowelcome}
          alt="City skyline at dusk with buildings and water"
          className="w-full h-screen object-cover"
          width="1920"
          height="1080"
        />
      </div>
      <div className="overlay"></div>
        <div className="text-container">
          <h1>
          BEST PLACE TO FIND AND EXPLORE RENTAL ROOMS THAT SUIT ALL YOUR NEEDS.
          </h1>
          <p>
          Find for rooms, apartments, rentals and more with just one click.
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
                  Find the perfect room to rent, with spacious options and affordable prices. Our listings provide you with a variety of choices to meet your needs, ensuring comfort and convenience.
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
                <img src={e1} alt="explore image" />
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
                            src={person}
                            alt="explore person"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <p>
                      Find the perfect room to rent, with spacious options and affordable prices. Our listings provide you with a variety of choices to meet your needs, ensuring comfort and convenience....
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
                <img src={e2} alt="explore image" />
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
                            src={person}
                            alt="explore person"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <p>
                      Find the perfect room to rent, with spacious options and affordable prices. Our listings provide you with a variety of choices to meet your needs, ensuring comfort and convenience...
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
                <img src={e3} alt="explore image" />
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
                            src={person}
                            alt="explore person"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <p>
                      Find the perfect room to rent, with spacious options and affordable prices. Our listings provide you with a variety of choices to meet your needs, ensuring comfort and convenience.....
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
                <img src={e4} alt="explore image" />
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
                            src={person}
                            alt="explore person"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <p>
                      Find the perfect room to rent, with spacious options and affordable prices. Our listings provide you with a variety of choices to meet your needs, ensuring comfort and convenience.....
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
                <img src={e5} alt="explore image" />
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
                            src={person}
                            alt="explore person"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <p>
                      Find the perfect room to rent, with spacious options and affordable prices. Our listings provide you with a variety of choices to meet your needs, ensuring comfort and convenience.....
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
                <img src={e6} alt="explore image" />
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
                            src={person}
                            alt="explore person"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <p>
                      Find the perfect room to rent, with spacious options and affordable prices. Our listings provide you with a variety of choices to meet your needs, ensuring comfort and convenience.....
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
   
  <section id="statistics" className="statistics">
    <div className="container">
      <div className="statistics-counter">
        <div className="col-md-3 col-sm-6">
          <div className="single-ststistics-box">
            <div className="statistics-content">
              <div className="counter">90 </div> <span>K+</span>
            </div>
            {/*/.statistics-content*/}
            <h3>listings</h3>
          </div>
          {/*/.single-ststistics-box*/}
        </div>
        {/*/.col*/}
        <div className="col-md-3 col-sm-6">
          <div className="single-ststistics-box">
            <div className="statistics-content">
              <div className="counter">40</div> <span>k+</span>
            </div>
            {/*/.statistics-content*/}
            <h3>listing categories</h3>
          </div>
          {/*/.single-ststistics-box*/}
        </div>
        {/*/.col*/}
        <div className="col-md-3 col-sm-6">
          <div className="single-ststistics-box">
            <div className="statistics-content">
              <div className="counter">65</div> <span>k+</span>
            </div>
            {/*/.statistics-content*/}
            <h3>visitors</h3>
          </div>
          {/*/.single-ststistics-box*/}
        </div>
        {/*/.col*/}
        <div className="col-md-3 col-sm-6">
          <div className="single-ststistics-box">
            <div className="statistics-content">
              <div className="counter">50</div> <span>k+</span>
            </div>
            {/*/.statistics-content*/}
            <h3>happy clients</h3>
          </div>
          {/*/.single-ststistics-box*/}
        </div>
        {/*/.col*/}
      </div>
      {/*/.statistics-counter*/}
    </div>
    {/*/.container*/}
  </section>
  {/*/.counter*/}
  {/* statistics end */}
  {/*blog start */}
  <section id="blog" className="blog">
    <div className="container">
      <div className="section-header">
        <h2>news and articles</h2>
        <p>Always upto date with our latest News and Articles </p>
      </div>
      {/*/.section-header*/}
      <div className="blog-content">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <div className="single-blog-item">
              <div className="single-blog-item-img">
                <img src={b1} alt="blog image" />
              </div>
              <div className="single-blog-item-txt">
                <h2>
                  <a href="#">How to Find Your Perfect Room Faster</a>
                </h2>
                <h4>
                  posted <span>by</span> <a href="#">admin</a> march 2018
                </h4>
                <p>
                Find the perfect room to rent, with spacious options and affordable prices. Our listings provide you with a variety of choices to meet your needs, ensuring comfort and convenience...
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="single-blog-item">
              <div className="single-blog-item-img">
                <img src={b2}alt="blog image" />
              </div>
              <div className="single-blog-item-txt">
                <h2>
                  <a href="#">How To Connect With My Friend Room Faster </a>
                </h2>
                <h4>
                  posted <span>by</span> <a href="#">admin</a> march 2018
                </h4>
                <p>
                Find the perfect room to rent, with spacious options and affordable prices. Our listings provide you with a variety of choices to meet your needs, ensuring comfort and convenience.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="single-blog-item">
              <div className="single-blog-item-img">
                <img src={b3} alt="blog image" />
              </div>
              <div className="single-blog-item-txt">
                <h2>
                  <a href="#">How to Looking For Your Perfect Room Faster</a>
                </h2>
                <h4>
                  posted <span>by</span> <a href="#">admin</a> march 2018
                </h4>
                <p>
                Find the perfect room to rent, with spacious options and affordable prices. Our listings provide you with a variety of choices to meet your needs, ensuring comfort and convenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*/.container*/}
  </section>
  {/*/.blog*/}
  {/*blog end */}
  {/*subscription strat */}
  <section id="contact" className="subscription">
    <div className="container">
      <div className="subscribe-title text-center">
        <h2>Would You Like to Add Your Rental Listings with Us?</h2>
        <p>
        Listrace offers you the opportunity to list your business with us, and we are fully equipped to promote your business.
        </p>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="subscription-input-group">
            <form action="#">
              <input
                type="email"
                className="subscription-input-form"
                placeholder="Enter your email here"
              />
              <button
                className="appsLand-btn subscribe-btn"
                onclick="window.location.href='#'"
              >
                creat account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*/subscription*/}
  {/*subscription end */}
  {/*footer start*/}
  <footer id="footer" className="footer">
    <div className="container">
      <div className="footer-menu">
        <div className="row">
          <div className="col-sm-3">
            <div className="navbar-header">
              <a className="navbar-brand" href="index.html">
                list<span>ROOM RENT</span>
              </a>
            </div>
            {/*/.navbar-header*/}
          </div>
          <div className="col-sm-9">
            <ul className="footer-menu-item">
              <li className="scroll">
                <a href="#works">how it works</a>
              </li>
              <li className="scroll">
                <a href="#explore">explore</a>
              </li>
              <li className="scroll">
                <a href="#reviews">review</a>
              </li>
              <li className="scroll">
                <a href="#blog">blog</a>
              </li>
              <li className="scroll">
                <a href="#contact">contact</a>
              </li>
              <li className=" scroll">
                <a href="#contact">my account</a>
              </li>
            </ul>
            {/*/.nav */}
          </div>
        </div>
      </div>
      <div className="hm-footer-copyright">
        <div className="row">
          <div className="col-sm-5">
            {/*/p*/}
          </div>
          <div className="col-sm-7">
            <div className="footer-social">
              <span>
                <i className="fa fa-phone"> +84 0908 290 345</i>
              </span>
              <a href="#">
                <i className="fa fa-facebook" />
              </a>
              <a href="#">
                <i className="fa fa-twitter" />
              </a>
              <a href="#">
                <i className="fa fa-linkedin" />
              </a>
              <a href="#">
                <i className="fa fa-google-plus" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/*/.hm-footer-copyright*/}
    </div>
    {/*/.container*/}
    <div id="scroll-Top">
      <div className="return-to-top">
        <i
          className="fa fa-angle-up "
          id="scroll-top"
          data-toggle="tooltip"
          data-placement="top"
          title=""
          data-original-title="Back to Top"
          aria-hidden="true"
        />
      </div>
    </div>
    {/*/.scroll-Top*/}
  </footer>
  </section>
    </section>
        </div>
    );
};
const topics = [
    { name: "room rent", icon: "flaticon-restaurant", listings: 150 },
    { name: "technology", icon: "flaticon-travel", listings: 214 },
    { name: "service", icon: "flaticon-building", listings: 185 },
    { name: "rating", icon: "flaticon-pills", listings: 200 },
    ,
  ];

  const scripts = [
    "https://code.jquery.com/jquery-3.6.4.min.js",
    "assets/js/jquery.js",
    "https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js",
    "assets/js/bootstrap.min.js",
    "assets/js/bootsnav.js",
    "assets/js/feather.min.js",
    "assets/js/jquery.counterup.min.js",
    "assets/js/waypoints.min.js",
    "assets/js/slick.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js",
    "assets/js/custom.js"
  ];
export default DirectoryLandingPage;
