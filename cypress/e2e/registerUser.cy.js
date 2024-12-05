describe('Formulário de Login - Cadastro de usuário se ele nao existir', () => {
  const userEmail = 'testecypress@gmail.com';
  const userPassword = 'testecypress123';

  it('Deve preencher os campos e submeter o formulário de cadastro de usuário ou logar se já existir', () => {
    cy.visit('http://localhost:3001/login');

    cy.get('button.px-4.py-2.rounded-t-lg').contains('Cadastro').click();
    cy.get('input#email').type(userEmail);
    cy.get('input#password').type(userPassword);
    cy.contains('button', 'Cadastrar usuário').click();

    cy.contains(
      'Usuário com o email testecypress@gmail.com já está registrado.',
    )
      .should('be.visible')
      .then(() => {
        cy.get('button.px-4.py-2.rounded-t-lg').contains('Login').click();
        cy.get('input#email');
        cy.get('input#password');
        cy.contains('button', 'Entrar').click();
      });

    cy.contains('Usuário autenticado com sucesso').should('be.visible');
    cy.url().should('include', '/dashboard');
  });
});
