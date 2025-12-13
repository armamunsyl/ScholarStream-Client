import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logOut();
    setProfileOpen(false);
  };
  // console.log(user);

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-[#1B3C73] shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:justify-between">
        <div className="flex flex-1 items-center gap-3 md:w-auto md:flex-none md:gap-6">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <img src="/logo1.png" className="w-8" />
            <span className="hidden text-xs font-bold text-white sm:inline-block lg:text-xl">SCHOLARSTREAM</span>
          </Link>

          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-white md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-white/70"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search scholarships"
              className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/70 outline-none"
            />
          </div>
        </div>

        <ul className="hidden items-center gap-8 font-medium text-white/90 md:flex">
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

        <div className="flex items-center gap-3 md:w-auto">
          {user ? (
            <div className="relative hidden md:block" ref={profileRef}>
              <button
                className="flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-3 py-1.5"
                onClick={() => setProfileOpen((prev) => !prev)}
              >
                <img
                  src={user.photoURL || 'https://i.ibb.co/s1sDzpT/default-avatar.png'}
                  alt={user.displayName || 'Profile'}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-white/90">{user.displayName || 'Profile'}</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-white py-2 shadow-lg">
                  <p className="px-4 py-2 text-xs font-semibold text-slate-500">
                    Signed in as
                    <br />
                    <span className="text-slate-900">{user.email}</span>
                  </p>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-md bg-[#23467C] px-4 py-2 text-white hover:bg-[#2d4f88] md:inline-block"
            >
              Log In
            </Link>
          )}
          <button
            className="shrink-0 rounded-full border border-white/30 p-2 text-white md:hidden"
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-white/15 bg-[#152f5d]/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 text-white">
            <nav className="flex flex-col gap-3 text-sm font-medium">
              {[
                { to: '/', label: 'Home' },
                { to: '/scholarships', label: 'All Scholarships' },
                { to: '/success-stories', label: 'Success Stories' },
                { to: '/faq', label: 'FAQ' }
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 ${isActive ? 'bg-white/15 text-white' : 'text-white/80'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            {user ? (
              <div className="flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-3 py-1.5">
                <img
                  src={user.photoURL || 'https://i.ibb.co/s1sDzpT/default-avatar.png'}
                  alt={user.displayName || 'Profile'}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-200 underline underline-offset-2"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-[#23467C] px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Log In
              </Link>
            )}
         </div>
       </div>
      )}
    </div>
  );
};

export default Navbar;
