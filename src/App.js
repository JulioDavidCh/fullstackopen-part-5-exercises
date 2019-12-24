import React,{ useState, useEffect} from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import FormsComponent from './components/Forms'
import DisplayMessage from './components/DisplayMessage'
import DisplayBlogs from './components/DisplayBlogs'

const {LoginForm} = FormsComponent

function App() {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogList, setBloglist] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')

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

  const submitBlog = async event =>{
    event.preventDefault()
    const blogToAdd = {
      title,
      author,
      url
    }

    const newBlog = await blogService.createBlog(blogToAdd)
    const newMessage = <DisplayMessage
      message={newBlog}
      title={title}
      author={author}
    />

    setBloglist(blogList.concat(newBlog))
    setMessage(newMessage)
    setTitle('')
    setAuthor('')
    setUrl('')
    setTimeout(()=> setMessage(''), 5000)
  }

  const titleChangeHandler = ({ target }) => setTitle(target.value)
  const authorChangeHandler = ({ target }) => setAuthor(target.value)
  const urlChangeHandler = ({ target }) => setUrl(target.value)
  
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
    }catch(exception){
      const newMessage = <DisplayMessage
      message={exception}
      status={'error'}
      title={title}
      author={author}
    />
      setUsername('')
      setPassword('')
      setMessage(newMessage)
      setTimeout(()=> setMessage(''), 5000)
      console.log(exception.response)
    }
  }

  const usernameHandler = ({ target }) => setUsername(target.value)
  const passwordHandler = ({ target }) => setPassword(target.value)

  const logoutHandler = event => {
    //event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }
  
  const blogData = {
    title,
    author,
    url,
    user,
    blogList
  }

  const blogHandlers = {
    logoutHandler,
    titleChangeHandler,
    authorChangeHandler,
    urlChangeHandler,
    submitBlog
  }

  return (
    <div>
      {message}
      {
        user === null
        ? <LoginForm 
            loginHandler={loginHandler}
            userName={userName}
            password={password}
            onChangeUsermame={usernameHandler}
            onChangePassword={passwordHandler}
          />
        : <DisplayBlogs 
            blogData={blogData}
            blogHandlers={blogHandlers}
          />
      }
    </div>
  )
}

export default App;
