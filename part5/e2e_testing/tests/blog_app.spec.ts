

const { describe, test, expect, beforeEach, afterAll } = require('@playwright/test')
const { loginWith,createBlog } = require('./helper')

const username = 'tester'
const password = 'test1234'
beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'test',
                username: username,
                password: password
            }
        })

        await page.goto('/')
    })

describe('Blog app', () => {


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
            await createBlog(page, 'E2E testing','Test Author','https://fullstackopen.com/en/part5/end_to_end_testing_playwright')
            await expect(page.getByText('E2E testing Test Author')).toBeVisible()
        })
        test('user can like a blog', async ({ page }) => {
            await createBlog(page, 'E2E testing','Test Author','https://fullstackopen.com/en/part5/end_to_end_testing_playwright')
            await page.getByText('view').click()
            const likeButton = page.getByText('like')
            await likeButton.click()
            await expect(page.getByText('likes 1')).toBeVisible()
        })
    })
})