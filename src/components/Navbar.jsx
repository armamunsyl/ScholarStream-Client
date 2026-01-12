import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => getInitialTheme() === "dark");
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

  useEffect(() => {
    if (typeof document === "undefined") return;
    const nextTheme = isDarkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem("theme", nextTheme);
  }, [isDarkMode]);

  const handleLogout = async () => {
    await logOut();
    setProfileOpen(false);
  };
  // console.log(user);

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-[#1B3C73] shadow-[0_2px_6px_rgba(0,0,0,0.15)] dark:bg-[#0b1120]">
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

        <ul className="hidden flex-wrap items-center gap-x-6 gap-y-2 font-medium text-white/90 md:flex">
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
          <li>
            <a href="/#about" className="transition hover:text-white">
              About
            </a>
          </li>
          <li>
            <a href="/#contact" className="transition hover:text-white">
              Contact
            </a>
          </li>
          <li>
            <a href="/#blog" className="transition hover:text-white">
              Blog
            </a>
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
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white py-2 shadow-lg dark:bg-[#0f172a]">
                  <p className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Signed in as
                    <br />
                    <span className="text-slate-900 dark:text-slate-100">{user.email}</span>
                  </p>
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/my-profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    My Profile
                  </Link>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isDarkMode}
                    onClick={() => setIsDarkMode((prev) => !prev)}
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <span>Dark mode</span>
                    <span
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
                        isDarkMode ? "bg-slate-200 dark:bg-white" : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full transition ${
                          isDarkMode
                            ? "translate-x-4 bg-slate-900"
                            : "translate-x-1 bg-white dark:bg-slate-200"
                        }`}
                      />
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-md bg-[#23467C] px-4 py-2 text-white hover:bg-[#2d4f88] dark:bg-slate-800 dark:hover:bg-slate-700 md:inline-block"
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
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-[calc(100vh-72px)] w-[85%] max-w-sm overflow-y-auto bg-[#152f5d] px-4 py-5 pb-8 text-white shadow-2xl dark:bg-[#0f172a]">
            <div className="flex items-center justify-between pb-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Menu</p>
              <button
                type="button"
                className="rounded-full border border-white/20 p-2 text-white"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-2 text-sm font-medium">
              {[
                { to: '/', label: 'Home' },
                { to: '/scholarships', label: 'All Scholarships' },
                { to: '/success-stories', label: 'Success Stories' },
                { to: '/faq', label: 'FAQ' },
                { to: '/#about', label: 'About' },
                { to: '/#contact', label: 'Contact' },
                { to: '/#blog', label: 'Blog' }
              ].map((link) =>
                link.to.startsWith('/#') ? (
                  <a
                    key={link.to}
                    href={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition hover:bg-white/15 hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-2xl border border-white/10 px-4 py-2 transition ${
                        isActive ? 'bg-white/15 text-white' : 'bg-white/5 text-white/80 hover:bg-white/15 hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>
            <button
              type="button"
              role="switch"
              aria-checked={isDarkMode}
              onClick={() => setIsDarkMode((prev) => !prev)}
              className="mt-4 flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
            >
              <span>Dark mode</span>
              <span
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
                  isDarkMode ? "bg-white" : "bg-slate-200 dark:bg-slate-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full transition ${
                    isDarkMode ? "translate-x-4 bg-slate-900" : "translate-x-1 bg-white dark:bg-slate-200"
                  }`}
                />
              </span>
            </button>
            {user ? (
              <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || 'https://i.ibb.co/s1sDzpT/default-avatar.png'}
                    alt={user.displayName || 'Profile'}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="text-xs text-white/80">
                    <p className="font-semibold text-white">{user.displayName || 'Profile'}</p>
                    <p>{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-white/10 px-4 py-2 text-center font-semibold text-white hover:bg-white/20"
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/my-profile"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-white/10 px-4 py-2 text-center font-semibold text-white hover:bg-white/20"
                >
                  My Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-red-500/80 px-4 py-2 font-semibold text-white hover:bg-red-500"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-4 rounded-full bg-[#23467C] px-4 py-2 text-center text-sm font-semibold text-white"
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
