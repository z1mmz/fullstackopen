import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import login from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogsLoggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      console.log(exception)
    }
  }
  const handleLogout = async () =>{
    window.localStorage.removeItem('blogsLoggedInUser')
    setUser(null)
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

  const blogList = (<div> <h2>blogs</h2>{blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )}</div>)

  
  return (
    <div>
      {user ? <div><h2>Logged in user: {user.username}</h2> <button onClick={() => handleLogout()}>logout</button></div>: loginForm}
      {user ? blogList:null }
    </div>
  )
}

export default App