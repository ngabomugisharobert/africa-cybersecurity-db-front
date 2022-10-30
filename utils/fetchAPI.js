import axios from 'axios'

export const baseURL = 'http://localhost:8000/api'
const params = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

//fetch get request
export const fetchGet = (url) => {
    return axios.get(url, params)
}

//fetch post request
export const fetchPost = (url, body) => {
    return axios.post(url, body, params)
}

//fetch put request
export const put = (url) => {
    return axios.put(url, params)
}

//fetch delete request
export const del = (url) => {
    return axios.delete(url, params)
}
