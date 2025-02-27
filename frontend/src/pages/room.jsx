import React, { useEffect, useState } from "react";
import "./detail_room.css";
import Navbar from "../component/navbar";
import { useAuth } from "../context/AuthContext";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();

  const roomsPerPage = 6;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/rooms/list");
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setRooms(Array.isArray(data) ? data : data.rooms || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(rooms.length / roomsPerPage);
  // console.log(currentRooms[1].Status);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Tạo các nút số trang
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  if (loading)
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Đang tải danh sách phòng...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <p className="error-message">Lỗi: {error}</p>
        <button onClick={() => window.location.reload()}>Thử lại</button>
      </div>
    );

  return (
    <div className="explore-content1">
      <Navbar role={user?.role} />
      {/* <nav className="navbar">
        <div className="logo">
          <span className="text-black">List</span>
          <span className="text-red">ROOM RENT</span>
        </div>
        <div className="nav-links">
          <a href="/">HOME</a>
          <a href="/room">ROOM</a>
          <a href="#">EXPLORE</a>
          <a href="#">REVIEW</a>
          <a href="#">BLOG</a>
          <a href="#">CONTACT</a>
        </div>
      </nav> */}
      <div className="section-title">
        <h2>Danh Sách Phòng</h2>
        <p>
          Khám phá các lựa chọn phòng tuyệt vời của chúng tôi tại nhiều địa điểm
          hấp dẫn
        </p>
      </div>

      <div className="row">
        {currentRooms.map((room, index) => (
          <div key={room._id || index} className="col-md-4 col-sm-6">
            <div className="single-explore-item">
              <div className="single-explore-img">
                <img
                  src={room.Image || "/placeholder-room.jpg"}
                  alt={`Phòng tại ${room.Location}`}
                />
                <div className="explore-item-overlay">
                  <a href={`/room/${room.RoomID}`} className="btn-view-details">
                    Xem Chi Tiết
                  </a>
                </div>
              </div>
              <div className={`single-explore-txt bg-theme-${(index % 5) + 1}`}>
                <h2>
                  <a href={`/room/${room.RoomID}`}>{room.Location}</a>
                </h2>
                <div className="room-features">
                  <span>
                    <i className="icon-bed"></i> 2 Phòng ngủ
                  </span>
                  <span>
                    <i className="icon-bath"></i> 1 Phòng tắm
                  </span>
                  <span>
                    <i className="icon-size"></i> 75m²
                  </span>
                </div>
                <p className="explore-rating-price">
                  <span className="explore-status">
                    <span>{room.Status}</span>
                  </span>
                  <span className="explore-price-box">
                    từ <span className="explore-price">{room.Price || 0}$</span>
                    <span className="explore-price-period">/đêm</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="pagination-arrow"
          >
            &laquo;
          </button>

          {renderPageNumbers()}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="pagination-arrow"
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomList;
