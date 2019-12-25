import React,{ useState } from 'react'
import BlogService from '../services/blogs'

const Blog = ({ blogData }) => {
  const [blog, setBlog] = useState('')
  let showWholeBlog = false
  const [currentBlog, setCurrentBlog] = useState(blogData)

  const {title, author, url, likes, id} = currentBlog

  const onClickHideHandler = () => {
    if(showWholeBlog) setBlog(completeBlog)
    if(!showWholeBlog) setBlog('')
    showWholeBlog = !showWholeBlog
  }

  const onLikeHandler = async event => {

    //event.stopPropagation()

    const likedBlog = {
      title,
      author,
      url,
      likes: likes + 1,
      id
    }
    const updatedBlog = await BlogService.updateBlog(likedBlog)
    setCurrentBlog(updatedBlog)
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
      <a href={currentBlog.url}>{currentBlog.url}</a>
      <p>likes: {currentBlog.likes}  <button onClick={onLikeHandler}>Like</button></p>
      <p>added by {currentBlog.user.username}</p>
    </div>
  )

  return (
    <div onClick={onClickHideHandler} style={blogStyle}>
      {currentBlog.title} {currentBlog.author}
      {blog}
    </div>
  )
}

export default Blog