import React,{ useState } from 'react'

const Togglable = (props) =>{
  const [visible, setVisible] = useState(false)
  const { buttonLabel } = props

  const showWhenVisible = {display: visible ? '' : 'none'}
  const hideWhenVisible = {display: visible ? 'none' : ''}

  const toggleVisible = () =>{
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>
          cancel
        </button>
      </div>
    </div>
  )
}

export default Togglable