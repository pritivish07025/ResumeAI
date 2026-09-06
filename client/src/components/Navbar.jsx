import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import {
  HiOutlineHome,
  HiOutlineUpload,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineBell,
  HiOutlineSparkles,
  HiOutlineChevronDown,
} from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenu(false);
    navigate("/login", { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: HiOutlineHome,
    },
    {
      name: "Upload Resume",
      path: "/upload",
      icon: HiOutlineUpload,
    },
    {
      name: "Resume Builder",
      path: "/builder",
      icon: HiOutlineDocumentText,
    },
    {
      name: "ATS Checker",
      path: "/ats",
      icon: HiOutlineChartBar,
    },
  ];

  /* =========================
     PUBLIC NAVBAR
  ========================= */

  if (!user) {
    return (
      <nav className="sticky top-0 z-50 bg-white border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6D4AFF] to-[#9B6CFF] text-white flex items-center justify-center shadow-lg shadow-purple-200">
              <HiOutlineDocumentText className="text-2xl" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#17164B] tracking-tight">
                Resume<span className="text-[#6D4AFF]">AI</span>
              </h1>

              <p className="text-[9px] uppercase tracking-[0.18em] text-slate-400 font-semibold">
                AI Career Platform
              </p>
            </div>
          </Link>

          {/* Public Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/login"
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-[#6D4AFF] transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6D4AFF] to-[#8B5CF6] text-white text-sm font-semibold shadow-lg shadow-purple-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[262px] z-50 flex-col overflow-hidden bg-gradient-to-b from-[#24134F] via-[#30206E] to-[#24235F] text-white">

        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-[#8B5CF6]/20 blur-3xl" />

          <div className="absolute top-[40%] -right-24 w-72 h-72 rounded-full bg-[#6D4AFF]/20 blur-3xl" />

          <div className="absolute bottom-[-80px] -left-20 w-64 h-64 rounded-full bg-[#9B6CFF]/20 blur-3xl" />

          {/* Small stars */}
          <span className="absolute top-[18%] left-8 w-1 h-1 bg-white/40 rounded-full" />
          <span className="absolute top-[35%] right-10 w-1 h-1 bg-purple-200/50 rounded-full" />
          <span className="absolute top-[60%] left-16 w-1 h-1 bg-white/30 rounded-full" />
          <span className="absolute bottom-[25%] right-16 w-1 h-1 bg-purple-300/40 rounded-full" />
        </div>

        {/* ================= LOGO ================= */}

        <div className="relative h-[88px] px-6 flex items-center border-b border-white/10">

          <Link
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#A875FF] to-[#6D4AFF] flex items-center justify-center shadow-lg shadow-purple-900/40">

              <HiOutlineDocumentText className="text-2xl text-white" />

              <div className="absolute inset-0 rounded-xl border border-white/20" />
            </div>

            <div>
              <div className="text-[22px] font-bold tracking-tight">
                ResumeAI
              </div>

              <div className="text-[9px] text-purple-200/80 uppercase tracking-[0.18em] font-medium">
                AI Career Platform
              </div>
            </div>
          </Link>
        </div>

        {/* ================= NAVIGATION ================= */}

        <div className="relative flex-1 px-4 pt-8">

          <p className="px-4 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-300/70">
            Workspace
          </p>

          <div className="space-y-2">

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    group relative flex items-center gap-3
                    px-4 py-3.5 rounded-xl
                    transition-all duration-200
                    ${
                      active
                        ? "bg-white/[0.14] text-white shadow-lg shadow-black/10"
                        : "text-purple-100/80 hover:text-white hover:bg-white/[0.07]"
                    }
                  `}
                >

                  {/* Active left indicator */}
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full bg-[#A875FF]" />
                  )}

                  <div
                    className={`
                      w-9 h-9 rounded-lg flex items-center justify-center
                      transition
                      ${
                        active
                          ? "bg-[#7B55FF] text-white shadow-md shadow-purple-900/30"
                          : "bg-white/[0.06] text-purple-200 group-hover:bg-white/10"
                      }
                    `}
                  >
                    <Icon className="text-xl" />
                  </div>

                  <span className="text-sm font-medium">
                    {item.name}
                  </span>

                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C4B5FD]" />
                  )}
                </Link>
              );
            })}

          </div>
        </div>

        {/* ================= BOTTOM CARD ================= */}

        <div className="relative p-5">

          <div className="relative overflow-hidden rounded-2xl p-5 bg-white/[0.08] border border-white/[0.1] backdrop-blur-sm">

            {/* Glow */}
            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-[#9B6CFF]/20 blur-xl" />

            <HiOutlineSparkles className="relative text-2xl text-[#C4B5FD] mb-4" />

            <p className="relative text-[15px] font-semibold">
              Build Smarter
            </p>

            <p className="relative text-[15px] text-purple-200">
              Get Hired Faster
            </p>

            <div className="relative w-10 h-1 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] mt-4" />
          </div>

        </div>
      </aside>

      {/* =====================================================
          DESKTOP TOPBAR
      ===================================================== */}

      <header className="hidden md:flex fixed top-0 right-0 left-[262px] h-[76px] z-40 bg-white/95 backdrop-blur-xl border-b border-purple-100 items-center justify-end px-8">

        <div className="flex items-center gap-6">

          {/* Notification */}

          <button
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-[#6D4AFF] hover:bg-purple-50 transition"
            title="Notifications"
          >
            <HiOutlineBell className="text-[23px]" />

            <span className="absolute top-[7px] right-[7px] w-2 h-2 rounded-full bg-[#EC4899] border-2 border-white" />
          </button>

          {/* Divider */}

          <div className="h-8 w-px bg-slate-200" />

          {/* Profile */}

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6D4AFF] to-[#8B5CF6] text-white flex items-center justify-center font-bold shadow-md shadow-purple-200">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-[#17164B]">
                {user?.name || "User"}
              </p>

              <p className="text-[11px] text-slate-400">
                ResumeAI Member
              </p>
            </div>

            <HiOutlineChevronDown className="text-slate-400 text-sm" />
          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
            title="Logout"
          >
            <HiOutlineLogout className="text-xl" />
          </button>

        </div>
      </header>

      {/* =====================================================
          MOBILE NAVBAR
      ===================================================== */}

      <header className="md:hidden sticky top-0 z-50 bg-white border-b border-purple-100">

        <div className="h-[68px] px-4 flex items-center justify-between">

          {/* Mobile Logo */}

          <Link
            to="/dashboard"
            className="flex items-center gap-2.5"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6D4AFF] to-[#8B5CF6] text-white flex items-center justify-center shadow-md">
              <HiOutlineDocumentText className="text-xl" />
            </div>

            <div>
              <div className="font-bold text-lg text-[#17164B]">
                Resume<span className="text-[#6D4AFF]">AI</span>
              </div>

              <div className="text-[8px] text-slate-400 uppercase tracking-widest">
                AI Career Platform
              </div>
            </div>
          </Link>

          {/* Menu */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D4AFF] flex items-center justify-center hover:bg-purple-100 transition"
          >
            {mobileMenu ? (
              <HiOutlineX className="text-xl" />
            ) : (
              <HiOutlineMenu className="text-xl" />
            )}
          </button>

        </div>

        {/* Mobile Menu */}

        {mobileMenu && (
          <div className="px-4 pb-4 border-t border-purple-100 bg-white">

            <div className="pt-4 space-y-2">

              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3.5 rounded-xl
                      font-medium transition
                      ${
                        active
                          ? "bg-purple-50 text-[#6D4AFF]"
                          : "text-slate-600 hover:bg-slate-50"
                      }
                    `}
                  >
                    <div
                      className={`
                        w-9 h-9 rounded-lg flex items-center justify-center
                        ${
                          active
                            ? "bg-[#6D4AFF] text-white"
                            : "bg-slate-100 text-slate-500"
                        }
                      `}
                    >
                      <Icon className="text-lg" />
                    </div>

                    <span className="text-sm">
                      {item.name}
                    </span>
                  </Link>
                );
              })}

              <div className="border-t border-slate-100 pt-2 mt-2">

                <div className="flex items-center gap-3 px-4 py-3">

                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6D4AFF] to-[#8B5CF6] text-white flex items-center justify-center font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#17164B]">
                      {user?.name || "User"}
                    </p>

                    <p className="text-xs text-slate-400">
                      ResumeAI Member
                    </p>
                  </div>

                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-500 hover:bg-red-50 transition"
                >
                  <HiOutlineLogout className="text-xl" />
                  <span className="text-sm font-medium">
                    Logout
                  </span>
                </button>

              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;