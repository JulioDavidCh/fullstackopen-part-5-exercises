// import React,{ useState } from 'react'

// const blogStyle = {
//   paddingTop: 10,
//   paddingLeft: 2,
//   border: 'solid',
//   borderWidth: 1,
//   marginBottom: 5
// }

// const Blog = ({ blogData }) => {
//   const [blog, setBlog] = useState('')
//   let showWholeBlog = false

//   let onClickHideHandler = () => {
//     if(showWholeBlog) setBlog(completeBlog)
//     if(!showWholeBlog) setBlog('')
//     showWholeBlog = !showWholeBlog
//   }

//   const completeBlog = (
//     <div>
//       <br></br>
//       <a href={blogData.url}>{blogData.url}</a>
//       <p>likes: {blogData.likes}  <button onClick={event => event.stopPropagation()}>Like</button></p>
//       <p>added by {blogData.user.username}</p>
//     </div>
//   )

//   return (
//     <div onClick={onClickHideHandler} style={blogStyle}>
//       {blogData.title} {blogData.author}
//       {blog}
//     </div>
//   )
// }

// export default Blog

import React,{ useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blogData }) => {
  const [showBlog, setShowBlog] = useState(false)

  let onClickHideHandler = () => {
    setShowBlog(!showBlog)
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
      {
        showBlog
        ? completeBlog
        : ''
      }
    </div>
  )
}

export default Blog