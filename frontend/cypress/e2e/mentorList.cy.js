describe('mentor list testing', () => {
  it('login first and go to mentor list', () => {
    cy.visit('http://platform.pathfinder.test/login')
    cy.get('input[name="username"]').type('test1@gmail.com')
    cy.get('input[name="password"]').type('testtesttest')
    cy.get('button').contains('Login').click()
    cy.visit('http://platform.pathfinder.test/mentors')
  })
})
