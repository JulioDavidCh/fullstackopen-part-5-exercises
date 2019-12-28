import React from 'react'

const DisplayMessage = ({ message, status }) => {
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
    const { title, author } = message
    return (
      <div style={divStyle}>
        {title} added by {author}
      </div>
    )
  }
}

export default DisplayMessage