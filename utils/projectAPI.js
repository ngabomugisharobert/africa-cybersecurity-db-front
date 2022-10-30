import axios from 'axios'




export const baseURL = 'http://localhost:8000/api/project'


export const fetchGet_public_pending = async (url, token) => {
    return await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${token}`
        }
    }).then(res => {
        return res.data
    }).catch(err => { return err })
}


export const fetchPost_public_pending = async (url, data, token) => {
    return await axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${token}`
        }
    }).then(res => {
        return res.data
    }).catch(err => { return err })
}