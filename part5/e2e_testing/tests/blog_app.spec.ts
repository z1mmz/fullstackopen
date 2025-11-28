

const { describe, test, expect, beforeEach, afterAll } = require('@playwright/test')
const { loginWith } = require('./helper')

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

afterAll(async ({ request }) => {
    await request.post('/api/testing/reset')
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
            await page.goto('/')
            await loginWith(page, username, password)
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'Create Blog' }).click()
            await page.getByLabel('title:').fill('E2E testing')
            await page.getByLabel('author:').fill('Test Author')
            await page.getByLabel('url:').fill('https://fullstackopen.com/en/part5/end_to_end_testing_playwright')
            await page.getByRole('button', { name: 'Post' }).click()
            await expect(page.getByText('E2E testing Test Author')).toBeVisible()
        })
    })
})