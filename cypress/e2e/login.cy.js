describe('Formulário de Login - Login', () => {
  it('Deve preencher os campos e submeter o formulário de login', () => {
    cy.visit('http://localhost:3001/login');

    cy.get('input#email').type('adm@wopus.com');
    cy.get('input#password').type('wopus@2024');
    cy.contains('button', 'Entrar').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Usuário autenticado com sucesso').should('be.visible');
  });
});

describe('Formulário de Login - Login', () => {
  it('Deve preencher os campos e submeter o formulário de login com erros', () => {
    cy.visit('http://localhost:3001/login');

    cy.get('input#email').type('adm@wopus.com');
    cy.get('input#password').type('wopuss@2024');
    cy.contains('button', 'Entrar').click();
    cy.url().should('include', '/login');
    cy.contains('Credenciais inválidas').should('be.visible');
  });
});
