"use client";
import axios from "@/config/axios";
import { supabase } from "@/config/supabase";
import { LayoutDashboard, UsersIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";

const Sidebar = ({ isSuperAdmin }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const showNavbar = !["/signup", "/login"].includes(pathname);
  const superAdminNav = isSuperAdmin ? (
    <a
      href="/superadmin/employee"
      className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
    >
      <UsersIcon className="h-5 w-5" />
      <span>Employees</span>
    </a>
  ) : (
    <a
      href="/admin/logbook"
      className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
    >
      <UsersIcon className="h-5 w-5" />
      <span>Logbook</span>
    </a>
  );

  const handleLogout = async () => {
    try {
      const response = await axios.get("/user/logout");
      if (response) {
        sessionStorage.clear();
        router.push("/login");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setUser(user);
    }
  }, []);
  return (
    <aside
      className={`${
        showNavbar ? "block" : "hidden"
      } w-64 bg-white shadow-md flex flex-col`}
    >
      {/* Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <LayoutDashboard className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">MyDashboard</span>
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 p-5 space-y-2">{superAdminNav}</nav>
      {/* Logout Button */}
      {/* <div>
        <p className="text-gray-700 text-sm font-medium">
          Logged in as <span className="font-bold">{user.email}</span>
        </p>
      </div> */}
      <div className="p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
            {user?.name || user?.email}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleLogout()}>
              Logout
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <button
          onClick={() => handleLogout()}
          className="w-full flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
        >
          <span>Logout</span>
        </button> */}
      </div>
    </aside>
  );
};

export default Sidebar;
