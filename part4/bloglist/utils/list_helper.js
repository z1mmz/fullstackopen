
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
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}