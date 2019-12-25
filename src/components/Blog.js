import React,{ useState } from 'react'

const Blog = ({ blogData }) => {
  const [blog, setBlog] = useState('')
  let showWholeBlog = false

  let onClickHideHandler = () => {
    if(showWholeBlog) setBlog(completeBlog)
    if(!showWholeBlog) setBlog('')
    showWholeBlog = !showWholeBlog
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const completeBlog = (
    <div>
      <br></br>
      <a href={blogData.url}>{blogData.url}</a>
      <p>likes: {blogData.likes}  <button onClick={event => event.stopPropagation()}>Like</button></p>
      <p>added by {blogData.user.username}</p>
    </div>
  )

  return (
    <div onClick={onClickHideHandler} style={blogStyle}>
      {blogData.title} {blogData.author}
      {blog}
    </div>
  )
}

export default Blog