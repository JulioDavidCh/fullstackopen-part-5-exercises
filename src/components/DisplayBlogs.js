import React from 'react'
import DisplayBlog from './Blog'
import Forms from './Forms'

const {BlogForm} = Forms

const DisplayBlogs = ({ blogData, blogHandlers }) => {
  const {user, title, author, url, blogList} = blogData
  const {titleChangeHandler, authorChangeHandler, urlChangeHandler, logoutHandler, submitBlog} = blogHandlers
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
    <BlogForm
      title={title}
      author={author}
      url={url}
      titleChangeHandler={titleChangeHandler}
      authorChangeHandler={authorChangeHandler}
      urlChangeHandler={urlChangeHandler}
      submitBlog={submitBlog}
    />
    {blogList.map(blog => <DisplayBlog key={blog.id} blog={blog} />)}
  </div>
  )
}

export default DisplayBlogs