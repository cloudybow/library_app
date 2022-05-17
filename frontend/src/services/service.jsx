import axios from "axios";
const url = 'http://127.0.0.1:5000'

//use get
const getData = (route) => {
    // const req = axios.get(url)
    return axios.get(`${url}/${route}`).then(res => res.data)
}

//use post
const postData = (route,data) => {
    return axios.post(`${url}/${route}`,data).then(res => res.data)
}
export default {
    getData,
    postData
}