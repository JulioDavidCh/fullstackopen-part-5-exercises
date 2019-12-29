import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const newBlog = {
  title: 'testing',
  author: 'john',
  likes: 1
}

let component

describe('Blog is correctly rendered for', () => {

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={newBlog} />
    )
  })

  test('title', () => {
    expect(component.container).toHaveTextContent('testing')
  })

  test('author', () => {
    expect(component.container).toHaveTextContent('john')
  })

  test('likes', () => {
    expect(component.container).toHaveTextContent('1')
  })

})

test('button is properly pressed twice', () => {
  const onClickMock = jest.fn()

  component = render(
    <SimpleBlog blog={newBlog} onClick={onClickMock} />
  )

  const button = component.container.querySelector('button')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(onClickMock.mock.calls.length).toBe(2)
})