import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

function Nav() {
  const [modalShow, setModalShow] = useState(true);
  const { isAuthenticated, setIsAuthenticated, user } = useAuth();
  const links = [
    { label: "登入", path: "/home" },
    { label: "資產總覽", path: "/sum" },
    { label: "新增交易", path: "/newtransc" },
    {
      label: "新增股利",
      path: "/newdividend",
    },
    {
      label: "查看個股",
      path: "/stock",
    },
  ];
  const appName = "投資存股";
  const renderedLink = links.map((link) => (
    <li
      className="text-md font-bold hover:bg-gray-400 hover:text-white active:text-white rounded-lg transition"
      key={link.label}
    >
      <Link to={link.path}>{link.label}</Link>
    </li>
  ));

  return (
    <div className="text-white ">
      <div className="navbar bg-neutral text-neutral-content md:px-3 fixed z-50 bg-opacity-90">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          <img src="logo.webp" alt="logo" className="w-14"></img>
          <p className="text-xl font-bold hidden sm:block">{appName}</p>
        </div>
        {/* RWD:大視窗的LAYOUT */}
        <div className="navbar-center hidden sm:flex">
          <div className="flex gap-4">
            <div onClick={() => setModalShow(true)}>
              <label htmlFor="modal_addnew">
                <img
                  src="new.svg"
                  alt="new button"
                  className="w-10 h-10 min-w-0 min-h-0 bg-white rounded-full p-1 btn hover:bg-cyan-600 hover:border-0"
                />
              </label>
            </div>
            <Link to="/sum">
              <img
                src="my_data.svg"
                alt="my data button"
                className="w-10 h-10 min-w-0 min-h-0 bg-white rounded-full p-1 btn "
              />
            </Link>
            <Link to="/stock">
              <img
                src="search.svg"
                alt="search button"
                className="w-10 h-10 min-w-0 min-h-0  bg-white rounded-full p-1 btn "
              />
            </Link>
          </div>

          {/* modal */}
          {modalShow ? (
            <div>
              <input
                type="checkbox"
                id="modal_addnew"
                className="modal-toggle "
              />
              <div className="modal" role="dialog">
                <div className="modal-box bg-transparent flex justify-center gap-8 w-96 ">
                  <div
                    className="btn h-full w-5/12 p-6 flex flex-col gap-3 bg-gray-100 text-gray-800 items-center rounded-xl"
                    onClick={() => {
                      setModalShow(false);
                    }}
                  >
                    <Link to="/newtransc">
                      <p className="text-xl">新增交易</p>
                      <img
                        src="transaction.svg"
                        alt="new transaction btn"
                        className="h-18 "
                      />
                    </Link>
                  </div>
                  <div
                    className="btn h-full w-5/12 p-6 flex flex-col gap-3 bg-gray-100 text-gray-800 items-center rounded-xl"
                    onClick={() => {
                      setModalShow(false);
                    }}
                  >
                    <Link to="/newdividend">
                      <p className="text-xl">新增股利</p>
                      <img
                        src="dividend.svg"
                        alt="new transaction btn"
                        className="h-18"
                      />
                    </Link>
                  </div>
                </div>
                <label className="modal-backdrop" htmlFor="modal_addnew">
                  Close
                </label>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* Nav右端布局 */}
        <div className="navbar-end">
          {/* 打招呼 */}
          {/* ICON按鈕 */}
          {isAuthenticated ? (
            <>
              <p className="mr-3 hidden sm:block">
                Hi, {user.name ? user.name : ""}
              </p>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-12">
                    <img
                      className="absolute top-0.5 rounded-full"
                      src={`icon0${user.icon}.jpg`}
                      alt="icon"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-gray-800"
                >
                  <Link to="/user">
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
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
