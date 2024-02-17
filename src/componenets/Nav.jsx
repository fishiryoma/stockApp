import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth";

function Nav() {
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
  const appName = "股利計算器";
  const renderedLink = links.map((link) => (
    <li
      className="text-md font-bold hover:bg-gray-400 hover:text-white rounded-lg transition"
      key={link.label}
    >
      <Link to={link.path}>{link.label}</Link>
    </li>
  ));
  console.log(user, `icon0${user.icon}.jpg`);
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
              className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-white text-gray-800 rounded-box w-52"
            >
              {renderedLink}
            </ul>
          </div>
          <img src="logo.webp" alt="logo" className="w-14"></img>
          <p className="text-xl font-bold hidden sm:block">{appName}</p>
        </div>
        {/* RWD:大視窗的LAYOUT */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{renderedLink}</ul>
        </div>
        {/* Nav右端布局 */}
        <div className="navbar-end">
          {/* 打招呼 */}
          {/* ICON按鈕 */}
          {isAuthenticated ? (
            <>
              <p className="mr-3 hidden sm:block">
                Hi, {user.name ? user.name : "你還沒設定使用者名稱"}
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
