describe('Carrinho e checkout - SauceDemo', () => {
  beforeEach(() => {
    // Faço login antes de cada teste, porque só dá pra mexer no carrinho
    // depois de estar logada.
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });

  it('deve adicionar um produto ao carrinho', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
  });

  it('deve remover um produto do carrinho', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');

    cy.get('[data-test="remove-sauce-labs-backpack"]').click();

    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
  });

  it('deve mostrar o contador do carrinho ao adicionar mais de um produto', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '3');
  });

  it('deve ir para a página do carrinho e ver o produto adicionado', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();

    cy.url().should('include', '/cart.html');
    cy.get('[data-test="inventory-item-name"]').should('contain.text', 'Sauce Labs Backpack');
  });

  it('deve finalizar uma compra do início ao fim', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type('Gabriela');
    cy.get('[data-test="lastName"]').type('Kano');
    cy.get('[data-test="postalCode"]').type('04567-000');
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="finish"]').click();

    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
  });
});
