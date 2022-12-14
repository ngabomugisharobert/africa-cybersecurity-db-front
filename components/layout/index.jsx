import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { admin, coordinator, manager, project_owner, reviewer, user } from "./role";
import Navbar from "../elements/Navbar";
import Sidebar from "../elements/Sidebar";
const Index = ({ children }) => {
  const [role, setRole] = useState(null);
  const [userMenu, setUserMenu] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token);
      setRole(decoded.role);
    }
  }, []);

  useEffect(() => {
    if (role === "user") {
      setUserMenu(user);
    } else if (role === "admin") {
      setUserMenu(admin);
    } else if (role === "project_owner") {
      setUserMenu(project_owner);
    } else if (role === "manager") {
      setUserMenu(manager);
    } else if (role === "coordinator") {
      setUserMenu(coordinator);
    } else if (role === "reviewer") {
      setUserMenu(reviewer);
    } 
  }, [role]);

  return (
    <>
      <div className="max-w-full container bg-gray-100">
        <div className="flex flex-cols w-full">
          <div className="flex font-sans">
            <Sidebar roleMenu={userMenu} />
          </div>
          <div className="w-full ">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Index;
