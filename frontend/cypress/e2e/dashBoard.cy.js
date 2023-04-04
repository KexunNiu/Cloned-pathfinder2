describe('dashBoard testing', () => {
  it('login first', () => {
    cy.visit('http://platform.pathfinder.test/login')
    cy.get('input[name="username"]').type('test1@gmail.com')
    cy.get('input[name="password"]').type('testtesttest')
    cy.get('button').contains('Login').click()

    cy.visit('http://platform.pathfinder.test/dashboard')
  })

  it('go to Dashboard page', () => {
    cy.visit('http://platform.pathfinder.test/dashboard')
    cy.get('h1').contains('Dashboard')
  })

  it('check scholarships', () => {
    cy.visit('http://platform.pathfinder.test/dashboard')
    cy.get('h1').contains('Explore Scholarships')
  })
  it('check opportunities', () => {
    cy.visit('http://platform.pathfinder.test/dashboard')
    cy.get('h1').contains('Explore Opportunities')
  })
  it('check companies', () => {
    cy.visit('http://platform.pathfinder.test/dashboard')
    cy.get('h1').contains('Explore Companies')
  })
})
