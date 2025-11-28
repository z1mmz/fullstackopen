

const { describe, test, expect, beforeEach, afterAll } = require('@playwright/test')
const { loginWith } = require('./helper')

const username = 'tester'
const password = 'test1234'
describe('Blog app', () => {
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
})