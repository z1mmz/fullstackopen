import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import login from './services/login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const getAllBlogs = async () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }

  useEffect(() => {
    getAllBlogs()

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogsLoggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const statusMessage = (message,type) =>{
    setMessageType(type)
    setMessage(message)
    setTimeout(()=>{
      setMessageType(null)
      setMessage(null)
    },5000)
  }

  const handleLogin = async (e) =>{
    e.preventDefault()
    try{
      const user = await login.login({username,password})
      window.localStorage.setItem('blogsLoggedInUser',JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch(exception){
      statusMessage('Wrong username or password', 'error')
      console.error(exception)
    }
  }
  const handleLogout = async () =>{
    window.localStorage.removeItem('blogsLoggedInUser')
    setUser(null)
  }
const handleBlogSubmit = async (e) => {
    blogService.createBlog(e)
      .then(() => statusMessage(`A new blog ${e.title} by ${e.author} added`, 'success'))
      .then(() => getAllBlogs())
      .catch(error => statusMessage(`Error: ${error}`, 'error'))

  }

  const loginForm = (
    <form onSubmit={handleLogin}>
    <div>
      Username <input type='text' value={username} name='Username' onChange={({target}) => setUsername(target.value)}></input>
    </div>
    <div>
    Password <input type='text' value={password} name='Password' onChange={({target}) => setPassword(target.value)}></input>
    </div>
    <button type='submit'>Login</button>
  </form>
  );

  const blogList = (<div> {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )}</div>)

  
  return (
    <div>
      {message? <Notification message={message} type={messageType} /> : null}
      <h2>blogs</h2>
      {user ? <div><b>Logged in user: {user.username}</b> <button onClick={() => handleLogout()}>logout</button></div>: loginForm}
      {user ? <Togglable buttonLabel="Create Blog"><BlogForm handleBlogSubmit={handleBlogSubmit}/></Togglable> : null}
      {user ? blogList :null }
    </div>
  )
}

export default App