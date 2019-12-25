import axios from 'axios'
const baseUrl = '/api/blogs'
let token = ''

const setToken = userToken =>{
  token = ` bearer ${userToken.token}`
}

const getAll = () =>{
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async newBlog =>{
  const config = {
    headers: {Authorization: token},
  }
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const updateBlog = async newBlog =>{
  const request = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog)
  console.log(request.data)
  return request.data
}

export default { getAll, setToken, createBlog, updateBlog}