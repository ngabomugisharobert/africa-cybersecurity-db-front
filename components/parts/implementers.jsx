import { AxiosError } from "axios";
import { Component } from "react";
import { canApproveOrDisableUser } from "../../helper/permissions";
import { getImplementers, getUsers } from "../../services/users";

export default class Implementers extends Component{

    async componentDidMount(){
        getImplementers().then(resp=>{
            if(resp instanceof AxiosError){
                return ;
            }
            this.setState(prev=>({...prev, users: resp}))
        });
    }

    render(){
        if(!this.state?.users){
            return (
                <div className="mt-5 container">
                  <div className="alert alert-info">Loading...</div>
                </div>
              );
        }
        let data = this.state.users;
        let countRow = 1;
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
                        Users
                      </p>
                    </div>
                  </div>
                  <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <div className="mt-7 overflow-x-auto">
                      <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr>
                                <th></th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr className="h-3" />
    
                          {data &&
                            data.map((user) => (
                              <tr
                                key={user._id}
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
                                      {user.first_name}
                                    </p>
                                  </div>
                                </td>
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base font-medium leading-none text-gray-700 mr-2">
                                      {user.last_name}
                                    </p>
                                  </div>
                                </td>
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base font-medium leading-none text-gray-700 mr-2">
                                      {user.email}
                                    </p>
                                  </div>
                                </td>
                                <td>
                                  <div className="flex items-center pl-5">
                                    <p className="text-base font-medium leading-none text-gray-700 mr-2">
                                      {user.username}
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
    }
}