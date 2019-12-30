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

    //When blogs are rendered, the blog form isn't this is why we test for the form's content
    expect(component.container).toHaveTextContent('Username:')
    expect(component.container).toHaveTextContent('Password:')
    expect(component.container).toHaveTextContent('Login')

  })
})