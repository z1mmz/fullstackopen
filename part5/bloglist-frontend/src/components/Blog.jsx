import { useState } from "react"
import Togglable from "./togglable"

const Blog = ({ blog }) => {
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

  
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  return (
  <div style={blogStyle}>
    <div>{blog.title} {blog.author} <button onClick={() => (toggleVisibility())}>{!detailsVisible? "view":"close"}</button></div> 
    <div style={showWhenVisible}>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button>like</button></div>
      <div>{blog.user.name}</div>
    </div>
  </div>  
)
}
export default Blog