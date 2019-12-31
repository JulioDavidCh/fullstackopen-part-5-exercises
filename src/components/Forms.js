import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginHandler, userNameState, passwordState }) => (
  <form onSubmit={loginHandler} autoComplete="off" >
    <legend>
      <h2>Log in to application</h2>
    </legend>
    <fieldset>
      <label>
        Username:
        <input
          {...userNameState}
        />
      </label>
      <div>
        <label>
          Password:
          <input
            {...passwordState}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </fieldset>
  </form>
)

const BlogForm = ({ title, author, url, titleChangeHandler, authorChangeHandler, urlChangeHandler, submitBlog }) => (
  <div>
    <form onSubmit={submitBlog}>
      <div>
        Title:
        <input
          type='text'
          value={title}
          name='blogTitle'
          onChange={titleChangeHandler}
        />
      </div>
      <div>
        Author:
        <input
          type='text'
          value={author}
          name='blogAuthor'
          onChange={authorChangeHandler}
        />
      </div>
      <div>
        Url:
        <input
          type='text'
          value={url}
          name='blogUrl'
          onChange={urlChangeHandler}
        />
      </div>
      <button type='submit'>Create</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  userNameState: PropTypes.object.isRequired,
  passwordState: PropTypes.object.isRequired,
  loginHandler: PropTypes.func.isRequired
}

BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  titleChangeHandler: PropTypes.func.isRequired,
  authorChangeHandler: PropTypes.func.isRequired,
  urlChangeHandler: PropTypes.func.isRequired,
  submitBlog: PropTypes.func.isRequired
}

export default {
  LoginForm,
  BlogForm
}