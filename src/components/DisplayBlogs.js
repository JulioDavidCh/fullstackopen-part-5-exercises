import React,{useState, useEffect} from 'react'
import DisplayBlog from './Blog'
import Forms from './Forms'
import Togglable from './Togglable'
import BlogService from '../services/blogs'

const {BlogForm} = Forms

const DisplayBlogs = ({ blogData, blogHandlers }) => {
  const {user, title, author, url, blogList} = blogData
  const {titleChangeHandler, authorChangeHandler, urlChangeHandler, logoutHandler, submitBlog} = blogHandlers
  const [allBlogs, setAllBlogs] = useState(blogList)
  const sortedBlogs = allBlogs.sort((a,b)=> b.likes - a.likes)

  useEffect(()=>{
    setAllBlogs(blogList)
  },[blogList])

  return(
    <div>
    <div>
      <h2>
        Blogs:
      </h2>
      {user.name} logged in
      <button onClick={logoutHandler} >logout</button>
    </div>
    <br></br>
    <Togglable buttonLabel={'New Blog'}>
      <BlogForm
        title={title}
        author={author}
        url={url}
        titleChangeHandler={titleChangeHandler}
        authorChangeHandler={authorChangeHandler}
        urlChangeHandler={urlChangeHandler}
        submitBlog={submitBlog}
      />
    </Togglable>
    {sortedBlogs.map(blog =>{
      
      const likedBlog = {...blog}
      likedBlog.likes = likedBlog.likes + 1
      
      const onLikeHandler = async event =>{
        const AllTheBlog = [...allBlogs]
        const updatedBlog = await BlogService.updateBlog(likedBlog)
        const findIndexBlog = AllTheBlog.findIndex(blog => blog.id === updatedBlog.id)
        AllTheBlog[findIndexBlog] = updatedBlog
        setAllBlogs(AllTheBlog)
      }

      return(
        <DisplayBlog key={blog.id} blogData={blog} likeHandler={onLikeHandler} />
      )
    })}
  </div>
  )
}

export default DisplayBlogs