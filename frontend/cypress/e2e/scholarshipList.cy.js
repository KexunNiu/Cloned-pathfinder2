describe('scholarship list testing', () => {
  it('login first', () => {
    cy.visit('http://platform.pathfinder.test/login')
    cy.get('input[name="username"]').type('testdemo@gmail.com')
    cy.get('input[name="password"]').type('testtesttest')
    cy.get('button').contains('Login').click()
    cy.wait(2000)
    cy.visit('http://platform.pathfinder.test/scholarships')
  })
})
