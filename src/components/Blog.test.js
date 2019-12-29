import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const newBlogData = {
  title: 'testing',
  author: 'julio',
  url: 'www.testing.com',
  likes: 1,
  user : {
    username: 'gab'
  }
}

const newLoggedUser = {
  username: 'gab',
  name: 'julio'
}

let component

describe('Correctly render blogs for', () => {

  beforeEach(() => {
    component = render(
      <Blog blogData={newBlogData} loggedUser={newLoggedUser} />
    )
  })

  test('title', () => {
    expect(component.container).toHaveTextContent('testing')
  })

  test('author', () => {
    expect(component.container).toHaveTextContent('julio')
  })
})

describe('Does not render by default the', () => {

  beforeEach(() => {
    component = render(
      <Blog blogData={newBlogData} loggedUser={newLoggedUser} />
    )
  })

  test('url', () => {
    expect(component.container).not.toHaveTextContent('www.testing.com')
  })

  test('likes', () => {
    expect(component.container).not.toHaveTextContent('1')
  })

  test('username', () => {
    expect(component.container).not.toHaveTextContent('gab')
  })
})

describe('When the blog is clicked it becomes visible and shows the', () => {

  beforeEach(() => {
    component = render(
      <Blog blogData={newBlogData} loggedUser={newLoggedUser} />
    )
  })

  test('title', () => {
    const ourBlog = (component.container).querySelector('.blog')
    fireEvent.click(ourBlog)
    expect(component.container).toHaveTextContent('testing')
  })

  test('author', () => {
    const ourBlog = (component.container).querySelector('.blog')
    fireEvent.click(ourBlog)
    expect(component.container).toHaveTextContent('julio')
  })

  test('url', () => {
    const ourBlog = (component.container).querySelector('.blog')
    fireEvent.click(ourBlog)
    expect(component.container).toHaveTextContent('www.testing.com')
  })

  test('likes', () => {
    const ourBlog = (component.container).querySelector('.blog')
    fireEvent.click(ourBlog)
    expect(component.container).toHaveTextContent('1')
  })

  test('username', () => {
    const ourBlog = (component.container).querySelector('.blog')
    fireEvent.click(ourBlog)
    expect(component.container).toHaveTextContent('gab')
  })
})