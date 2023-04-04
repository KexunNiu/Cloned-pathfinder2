describe('editProfile page as a regular user', () => {
  it('login first and go to edit page, see all the popups', () => {
    cy.visit('http://platform.pathfinder.test/login')
    cy.get('input[name="username"]').type('test1@gmail.com')
    cy.get('input[name="password"]').type('testtesttest')
    cy.get('button').contains('Login').click()
    cy.visit('http://platform.pathfinder.test/editprofile')
    cy.contains('button', 'View Course List')
    cy.contains('button', 'View Mentee List')
    cy.contains('button', 'View Company List')
  })
})
