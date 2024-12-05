describe('Formulário de Login - Login e Gerenciamento de Tarefas', () => {
  const userEmail = 'adm@wopus.com';
  const userPassword = 'wopus@2024';
  const taskTitle = 'Nova Tarefa';
  const taskDescription = 'Descrição da tarefa';
  const updatedTaskTitle = 'Tarefa Atualizada';
  const updatedTaskDescription = 'Descrição da tarefa atualizada';

  it('Deve realizar login, criar, alterar e excluir uma tarefa', () => {
    cy.visit('http://localhost:3001/login');
    cy.get('input#email').type(userEmail);
    cy.get('input#password').type(userPassword);
    cy.contains('button', 'Entrar').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Usuário autenticado com sucesso').should('be.visible');

    cy.contains('button', 'Criar Tarefa')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.get('input[placeholder="Título da tarefa"]').type(taskTitle);
    cy.get('textarea[placeholder="Descrição da tarefa"]').type(taskDescription);
    cy.get('#criar-tarefa-btn').contains('Criar Tarefa').click();

    cy.contains('Tarefa criada com sucesso!').should('be.visible');
    cy.url().should('include', '/dashboard');

    //Editar
    cy.contains('span', 'Alterar tarefa').parent().find('button').click();
    cy.get('input[placeholder="Título da tarefa"]')
      .clear()
      .type(updatedTaskTitle);
    cy.get('textarea[placeholder="Descrição da tarefa"]')
      .clear()
      .type(updatedTaskDescription);
    cy.contains('button', 'Salvar Alterações').click();
    cy.contains('Tarefa atualizada com sucesso').should('be.visible');
    cy.contains(updatedTaskTitle).should('be.visible');

    //excluir
    cy.contains('span', 'Excluir tarefa').parent().find('button').click();
    cy.contains(
      'Essa ação não pode ser desfeita. Tem certeza de que deseja excluir esta tarefa?',
    ).should('be.visible');
    cy.contains('Confirmar').click().should('be.visible');
    cy.contains('Tarefa excluída com sucesso').should('not.exist');

    cy.url().should('include', '/dashboard');
  });
});
