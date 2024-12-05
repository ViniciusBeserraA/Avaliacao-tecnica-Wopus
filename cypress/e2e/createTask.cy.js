describe('Formulário de Login - Login', () => {
  it('Deve preencher os campos e submeter o formulário de login', () => {
    cy.visit('http://localhost:3001/login');

    cy.get('input#email').type('adm@wopus.com');
    cy.get('input#password').type('wopus@2024');
    cy.contains('button', 'Entrar').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Usuário autenticado com sucesso').should('be.visible');
    cy.contains('button', 'Criar Tarefa')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.get('input[placeholder="Título da tarefa"]').type('Nova Tarefa');

    cy.get('textarea[placeholder="Descrição da tarefa"]').type(
      'Descrição da tarefa',
    );

    cy.get('#criar-tarefa-btn').contains('Criar Tarefa').click();

    cy.contains('Tarefa criada com sucesso!').should('be.visible');
    cy.url().should('include', '/dashboard');
  });
});
