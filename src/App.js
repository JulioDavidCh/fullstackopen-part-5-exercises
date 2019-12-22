import React,{ useState, useEffect} from 'react';
import loginService from './services/login'
import blogsService from './services/blogs'
import DisplayBlog from './components/Blog'

function App() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogList, setBloglist] = useState([])

  // const BlogList  = [
  //   {
  //     title: "testing",
  //     author: "testing",
  //     url: "testing",
  //     likes: 5,
  //     id: "5df17a40f9726b3c70fa2874"
  //   },
  //   {
  //     title: "probando211",
  //     author: "probando211",
  //     url: "probando211",
  //     likes: 0,
  //     user: {
  //     username: "gab",
  //     name: "julio",
  //     id: "5dfcd853da466138accb26bd"
  //   },
  //     id: "5dfd3ab45a6d3826847fe7a1"
  //   }
  // ]
  
  useEffect(()=>{
    const helper = async()=>{
      const storedUser = window.localStorage.getItem('loggedUser')
      if(storedUser) setUser(JSON.parse(storedUser))
      const blogs = await blogsService.getAll()
      setBloglist(blogs)
    }
    helper()
  },[])

  const loginHandler = async (event) => {
    event.preventDefault()
    const credentials = {
      username: userName,
      password
    }

    const userData = await loginService.login(credentials)

    window.localStorage.setItem('loggedUser', JSON.stringify(userData))

    setUser(userData)
    console.log(userData)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginHandler} >
        <div>
          Username: 
          <input
          type="text"
          value={userName}
          name="Username"
          onChange={({target}) => setUserName(target.value) }
          />
        </div> 
        <div>
          Password:
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value) }
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )

  const logoutHandler = event => {
    //event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const displayBlogs = () => (
    <div>
      <div>
        <h2>
          Blogs:
        </h2>
        {user.name} logged in
        <button onClick={logoutHandler} >logout</button>
      </div>
      <br></br>
      {blogList.map(blog => <DisplayBlog key={blog.id} blog={blog} />)}
    </div>
  )
  return (
    <div>
      {
        user === null
        ? loginForm()
        : displayBlogs()
      }
    </div>
  )
}

export default App;
