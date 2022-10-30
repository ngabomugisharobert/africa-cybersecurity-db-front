import React, { useState, useEffect } from "react";
import _ from "lodash";
import { paginate } from "../common/paginate";
import Pagination from "../common/pagination";
import Link from "next/link";
import { fetchGet_public_pennding, baseURL } from "../../utils/projectAPI";
import { BsLink45Deg } from "react-icons/bs";
import { Form } from "react-bootstrap";

const Projects = () => {
  const [applications, setApplications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [count, setCount] = useState(applications.length);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPagedData = () => {
    const projs = projects;
    // const currentPage_ = currentPage;
    // const pageSize = pageSize;
    // const searchQuery = searchQuery;
    // const sortColumn = sortColumn;

    let filtered = projs;

    if (searchQuery) {
      filtered = projs.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const res_applications = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: res_applications };
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);

    const { totaCount, data } = getPagedData();
    setProjects(data);
    setCount(totaCount);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("componentDidMount");
    //fetch data from api
    const response = fetchGet_public_pennding(
      `${baseURL}/public_pending_projects`,
      token
    );
    response.then((res) => {
      console.log(res, "-----res-------");
      setApplications(res);
      setProjects(res);
    });
  }, []);

  useEffect(() => {
    setCount(applications.length);
  }, [applications]);

  const i = 0;
  return (
    <>
      <div className="sm:px-6 w-[100%]">
        {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p
              tabIndex={0}
              className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
            >
              Projects
            </p>
          </div>
        </div>
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center">
              <a
                className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                href=" javascript:void(0)"
              >
                <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                  <p>All</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="javascript:void(0)"
              >
                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Done</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="javascript:void(0)"
              >
                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Pending</p>
                </div>
              </a>
            </div>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3">
              <h4 className="tw-mb-0 tw-col-span-2">All Applications</h4>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="search"
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder="Search by Name"
                />
              </Form.Group>
            </div>
            <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
              <p className="text-sm font-medium leading-none text-white">
                Add Task
              </p>
            </button>
          </div>
          <div className="mt-7 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <tbody>
                <tr className="h-3" />

                {projects &&
                  projects.map((project) => (
                    <tr
                      key={project._id}
                      tabIndex={0}
                      className="focus:outline-none h-16 border border-gray-100 rounded"
                    >
                      <td>
                        <div className="flex items-center pl-5">
                          <p className="text-base font-medium leading-none text-gray-700 mr-2">
                            {project.title}
                          </p>
                          <BsLink45Deg />
                        </div>
                      </td>

                      <td className="pl-5">
                        <div className="flex items-center">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            {project.is_completed ? "Done" : "Pending"}
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            {project.project_owner}
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">
                          {project.date_created}
                        </button>
                      </td>
                      <td className="pl-4">
                        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                          More
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between">
            <div>
              <p>
                Showing {projects && projects.length} {/*to {data.length}*/} of{" "}
                {count && count} entries
              </p>
            </div>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
