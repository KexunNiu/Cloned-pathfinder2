describe('signup page', () => {
    it('should load signup page', () => {
      cy.visit('http://platform.pathfinder.test/signup')     
    })
    it('should has signup', () => {
        cy.get("h1").contains("Sign up")        
    })
    it('should has input field', () => {     
        cy.get('input')
    })
    it('test email input', () => {     
        cy.get('input[name="username"]').type('test@email')
    })
    it('test password input', () => {     
        cy.get('input[name="password"]').type('12345678')
    })
    it('test confirm password input', () => {     
        cy.get('input[name="re_password"]').type('12345678')
    })
    it('test new to skill city message', () => {   
        cy.get('p').contains("Have an account already?")    
      
    })
  
})
  