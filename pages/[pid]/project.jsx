import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import Layout from "../../components/layout";

import {
  fetchGet_one,
  baseURL,
} from "../../utils/projectAPI";
const Project = () => {

  const router = useRouter();
  const { pid } = router.query;
  console.log(pid, "pid");
  const [project, setProject] = useState([]);
  const [token, setToken] = useState("");

console.log("pid", pid);
useEffect(() => {
  
  setToken(localStorage.getItem("token"))
      //fetch data from api
    if (pid!=undefined) {

      const response = fetchGet_one(`${baseURL}/project_detail/${pid}`, token);
      response.then((data) => {
        setProject(data);
      });
      console.log(project, "project");
    }
}, [])




  return (
    <>
    <Layout>
      
      <h1>Project {pid}</h1>
      </Layout>
    </>
  );
}

export default Project