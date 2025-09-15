import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const auth = useAuth();
  const open = auth?.open;
  const setOpen = auth?.setOpen;


  return (
    <>
     

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setOpen && setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-svh w-60 bg-white border-r z-50 transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block   
        `}
        style={{ maxWidth: "15rem" }}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end p-2">
          <button
            onClick={() => setOpen && setOpen(false)}
            aria-label="Close sidebar"
            className="p-2 rounded absolute hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 pb-5 border-b">
          <h3 className="font-bold">Contracts App</h3>
        </div>
        <nav className="p-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block p-2 rounded ${isActive ? "bg-sky-50" : "hover:bg-gray-50"}`
            }
            end
          >
            Contracts
          </NavLink>
          <NavLink
            to="/insights"
            className={({ isActive }) =>
              `block p-2 rounded ${isActive ? "bg-sky-50" : "hover:bg-gray-50"}`
            }
            end
          >
            Insights
          </NavLink>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `block p-2 rounded ${isActive ? "bg-sky-50" : "hover:bg-gray-50"}`
            }
            end
          >
            Reports
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `block p-2 rounded ${isActive ? "bg-sky-50" : "hover:bg-gray-50"}`
            }
            end
          >
            Settings
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
