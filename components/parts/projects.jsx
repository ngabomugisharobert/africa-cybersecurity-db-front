import React, { Component } from "react";
import _ from "lodash";
import { paginate } from "../common/paginate";
import Pagination from "../common/pagination";
import Link from "next/link";
import {
  fetchGet_public_pending,
  fetchPost_public_pending,
  baseURL,
} from "../../utils/projectAPI";
import { BsLink45Deg } from "react-icons/bs";
import { Textarea } from "@material-tailwind/react";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Input } from "@material-tailwind/react";
import { MdOutlineSearch } from "react-icons/md";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

class Projects extends Component {
  state = {
    show: false,
    applications: [],
    pageSize: 10,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    p_title: "",
    p_description: "",
    p_url: "",
    p_file: "",
    p_tech: "",
  };
  async componentDidMount() {
    const token = localStorage.getItem("token");

    //fetch data from api
    const response = await fetchGet_public_pending(
      `${baseURL}/public_pending_projects`,
      token
    );

    this.setState({ ...this.state, applications: response });
  }

  handleClose = () => this.setState({ ...this.state, show: false });
  handleOpen = () => this.setState({ ...this.state, show: true });

  sliceData = (dt) => {
    console.log("dt", typeof dt);
    //slice date
    if (typeof dt === "array") {
      return dt.slice(0, 10);
    }
    if (dt.length > 10) {
      const date = dt.slice(0, 10);
      return date;
    }
    return dt;
  };
  "";
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    const token = localStorage.getItem("token");
    const data = {
      title: this.state.p_title,
      project_description: this.state.p_description,
      url: this.state.p_url,
      technologies_to_used: this.state.p_tech,
    };
    console.log("data", data);
    const res = fetchPost_public_pending(
      `${baseURL}/record_project`,
      data,
      token
    );
    console.log("res", res);
    this.setState({ ...this.state, show: false });
  };

  // handle onchange event of inputs
  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  getStatusColor = (status) => {
    status = status.toLowerCase();
    switch (status) {
      case "pending":
        return "info";
      case "passed":
        return "success";
      case "dropped":
        return "danger";
      default:
        return "tw-text-gray-500";
    }
  };
  getPageData = () => {
    const {
      applications: allApplications,
      currentPage,
      pageSize,
      sortColumn,
      searchQuery,
    } = this.state;

    let filteredApplications = allApplications;

    if (searchQuery) {
      filteredApplications = allApplications.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    let sorted = _.orderBy(
      filteredApplications,
      [sortColumn.path],
      [sortColumn.order]
    );
    const appa = paginate(sorted, currentPage, pageSize);
    return {
      totalCount: filteredApplications.length,
      data: appa,
    };
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  render() {
    let countRow = 1;
    const {
      applications: allApplications,
      currentPage,
      pageSize,
      show,
      p_title,
      p_description,
      p_url,
      p_file,
      p_tech,
      searchQuery,
    } = this.state;
    const { length: count } = allApplications;

    if (count === 0)
      return (
        <div className="mt-5 container">
          <div className="alert alert-info">There are no applications</div>
        </div>
      );

    const { totalCount, data } = this.getPageData();
    return (
      <>
        <div className="container tw-my-3">
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
                  <Input
                    type="search"
                    onChange={(event) => this.handleSearch(event.target.value)}
                    label="Search by Title"
                    icon={<MdOutlineSearch />}
                  />
                </div>
                <button
                  onClick={this.handleOpen}
                  className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
                >
                  <p className="text-sm font-medium leading-none text-white">
                    Add Project
                  </p>
                </button>
              </div>
              <div className="mt-7 overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                  <tbody>
                    <tr className="h-3" />

                    {data &&
                      data.map((application) => (
                        <tr
                          key={application._id}
                          tabIndex={0}
                          className="focus:outline-none h-16 border border-gray-100 rounded"
                        >
                          <td>
                            <div className="flex items-center pl-5">
                              <p className="text-base font-medium leading-none text-gray-700 mr-2">
                                {countRow++}
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center pl-5">
                              <p className="text-base font-medium leading-none text-gray-700 mr-2">
                                {application.title}
                              </p>
                              <BsLink45Deg />
                            </div>
                          </td>

                          <td className="pl-5">
                            <div className="flex items-center">
                              <p className="text-sm leading-none text-gray-600 ml-2">
                                {application.is_completed ? "Done" : "Pending"}
                              </p>
                            </div>
                          </td>
                          <td className="pl-5">
                            <div className="flex items-center">
                              <p className="text-sm leading-none text-gray-600 ml-2">
                                {application.project_owner}
                              </p>
                            </div>
                          </td>
                          <td className="pl-5">
                            <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">
                              {/* slice date_created  */}
                              {application.date_created &&
                                this.sliceData(application.date_created)}
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
            </div>
          </div>

          <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between">
            <div>
              <p>
                Showing {data.length} {/*to {data.length}*/} of {totalCount}{" "}
                entries
              </p>
            </div>
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>

        <Dialog
          open={show}
          handler={this.handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Record a new project.</DialogHeader>
          <DialogBody divider>
            <div className="bg-white p-8 w-full lg:col-span-3 lg:p-12">
              <div className="flex flex-col w-full items-end gap-4">
                {/* //add onChange event to input */}
                <Input
                  label="Title"
                  type="text"
                  name="p_title"
                  value={p_title}
                  onChange={this.handleChange}
                />
                <Input
                  name="p_tech"
                  value={p_tech}
                  onChange={this.handleChange}
                  label="Technologies"
                  type="text"
                />
                <Input
                  value={p_url}
                  onChange={this.handleChange}
                  name="p_url"
                  label="Url (example: github, gitlab, etc..)"
                  type="text"
                />
                <Textarea
                  name="p_description"
                  value={p_description}
                  onChange={this.handleChange}
                  label="Description"
                />

                <div className="w-[100%] rounded-md border border-gray-100 bg-white p-4 shadow-md">
                  <label
                    htmlFor="upload"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 fill-white stroke-indigo-500"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-gray-600 font-medium">
                      Upload file
                    </span>
                  </label>
                  <input name="upload" type="file" className="hidden" />
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button onClick={this.handleClose} className="mr-1">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit}>
              <span>Create</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  }
}

export default Projects;
