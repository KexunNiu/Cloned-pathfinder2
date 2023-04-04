describe('scholarship detail page testing', () => {
  it('login first', () => {
    cy.visit('http://platform.pathfinder.test/login')
    cy.get('input[name="username"]').type('test1@gmail.com')
    cy.get('input[name="password"]').type('testtesttest')
    cy.get('button').contains('Login').click()
    cy.visit('http://platform.pathfinder.test/scholarship/1')
  })

  it('check description field', () => {
    cy.get('h2').contains('Description')
  })
  it('check eligibility field', () => {
    cy.get('h2').contains('Eligibility')
  })
  it('check scholarship amount field', () => {
    cy.get('h2').contains('Scholarship Amount')
  })
  it('check deadline field', () => {
    cy.get('h2').contains('Deadline')
  })
  it('check more detail field', () => {
    cy.visit('http://platform.pathfinder.test/scholarship/1')
    cy.get('h2').contains('For More Detail and Apply')
  })
})
