import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {

  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Log in to application')
    )

    //When the form is rendered, the blogs aren't this is why we test for the form's content
    expect(component.container).toHaveTextContent('Username:')
    expect(component.container).toHaveTextContent('Password:')
    expect(component.container).toHaveTextContent('Login')

  })

  test('if an user is logged in, blogs are shown correctly', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Blogs:')
    )

    //component.debug()

    const blogs = component.container.querySelectorAll('.blog')

    //When blogs are rendered, the blog form isn't, this is why we test for the blog's content
    expect(blogs.length).toBe(3)
    expect(component.container).toHaveTextContent('qk?')
    expect(component.container).toHaveTextContent('soy frances')
    expect(component.container).toHaveTextContent('pizza es mejor que hallaca')
  })
})