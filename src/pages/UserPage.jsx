import { Container } from "../componenets/Container";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const [imgId, setImgId] = useState(1);
  const { setUser, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <Container>
      <div className="text-center">
        <div className="carousel rounded-box">
          <div className="carousel-item w-full relative ">
            <img
              src={`icon0${imgId}.jpg`}
              className="w-60"
              alt="Tailwind CSS Carousel component"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2">
              <div
                className="btn btn-circle btn-xs bg-white/50"
                onClick={() => {
                  setImgId(imgId === 1 ? 4 : imgId - 1);
                }}
              >
                ❮
              </div>
              <div
                className="btn btn-circle btn-xs bg-white/50"
                onClick={() => {
                  setImgId(imgId === 4 ? 1 : imgId + 1);
                }}
              >
                ❯
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <div
          className="btn btn-sm mt-3"
          onClick={() => {
            setUser({ ...user, icon: imgId });
            console.log("test");
            console.log(user, imgId);
          }}
        >
          設定
        </div>
      </div>
    </Container>
  );
}

export default UserPage;
