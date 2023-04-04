describe('company detail page testing and go to company detail page', () => {
  it('login first', () => {
    cy.visit('http://platform.pathfinder.test/login')
    cy.get('input[name="username"]').type('test1@gmail.com')
    cy.get('input[name="password"]').type('testtesttest')
    cy.get('button').contains('Login').click()
    cy.visit('http://platform.pathfinder.test/company/1')
  })

  it('check background field', () => {
    cy.get('h2').contains('Background')
  })

  it('check description field', () => {
    cy.get('h2').contains('Description')
  })

  it('check website field', () => {
    cy.get('h2').contains('Website')
  })
})
