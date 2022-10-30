import React from "react";
import { GrOverview, GrProjects } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";
const Sidebar = ({ roleMenu }) => {
  return (
    <>
      <div className="relative bg-white ligh:bg-gray-800">
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="w-72 h-screen">
            <nav className="mt-10 px-6 ">
              {roleMenu &&
                roleMenu.map((item) => (
                  <>
                    <Link href={item.href} key={item.id}>
                      <p className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ">
                        {item.icon}
                        <span className="mx-4 text-lg font-normal">
                          {item.name}
                        </span>
                        <span className="flex-grow text-right"></span>
                      </p>
                    </Link>
                  </>
                ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
