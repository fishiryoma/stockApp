import { Link } from "react-router-dom";

function Nav() {
  const links = [
    { label: "登入", path: "/login" },
    { label: "註冊新帳號", path: "/register" },
    { label: "持有個股總覽", path: "/sum" },
    { label: "新增交易", path: "/newtransc" },
    {
      label: "新增股利",
      path: "/newdividend",
    },
  ];
  const appName = "股利計算器";
  const renderedLink = links.map((link) => (
    <li className="text-lg" key={link.label}>
      <Link to={link.path}>{link.label}</Link>
    </li>
  ));
  return (
    <div>
      <div className="navbar bg-gray-100 shadow-sm rounded-xl">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {renderedLink}
            </ul>
          </div>
          <a className="btn btn-ghost text-3xl">{appName}</a>
        </div>
        {/* RWD:大視窗的LAYOUT */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{renderedLink}</ul>
        </div>
        <div className="navbar-end">
          {/* 保留按鈕 */}
          {/* <a className="btn">Button</a> */}
        </div>
      </div>
    </div>
  );
}

export default Nav;
