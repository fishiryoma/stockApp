import { Container } from "../componenets/Container";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function UserPage() {
  const [imgId, setImgId] = useState(1);
  const { setUser, user } = useAuth();

  return (
    <Container>
      <div>
        <IconCarousel imgId={imgId} setImgId={setImgId} />
        <div className="text-center">
          <div
            className="btn sm:btn-lg mt-8 text-xl"
            onClick={() => {
              setUser({ ...user, icon: imgId });
            }}
          >
            設定
          </div>
        </div>
      </div>
    </Container>
  );
}

function IconCarousel({ imgId, setImgId }) {
  const btnClass = "btn btn-circle sm:btn-lg bg-white/50";

  return (
    <div className="text-center">
      <div className="carousel rounded-box">
        <div className="carousel-item w-full relative ">
          <img
            src={`../../public/icon0${imgId}.jpg`}
            className="w-full max-w-5xl"
            alt="Tailwind CSS Carousel component"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2">
            <div
              className={btnClass}
              onClick={() => {
                setImgId(imgId === 1 ? 4 : imgId - 1);
              }}
            >
              ❮
            </div>
            <div
              className={btnClass}
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
  );
}
