
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const totalLikes = blogs.reduce(
    (accumulator, current) => accumulator + current.likes,
    0,)
  return totalLikes
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0
    ? null
    : blogs.reduce((previous,current) => {
        return (previous.likes > current.likes) ? previous : current
    })

}

const mostBlogs = (blogs) => {
    const authorMap = new Map();

    blogs.forEach(blog => {
        if(authorMap.has(blog.author)){
            authorMap.set(blog.author,authorMap.get(blog.author) + 1)
        }else{
            authorMap.set(blog.author,1)
        }
    });
    const [author, count] = [...authorMap.entries()].reduce((previous,current) =>{
        return (previous[1] > current[1]) ? previous : current
    })
    return {author:author,blogs:count}
}

const mostLikes = (blogs) => {
    const authorMap = new Map();

    blogs.forEach(blog => {
        if(authorMap.has(blog.author)){
            authorMap.set(blog.author,authorMap.get(blog.author) + blog.likes)
        }else{
            authorMap.set(blog.author,blog.likes)
        }
    });
    const [author, likes] = [...authorMap.entries()].reduce((previous,current) =>{
        return (previous[1] > current[1]) ? previous : current
    })
    return {author:author,likes:likes}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}