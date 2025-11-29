

const { describe, test, expect, beforeEach, afterAll } = require('@playwright/test')
const { loginWith, createBlog, createUser } = require('./helper')

const t1_name = 'test'
const username = 'tester'
const password = 'test1234'

const t2_name = 'test2'
const t2_username = 'tester2'
const t2_password = 'test1234'


describe('Blog app', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: t1_name,
                username: username,
                password: password
            }
        })
        await request.post('/api/users', {
            data: {
                name: t2_name,
                username: t2_username,
                password: t2_password
            }
        })
        await page.goto('/')
    })
    test('Login form is shown', async ({ page }) => {
        const locator = page.getByText('blogs')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Username')).toBeVisible()
        await expect(page.getByText('Password')).toBeVisible()
        await expect(page.getByText('Login')).toBeVisible()
    })
    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, username, password)
            await expect(page.getByText(`Logged in user: ${username}`)).toBeVisible()
        })
        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, username, "wrongpassword")
            await expect(page.getByText(`Wrong username or password`)).toBeVisible()
        })
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, username, password)
        })
        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'E2E testing', 'Test Author', 'https://fullstackopen.com/en/part5/end_to_end_testing_playwright')
            await expect(page.getByText('E2E testing Test Author')).toBeVisible()
        })
        test('User can logout', async ({ page }) => {
            await page.getByRole('button', { name: 'Logout' }).click()
            await expect(page.getByText('Login')).toBeVisible()

        })
    })
    describe('Blog actions', () => {

        test('user can like a blog when logged in', async ({ page }) => {
            await loginWith(page, username, password)
            await createBlog(page, 'Like testing', 'Test Author', 'https://fullstackopen.com/en/part5/end_to_end_testing_playwright')
            await page.getByRole('button', { name: 'View' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('likes 1')).toBeVisible()
        })
        test('blog can be deleted when logged in', async ({ page }) => {
            await loginWith(page, username, password)
            page.on('dialog', async dialog => { await dialog.accept()})
            await createBlog(page, 'Delete testing', 'Test Author', 'https://fullstackopen.com/en/part5/end_to_end_testing_playwright')
            const blog = page.getByText('Delete testing Test Author')
            const blogCard = blog.locator('..')
            await blogCard.getByRole('button', { name: 'View' }).click()
            await blogCard.getByRole('button', { name: 'remove' }).click()
            await expect(page.getByText('Delete testing Test Author')).not.toBeVisible()
        })
        test('blog cant be deleted when not logged in', async ({ page}) => {
            await loginWith(page, username, password)
            page.on('dialog', async dialog => { await dialog.accept()})
            await createBlog(page, 'Delete testing', 'Test Author', 'https://fullstackopen.com/en/part5/end_to_end_testing_playwright')
            await page.getByRole('button', { name: 'Logout' }).click()

            await loginWith(page, t2_username, t2_password)
            const blog = page.getByText('Delete testing Test Author')
            await blog.getByRole('button', { name: 'View' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
        test('blogs are ordered by likes', async ({ page}) => {
            await loginWith(page, username, password)
            page.on('dialog', async dialog => { await dialog.accept()})
            await createBlog(page, 'Like testing 1', 'Test Author', 'https://fullstackopen.com/en/part5/end_to_end_testing_playwright')
            await createBlog(page, 'Like testing 2', 'Test Author', 'https://fullstackopen.com/en/part5/end_to_end_testing_playwright')
            
            const blog = page.getByText('Like testing 1 Test Author')
            await blog.getByRole('button', { name: 'View' }).click()
            const blogCard = blog.locator('..')
            for (let i = 0; i < 10; i++) {
                await blogCard.getByRole('button', { name: 'like' }).click()
                await page.waitForTimeout(200)
            }
        
            const blog2 = page.getByText('Like testing 2 Test Author')
            await blog2.getByRole('button', { name: 'View' }).click()
            const blogCard2 = blog2.locator('..')
            for (let i = 0; i < 5; i++) {
                await blogCard2.getByRole('button', { name: 'like' }).click() 
                await page.waitForTimeout(200)
            }

            const allBlogs = await page.getByTestId('blog')
            await expect(allBlogs.nth(0)).toContainText('Like testing 1 Test Author')


        })
    })
})
