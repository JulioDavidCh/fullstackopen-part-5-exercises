import React,{ useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blogData, likeHandler, deleteHandler }) => {
  const [showBlog, setShowBlog] = useState(false)

  let onClickHideHandler = () => {
    setShowBlog(!showBlog)
  }

  const completeBlog = (
    <div>
     <br></br>
     <a href={blogData.url}>{blogData.url}</a>
     <p>likes: {blogData.likes}  <button onClick={likeHandler}>Like</button></p>
     <p>added by {blogData.user.username}</p>
     <button onClick={deleteHandler}>Remove</button>
    </div>
  )

  return (
    <div onClick={onClickHideHandler} style={blogStyle}>
      {blogData.title} {blogData.author}
      {
        showBlog
        ? completeBlog
        : ''
      }
    </div>
  )
}

export default Blog