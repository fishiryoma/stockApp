import { Link } from "react-router-dom";

function Sidebar() {
  const links = [
    { label: "登入", path: "/login" },
    { label: "註冊新帳號", path: "/register" },
  ];

  const renderedLink = links.map((link) => (
    <Link
      to={link.path}
      key={link.label}
      className="text-sm font-semibold hover:bg-cyan-500/75 hover:text-white rounded-md px-3 py-1 transition"
    >
      {link.label}
    </Link>
  ));
  return (
    <div className="flex flex-col gap-3 h-screen px-4 pt-12 bg-cyan-50 rounded-md">
      {renderedLink}
    </div>
  );
}

export default Sidebar;
