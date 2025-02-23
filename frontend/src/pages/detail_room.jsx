import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './detail_room.css';

const DetailRoom = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Không cần giá trị mặc định ở đây

  // Xử lý upload ảnh
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file)); // Cập nhật URL của ảnh tải lên
    }
  };

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/rooms/detail/${id}`);
        if (!response.ok) {
          throw new Error("Không thể lấy thông tin phòng");
        }
        const data = await response.json();
        setRoom(data.data);
        // Nếu không có ảnh trong db, sử dụng ảnh mặc định
        if (data.data.Image) {
          setImageUrl(`../src/img/${data.data.Image}.jpg`);
        } else {
          // setImageUrl(`../src/img/p1.jpg`); // Ảnh mặc định
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoomDetails();
    }
  }, [id]);

  if (loading) return <p className="text-center mt-5">Đang tải thông tin phòng...</p>;
  if (error) return <p className="text-danger text-center mt-5">Lỗi: {error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Chi tiết phòng</h1>
      {room ? (
        <div className="card shadow-lg p-4">
          {/* Hiển thị ảnh từ backend hoặc ảnh tải lên */}
          <div>
           
            {imageUrl && <img src={imageUrl} alt="Uploaded" width="200px" />}
          </div>
          <div className="card-body">
            <h5 className="card-title">Phòng #{room.RoomID}</h5>
            <p className="card-text"><strong>Giá:</strong> {room.Price.toLocaleString()} VNĐ</p>
            <p className="card-text"><strong>Vị trí:</strong> {room.Location}</p>
            <p className="card-text"><strong>Tiện ích:</strong> {room.Amenity}</p>
            <p className="card-text"><strong>Trạng thái:</strong> 
              <span className={room.Status === "available" ? "text-success" : "text-danger"}>
                {room.Status === "available" ? "Còn trống" : "Đã đặt"}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center">Không tìm thấy phòng.</p>
      )}
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar fixed-top navbar-expand-lg navbar-light ${scrolled ? "bg-light shadow" : "bg-white"}`}>
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarSupportedContent1">
          <a className="navbar-brand mt-2 mt-sm-0" href="#">
            <img 
              src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.webp" 
              height="20" 
              alt="MDB Logo" 
              loading="lazy" 
            />
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5 pt-5 flex-grow-1">
        <DetailRoom />
      </div>
    </div>
  );
};

export default App;
