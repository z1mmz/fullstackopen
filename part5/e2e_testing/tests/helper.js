const loginWith = async (page, username, password)  => {
    await page.getByLabel('Username').fill(username)
    await page.getByLabel('Password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}
const createBlog = async (page, title, author, url) => { 
    await page.getByRole('button', { name: 'Create Blog' }).click()
    console.log(title, author, url)
    await page.getByLabel('Title:').fill(title)
    await page.getByLabel('Author:').fill(author)
    await page.getByLabel('Url:').fill(url)
    await page.getByRole('button', { name: 'Post' }).click()

}   
export { loginWith, createBlog}