import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth";
import { useRef } from "react";
import logo from "../../public/logo.webp";
import newIcon from "../../public/new.svg";
import myDataIcon from "../../public/my_data.svg";
import searchIcon from "../../public/search.svg";
import transaction from "../../public/transaction.svg";
import dividend from "../../public/dividend.svg";

const MENU = [
  { label: "登入", path: "/login" },
  { label: "資產總覽", path: "/mypage" },
  { label: "新增交易", path: "/mypage/newtransc" },
  {
    label: "新增股利",
    path: "/mypage/newdividend",
  },
  {
    label: "查看個股",
    path: "/mypage/stock",
  },
];
const appName = "投資存股計畫";
const renderedLink = MENU.map((link) => (
  <li
    className="text-md font-bold hover:bg-gray-400 hover:text-white active:text-white rounded-lg transition"
    key={link.label}
  >
    <Link to={link.path}>{link.label}</Link>
  </li>
));

export default function Nav() {
  return (
    <div className="text-white ">
      <div className="navbar bg-neutral text-neutral-content md:px-3 fixed z-50 bg-opacity-90">
        <MobileMenu />
        <LaptopMenu />
      </div>
    </div>
  );
}

function MobileMenu() {
  return (
    <div className="navbar-start">
      <div className="dropdown hidden sm:flex">
        <div tabIndex={0} role="button" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-gray-100 text-gray-800 rounded-box w-52"
        >
          {renderedLink}
        </ul>
      </div>
      <Link to="/mypage">
        <img src={logo} alt="logo" className="w-[5rem]"></img>
      </Link>
      <span className="text-xl font-bold hidden sm:block">{appName}</span>
    </div>
  );
}

function LaptopMenu() {
  return (
    <>
      <LaptopCenterMenu />
      <LaptopUserIcon />
    </>
  );
}

function LaptopCenterMenu() {
  const modalRef = useRef(null);
  const btnList = [
    { path: "/mypage", img: myDataIcon },
    { path: "/mypage/stock", img: searchIcon },
  ];
  return (
    <div className="navbar-center flex">
      <div className="flex gap-4">
        <div>
          <button onClick={() => modalRef.current.showModal()}>
            <img
              src={newIcon}
              alt="new button"
              className="w-14 h-14 min-w-0 min-h-0 bg-white rounded-full p-1 btn hover:bg-cyan-600 hover:border-0 "
            />
          </button>
        </div>
        {btnList.map((item) => (
          <Link to={item.path} key={item.img}>
            <img
              src={item.img}
              alt={item.img}
              className="w-14 h-14 min-w-0 min-h-0 bg-white rounded-full p-1 btn "
            />
          </Link>
        ))}
      </div>
      <Modal modalRef={modalRef} />
    </div>
  );
}

function Modal({ modalRef }) {
  const btnList = [
    { path: "/mypage/newtransc", img: transaction, name: "新增交易" },
    { path: "/mypage/newdividend", img: dividend, name: "新增股利" },
  ];
  const navigate = useNavigate();
  return (
    <dialog className="modal" ref={modalRef}>
      <div className="modal-box w-11/12 max-w-5xl bg-transparent ">
        <form
          method="dialog"
          className="modal-backdrop flex justify-between gap-8 z-10"
        >
          {btnList.map((item) => (
            <button
              key={item.img}
              className="btn h-full w-5/12 p-7 bg-gray-100 text-gray-800 rounded-xl flex flex-col gap-6 items-center"
              onClick={() => navigate(item.path)}
            >
              <p className="text-2xl sm:text-5xl">{item.name}</p>
              <img src={item.img} alt={item.img} className="w-4/5" />
            </button>
          ))}
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  );
}

function LaptopUserIcon() {
  const { setIsAuthenticated, user } = useAuth();
  return (
    <div className="navbar-end">
      <p className="mr-3 hidden sm:block">
        Hi, {user.name ? user.name : "user"}
      </p>
      <div className="dropdown dropdown-end w-14 h-14 justify-center">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar flex items-center w-full h-full"
        >
          <img
            className="rounded-full"
            src={`../../public/icon0${user.icon}.jpg`}
            alt="icon"
          />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-gray-800 text-lg"
        >
          <Link to="/mypage/user">
            <li>
              <div>修改個人資料</div>
            </li>
          </Link>
          <li>
            <a
              onClick={() => {
                Cookies.set("token_StockApp", "");
                setIsAuthenticated(false);
              }}
            >
              登出
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
