describe('login page', () => {
  it('should load login page', () => {
    cy.visit('http://platform.pathfinder.test/login')
  })
  it('should has login', () => {
    cy.get('h1').contains('Login')
  })
  it('should has input field', () => {
    cy.get('input')
  })
  it('test username input', () => {
    cy.get('input[name="username"]').type('testdemo@gmail.com')
  })
  it('test password input', () => {
    cy.get('input[name="password"]').type('testtesttest')
  })
  it('test forgot password message', () => {
    cy.get('p').contains('Forgot Password?')
  })
  it('test forgot password message', () => {
    cy.get('p').contains('Forgot Password?')
  })
})
