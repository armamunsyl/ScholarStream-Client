import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#1B3C73] shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" className="w-8" />
          <span className="text-xl font-bold text-white">SCHOLARSTREAM</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-white/90 font-medium">
          <li>
            <NavLink to="/" className={({ isActive }) =>
              isActive ? "text-white" : ""}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/scholarships" className={({ isActive }) =>
              isActive ? "text-white" : ""}>
              All Scholarships
            </NavLink>
          </li>

          <li>
            <NavLink to="/success-stories" className={({ isActive }) =>
              isActive ? "text-white" : ""}>
              Success Stories
            </NavLink>
          </li>

          <li>
            <NavLink to="/faq" className={({ isActive }) =>
              isActive ? "text-white" : ""}>
              FAQ
            </NavLink>
          </li>
        </ul>

        <Link
          to="/login"
          className="px-4 py-2 bg-[#23467C] hover:bg-[#2d4f88] text-white rounded-md"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
