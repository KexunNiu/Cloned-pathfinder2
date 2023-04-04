describe('logout testing', () => {
  it('login first', () => {
    cy.visit('http://platform.pathfinder.test/login')
    cy.get('input[name="username"]').type('testdemo@gmail.com')
    cy.get('input[name="password"]').type('testtesttest')
    cy.get('button').contains('Login').click()
  })

  it('logout', () => {
    cy.visit('http://platform.pathfinder.test/logout')
    cy.get('button').contains('Yes').click()
  })
})
