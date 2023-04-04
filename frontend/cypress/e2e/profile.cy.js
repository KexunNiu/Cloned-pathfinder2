describe('profile page', () => {
  it('login first', () => {
    cy.visit('http://platform.pathfinder.test/login')
  })
  it('test username input', () => {
    cy.get('input[name="username"]').type('testdemo@gmail.com')
  })
  it('test password input', () => {
    cy.get('input[name="password"]').type('testtesttest')

    cy.get('button').contains('Login').click()
    cy.visit('http://platform.pathfinder.test/profile')
  })
  it('logout', () => {
    cy.visit('http://platform.pathfinder.test/logout')
    cy.get('button').contains('Yes').click()
  })
})
