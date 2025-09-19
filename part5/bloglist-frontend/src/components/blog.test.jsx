import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { use } from 'react'

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