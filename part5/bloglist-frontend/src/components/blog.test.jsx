import { render, screen } from '@testing-library/react'
import Blog from './Blog'

import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: 'title text',
    likes: 0,
    author: 'author name',
    name: 'tester name ',
    url: 'http://test.com',
    user: { name: 'user name',id:1 }
  }
  const user = { name: 'user name',id:1 }
  render(<Blog blog={blog} user={user} />)
  const element = screen.getByText(`${blog.title} ${blog.author}`)
  expect(element).toBeDefined()

  expect(screen.getByText(blog.url)).not.toBeVisible()
  expect(screen.getByText(`likes ${blog.likes}`)).not.toBeVisible()
})

test('renders url and likes if clicked', async () => {
  const blog = {
    title: 'title text',
    likes: 0,
    author: 'author name',
    name: 'tester name ',
    url: 'http://test.com',
    user: { name: 'user name',id:1 }
  }
  const user = { name: 'user name',id:1 }
  render(<Blog blog={blog} user={user} />)
  const element = screen.getByText(`${blog.title} ${blog.author}`)
  expect(element).toBeDefined()
  const test_user = userEvent.setup()
  const button = screen.getByText('view')
  await test_user.click(button)

  expect(screen.getByText(blog.url)).toBeVisible()
  expect(screen.getByText(`likes ${blog.likes}`)).toBeVisible()
})