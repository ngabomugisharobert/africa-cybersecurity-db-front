import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Alert, Dialog, DialogBody } from "@material-tailwind/react";
import { createUser } from "../../../services/users";
import { AxiosError } from "axios";

const Index = () => {
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [password, setPassword] = useState('');

  let [submitted, setSubmitted] = useState();
  let [hasError, setHasError] = useState();
  let [loading, setLoading] = useState();

  const handlerSubmit = (evt)=>{
    evt.preventDefault();
    let form = evt.target;
    let user = {
      username: form['username'].value,
      email: form['email'].value,
      first_name: form['firstName'].value,
      last_name: form['lastName'].value,
      password: form['password'].value,
      role: form['role'].value,
    }
    setLoading(true);
    setSubmitted(false);
    setHasError(false);
    createUser(user).then((resp)=>{
      console.log(resp);
      setLoading(false);
      if(resp instanceof AxiosError)
      setHasError(true);
      else
      setSubmitted(true);
    }).catch(e=>{
      console.log(e);
      setHasError(true);
      setLoading(false);
    });
  }

  return (
    <>
      <Dialog
      open={loading}>
        <DialogBody>
          Loading
        </DialogBody>
      </Dialog>
      {/* component */}
      {/* Container */}
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            <div
              className="w-full flex justify-center h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("http://documents.trendmicro.com/images/TEx/articles/free-encryption.jpg")',
                  display:'flex',
                  justifyContent:"center",
                  width: '50%',
                  height: '50%',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                 
                                }}
            />
            {/* Col */}
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
              {submitted&&<Alert color='green'>Form Submitted1</Alert>}
              {hasError&&<Alert color='red'>Check your input</Alert>}
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handlerSubmit}>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="md:mr-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                  </div>
                  <div className="md:mr-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Username
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                  </div>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                    <p className="text-xs italic text-red-500">
                      Please choose a password.
                    </p>
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="c_password"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Role
                  </label>
                  <div>
                  <input
                  name='role'
                  type='radio'
                  value='project_owner'
                  selected
                  />
                  Project Owner
                  </div>
                  <div>
                  <input
                  name='role'
                  type='radio'
                  value='manager'
                  selected
                  />
                  Manager
                  </div>
                  <div>
                  <input
                  name='role'
                  type='radio'
                  value='=reviewer'
                  selected
                  />
                  Reviewer
                  </div>
                  <div>
                  <input
                  name='role'
                  type='radio'
                  value='coordinator'
                  selected
                  />
                  Coordinator
                  </div>
                  <div>
                  <input
                  name='role'
                  type='radio'
                  value='implementer'
                  selected
                  />
                  Implementers
                  </div>
                  <div></div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link href="/auth/forget-password">
                    <p className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                      Forgot Password?
                    </p>
                  </Link>
                </div>
                <div className="text-center">
                  <Link href="/auth/login">
                    <p className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                      Already have an account? Login!
                    </p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Index;
