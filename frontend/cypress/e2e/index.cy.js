describe('Index page', () => {
  it('should load base page', () => {
    cy.visit('http://platform.pathfinder.test/')
  })
  it('should has login', () => {
    cy.get('h2').contains('Pathfinder')
  })
  it('should has login button', () => {
    cy.get('button').contains('Login')
  })
  it('should has signup button', () => {
    cy.get('button').contains('Start your Journey Now')
  })
})
