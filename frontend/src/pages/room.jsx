import React, { useEffect, useState } from 'react';
import './detail_room.css';
import './room.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 6;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/rooms/list");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

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

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) return <p>Đang tải danh sách phòng...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div className="explore-content">
           <nav className="navbar">
      <div className="logo">
        <span className="text-black">List</span><span className="text-red">ROOM RENT</span>
      </div>
      <div className="nav-links">
        <a href="/">HOME</a>
        <a href="/room">ROOM</a>
        <a href="#">EXPLORE</a>
        <a href="#">REVIEW</a>
        <a href="#">BLOG</a>
        <a href="#">CONTACT</a>
      </div>
    </nav> 
      <div className="row">
        {currentRooms.map((room) => (
          <div key={room._id} className="col-md-4 col-sm-6">
            <div className="single-explore-item">
              <div className="single-explore-img">
                <img
                  src={room.Image ? `../src/img/${room.Image}.jpg` : "../src/img/p1.jpg"}
                  alt="explore image"
                />
              </div>
              <div className={`single-explore-txt bg-theme-${Math.floor(Math.random() * 5) + 1}`}>
                <h2>
                  <a href={`/room/${room.RoomID}`}>{room.Location}</a>
                </h2>
                <p className="explore-rating-price">
                  <span className="explore-rating">{room.Status}</span>
                  <span className="explore-price-box">
                    form <span className="explore-price">{room.Price}$</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nút phân trang */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          &laquo; Trang trước
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Trang sau &raquo;
        </button>
      </div>
    </div>
  );
};

export default RoomList;
