import React,{ useState, useEffect} from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import DisplayBlog from './components/Blog'

function App() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogList, setBloglist] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')

  const displayMessage = (message, status) =>{
    let divStyle = {
      background: 'smoke',
      color: 'green',
      border: '3px solid green',
      margin: '20px',
      padding: '0px 0px 0px 20px'
    }

    if(status === 'error'){
      const messageData = message.response.data
      // messageData is an object with .error property

      divStyle = {
        background: 'smoke',
        color: 'red',
        border: '3px solid red',
        margin: '20px',
        padding: '0px 0px 0px 20px'
      } 
      return (
        <div style={divStyle}>
          {messageData.error}
        </div>
      )
    }else{
      const {title, author} = message
      return (
        <div style={divStyle}>
          {title} added by {author}
        </div>
      )
    }
  }

  const submitBlog = async event =>{
    event.preventDefault()
    const blogToAdd = {
      title,
      author,
      url
    }

    const newBlog = await blogService.createBlog(blogToAdd)
    const newMessage = displayMessage(newBlog)

    setBloglist(blogList.concat(newBlog))
    setMessage(newMessage)
    setTitle('')
    setAuthor('')
    setUrl('')
    setTimeout(()=> setMessage(''), 5000)
  }

  const blogForm = () => (
    <div>
      <form onSubmit={submitBlog}>
        <div>
          Title: 
          <input
            type='text'
            value={title}
            name='blogTitle'
            onChange={({target}) => setTitle(target.value)} 
          />
        </div>
        <div>
          Author: 
          <input
            type='text'
            value={author}
            name='blogAuthor'
            onChange={({target}) => setAuthor(target.value)} 
          />
        </div>
        <div>
          Url: 
          <input
            type='text'
            value={url}
            name='blogUrl'
            onChange={({target}) => setUrl(target.value)} 
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
  
  useEffect(()=>{
    const helper = async()=>{
      const storedUser = window.localStorage.getItem('loggedUser')
      if(storedUser){
        setUser(JSON.parse(storedUser))
        blogService.setToken(JSON.parse(storedUser))
      }
      const blogs = await blogService.getAll()
      setBloglist(blogs)
    }
    helper()
  },[])

  //watch here---------------------------------

  const loginHandler = async (event) => {
    event.preventDefault()

    const credentials = {
      username: userName,
      password
    }

    try{
      const userData = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(userData))

      setUser(userData)
      blogService.setToken(userData)
      //console.log(userData)
    }catch(exception){
      const newMessage = displayMessage(exception, 'error')
      setUserName('')
      setPassword('')
      setMessage(newMessage)
      setTimeout(()=> setMessage(''), 5000)
      console.log(exception.response)
    }
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
      {blogForm()}
      {blogList.map(blog => <DisplayBlog key={blog.id} blog={blog} />)}
    </div>
  )
  return (
    <div>
      {message}
      {
        user === null
        ? loginForm()
        : displayBlogs()
      }
    </div>
  )
}

export default App;
