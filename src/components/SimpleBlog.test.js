import React from 'react'
import { render } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'testing',
  author: 'john',
  likes: 1
}

test('renders title', () => {

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent('testing')
})

test('renders author', () => {

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent('john')
})

test('renders likes', () => {

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent('1')
})