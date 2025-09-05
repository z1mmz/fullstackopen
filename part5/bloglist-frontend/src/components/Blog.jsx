import { useState } from "react"
import blogs from "../services/blogs"

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }
  const handleLike = () => {
    blog.likes = likes + 1
    setLikes(blog.likes)
    console.log('like', blog)
    blogs.updateBlog(blog.id, blog).then(() => {
      console.log('updated')
    })
  }
  
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  return (
  <div style={blogStyle}>
    <div>{blog.title} {blog.author} <button onClick={() => (toggleVisibility())}>{!detailsVisible? "view":"close"}</button></div> 
    <div style={showWhenVisible}>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={() => (handleLike())}>like</button></div>
      <div>{blog.user.name}</div>
    </div>
  </div>  
)
}
export default Blog