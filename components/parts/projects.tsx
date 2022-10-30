import React, { Component } from "react";
import _ from "lodash";
import { paginate } from "../common/paginate";
import Pagination from "../common/pagination";
import Link from "next/link";
import { baseURL, fetchPost } from "../../utils/fetchAPI";
import { BsLink45Deg } from "react-icons/bs";

import { Form } from "react-bootstrap";

class Projects extends Component {
  state = {
    applications: [],
    pageSize: 10,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const applications = {
      data: [
        {
          id: 1,
          title: "Project 1",
          status: "pending",
          description: "Project 1 description",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          dob: "01/01/1990",
        },
        {
          id: 2,
          title: "Project 2",
          status: "pending",
          description: "Project 2 description",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          dob: "01/01/1990",
        },
        {
          id: 3,
          title: "Project 3",
          status: "pending",
          description: "Project 3 description",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          dob: "01/01/1990",
        },
        {
          id: 4,
          title: "Project 4",
          status: "pending",
          description: "Project 4 description",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          dob: "01/01/1990",
        },
        {
          id: 5,
          title: "Project 5",
          status: "pending",
          description: "Project 5 description",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          dob: "01/01/1990",
        },
        {
          id: 6,
          title: "Project 1",
          status: "pending",
          description: "Project 1 description",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          dob: "01/01/1990",
        },
        {
          id: 7,
          title: "Project 2",
          status: "pending",
          description: "Project 2 description",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          dob: "01/01/1990",
        },
        {
          id: 8,
          title: "Project 3",
          status: "pending",
          description: "Project 3 description",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          dob: "01/01/1990",
        },
        {
          id: 9,
          title: "Project 4",
          status: "pending",
          description: "Project 4 description",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          dob: "01/01/1990",
        },
        {
          id: 10,
          title: "Project 5",
          status: "pending",
          description: "Project 5 description",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          dob: "01/01/1990",
        },
        {
          id: 11,
          title: "Project 3",
          status: "pending",
          description: "Project 3 description",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          dob: "01/01/1990",
        },
        {
          id: 12,
          title: "Project 4",
          status: "pending",
          description: "Project 4 description",
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          dob: "01/01/1990",
        },
        {
          id: 13,
          title: "Project 5",
          status: "pending",
          description: "Project 5 description",
          firstName: "kagabo",
          lastName: "Doe",
          phoneNumber: "1234567890",
          dob: "01/01/1990",
        },
      ],
    };

    this.setState({
      applications: applications.data,
    });
    console.log("applications", applications);
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
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
        m.firstName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    let sorted = _.orderBy(
      filteredApplications,
      [sortColumn.path],
      [sortColumn.order]
    );
    const applications = paginate(sorted, currentPage, pageSize);
    return {
      totalCount: filteredApplications.length,
      data: applications,
    };
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  render() {
    const {
      applications: allApplications,
      currentPage,
      pageSize,
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
      <div className="container tw-my-3">
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3">
          <h4 className="tw-mb-0 tw-col-span-2">All Applications</h4>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="search"
              onChange={(event) => this.handleSearch(event.target.value)}
              placeholder="Search by Name"
            />
          </Form.Group>
        </div>

        {/* <div className="tw-flex tw-flex-col">
          <div className="tw-overflow-x-auto sm:tw--mx-6 lg:tw--mx-8">
            <div className="tw-inline-block tw-py-2 tw-min-w-full sm:tw-px-6 lg:tw-px-8">
              <div className="tw-overflow-hidden tw-shadow sm:tw-rounded">
                <table className="tw-min-w-full table-light">
                  <thead className="tw-bg-gray-100 light:tw-bg-gray-900 thead-dark">
                    <tr>
                      <th
                        scope="col"
                        className="tw-py-3 tw-px-6 tw-text-xs tw-font-semibold tw-tracking-wider tw-text-left tw-text-gray-100 tw-uppercase dark:tw-text-gray-400"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="tw-py-3 tw-px-6 tw-text-xs tw-font-semibold tw-tracking-wider tw-text-left tw-text-gray-700 tw-uppercase dark:tw-text-gray-400"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="tw-py-3 tw-px-6 tw-text-xs tw-font-semibold tw-tracking-wider tw-text-left tw-text-gray-700 tw-uppercase dark:tw-text-gray-400"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="tw-py-3 tw-px-6 tw-text-xs tw-font-semibold tw-tracking-wider tw-text-left tw-text-gray-700 tw-uppercase dark:tw-text-gray-400"
                      >
                        Date Of Birth
                      </th>
                      <th
                        scope="col"
                        className="tw-py-3 tw-px-6 tw-text-xs tw-font-semibold tw-tracking-wider tw-text-left tw-text-gray-700 tw-uppercase dark:tw-text-gray-400"
                      >
                        Status
                      </th>
                      <th scope="col" className="tw-relative tw-py-3 tw-px-6">
                        <span className="tw-sr-only">Option</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((application) => (
                      <tr
                        key={application._id}
                        className="tw-border-b  tw-border-gray-900  odd:tw-bg-white even:light:tw-bg-gray-50 odd:light:tw-bg-gray-800 even:dark:tw-bg-gray100 dark:tw-border-gray-600"
                      >
                        <td className="tw-py-1 tw-px-6 tw-text-sm tw-font-medium tw-text-gray-900 tw-whitespace-nowrap dark:tw-text-dark">
                          {application.firstName} {application.lastName}
                        </td>
                        <td className="tw-py-1 tw-px-6 tw-text-sm tw-text-gray-900 tw-whitespace-nowrap dark:tw-text-gray-400">
                          <a
                            href={"mailto:" + application.email}
                            className="tw-no-underline tw-text-gray-500"
                          >
                            {application.email}
                          </a>
                        </td>
                        <td className="tw-py-1 tw-px-6 tw-text-sm tw-text-gray-500 tw-whitespace-nowrap dark:tw-text-gray-400">
                          <a
                            href={"tel:" + application.phoneNumber}
                            className="tw-no-underline tw-text-gray-500"
                          >
                            {application.phoneNumber}
                          </a>
                        </td>

                        <td className="tw-py-1 tw-px-6 tw-text-sm tw-text-gray-500 tw-whitespace-nowrap dark:tw-text-gray-400">
                          {application.dob}
                        </td>
                        <td className="tw-py-1 tw-px-6 tw-text-sm tw-text-gray-500 tw-whitespace-nowrap dark:tw-text-gray-400">
                          <span
                            className={`badge bg-${this.getStatusColor(
                              application.status
                            )} tw-rounded-xl`}
                          >
                            {application.status}
                          </span>
                        </td>
                        <td className="tw-py-1 tw-px-6 tw-text-sm tw-font-medium tw-text-right tw-whitespace-nowrap">
                          <Link
                            href={"/applications/" + application._id}
                            className="btn btn-primary btn-sm"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> */}
        <div className="sm:px-6 w-[100%]">
          {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
          <div className="px-4 md:px-10 py-4 md:py-7">
            <div className="flex items-center justify-between">
              <p
                tabIndex={0}
                className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
              >
                Tasks
              </p>
              <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                <p>Sort By:</p>
                <select
                  aria-label="select"
                  className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
                >
                  <option className="text-sm text-indigo-800">Latest</option>
                  <option className="text-sm text-indigo-800">Oldest</option>
                  <option className="text-sm text-indigo-800">Latest</option>
                </select>
              </div>
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
              <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                <p className="text-sm font-medium leading-none text-white">
                  Add Task
                </p>
              </button>
            </div>
            <div className="mt-7 overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <tbody>
                  <tr
                    tabIndex={0}
                    className="focus:outline-none h-16 border border-gray-100 rounded"
                  >
                    <td>
                      <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">
                          Marketing Keynote Presentation
                        </p>
                        <BsLink45Deg />
                      </div>
                    </td>

                    <td className="pl-5">
                      <div className="flex items-center">
                        <p className="text-sm leading-none text-gray-600 ml-2">
                          Status
                        </p>
                      </div>
                    </td>
                    <td className="pl-5">
                      <div className="flex items-center">
                        <p className="text-sm leading-none text-gray-600 ml-2">
                          Owner
                        </p>
                      </div>
                    </td>
                    <td className="pl-5">
                      <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">
                        today at 18:00
                      </button>
                    </td>
                    <td className="pl-4">
                      <button className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                        More
                      </button>
                    </td>
                  </tr>
                  <tr className="h-3" />
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
    );
  }
}

export default Projects;
