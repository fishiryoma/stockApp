import { Link } from "react-router-dom";

function Nav() {
  const links = [
    { label: "登入", path: "/login" },
    { label: "註冊新帳號", path: "/register" },
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
      className="active:text-white text-md font-bold hover:bg-gray-400 hover:text-white rounded-lg transition"
      key={link.label}
    >
      <Link to={link.path}>{link.label}</Link>
    </li>
  ));
  return (
    <div className="text-white">
      <div className="navbar bg-neutral text-neutral-content md:px-3">
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
              className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-gray-800 rounded-box w-52"
            >
              {renderedLink}
            </ul>
          </div>
          <p className="text-xl font-bold">{appName}</p>
        </div>
        {/* RWD:大視窗的LAYOUT */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{renderedLink}</ul>
        </div>
        {/* Nav右端布局 */}
        <div className="navbar-end">
          {/* 打招呼 */}
          {/* ICON按鈕 */}
          <p className="mr-3">Hi, 使用者</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12">
                <img
                  className="absolute top-0.5 rounded-full"
                  src="icon01.jpg"
                  alt="icon"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-gray-800"
            >
              <li>
                <a>修改個人資料</a>
              </li>
              <li>
                <a>登出</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
