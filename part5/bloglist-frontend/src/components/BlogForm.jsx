import { useState } from 'react'
import blogs from '../services/blogs'
const BlogForm = ({handleBlogSubmit}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisbile] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    handleBlogSubmit({ title:title, author:author, url:url })
    setTitle('')
    setAuthor('')
    setUrl('')  
  }

  
  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label> 
          <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <label>Author:</label> 
          <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          <label>Url:</label>
          <input type='text' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>Post</button>
      </form>
    </div>
  )
}

export default BlogForm