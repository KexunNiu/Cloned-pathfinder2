describe('opportunity detail page testing', () => {
  it('login first and go to the first opportunity item', () => {
    cy.visit('http://platform.pathfinder.test/login')
    cy.get('input[name="username"]').type('testdemo@gmail.com')
    cy.get('input[name="password"]').type('testtesttest')
    cy.get('button').contains('Login').click()
    cy.visit('http://platform.pathfinder.test/opportunity/1')
  })

  it('check description field', () => {
    cy.get('h2').contains('Description')
  })

  it('check more detail field', () => {
    cy.get('h2').contains('For More Detail and Apply')
  })
})