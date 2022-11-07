
import jwt from "jsonwebtoken";

const getRole = ()=>{
    if((typeof window === 'undefined')) return ;
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token);
      return decoded.role;
    }
};

export const canCreateProject = ()=>{
    let role = getRole();
    let result = role==='project_owner';
    return result;
}

export const canUpdateProjectProgress = (project)=>{
    let role = getRole();
    let result = role==='coordinator';
    return result;
}

export const canApproveOrDisableUser = (user)=>{
    let role = getRole();
    let result = role==='admin';
    return result;
}