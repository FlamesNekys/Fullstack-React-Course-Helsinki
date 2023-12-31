describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            username: 'test',
            name: 'First User',
            password: 'password',
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:5173')
    })

    it('login page can be opened', () => {
        cy.contains('Log in to application')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', () => {
            cy.get('#username').type('test')
            cy.get('#password').type('password')
            cy.get('#login-button').click()

            cy.contains('successfully logged in')
            cy.contains('First User logged in')
        })

        it('fails with wrong credentials', () => {
            cy.get('#username').type('test')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('#error')
                .should('contain', 'Wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('when logged in', () => {
        beforeEach(() => {
            cy.login({ username: 'test', password: 'password' })
        })

        it('a new blog can be created', () => {
            cy.contains('new blog').click()
            cy.get('#title-form').type('Test')
            cy.get('#author-form').type('Tester')
            cy.get('#url-form').type('none')
            cy.contains('Create').click()
        })

        describe('when blog is created', () => {
            beforeEach(() => {
                cy.createBlog({ title: 'Test', author: 'Tester', url: 'none' })
            })

            it('a blog can be liked', () => {
                cy.contains('view').click()
                cy.contains('like').click()
                cy.contains(1)
            })

            it('creator of the blog can delete it', () => {
                cy.contains('view').click()
                cy.contains('remove').click()
                cy.should('not.contain', 'Tester')
                cy.contains('successfully deleted')
            })

            it('only creator sees remove button', () => {
                const user2 = {
                    username: 'test2',
                    name: 'Second User',
                    password: 'password',
                }
                cy.request('POST', 'http://localhost:3003/api/users', user2)

                cy.contains('Log out').click()

                cy.get('#username').type('test2')
                cy.get('#password').type('password')
                cy.get('#login-button').click()

                cy.contains('view').click()
                cy.get('.blog').should('not.contain', 'remove')
            })
        })

        describe('when there are several blogs', () => {
            beforeEach(() => {
                cy.createBlog({ title: 'Test 1', author: 'Tester 1', url: 'none', likes: 4 })
                cy.createBlog({ title: 'Test 2', author: 'Tester 2', url: 'none', likes: 2 })
                cy.createBlog({ title: 'Test 3', author: 'Tester 3', url: 'none', likes: 8 })
            })

            it('blogs are ordered according to likes', () => {
                cy.get('.blog').eq(0).should('contain', 'Test 3')
                cy.get('.blog').eq(1).should('contain', 'Test 1')
                cy.get('.blog').eq(2).should('contain', 'Test 2')
            })
        })
    })
})
