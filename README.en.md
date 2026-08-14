# Cypress QA Automation

🌐 [Ler em português](./README.md)

This is a personal study project where I'm practicing test automation with
**Cypress**. In my day-to-day QA work I already use automation regularly, and
I created this repository to train and show, in a simple way, how I write
automated end-to-end tests.

The tests run against [SauceDemo](https://www.saucedemo.com/), a fake
e-commerce site publicly maintained by Sauce Labs specifically for people
learning (or practicing) test automation. It is not an application belonging
to any real company.

## Technologies used

- [Cypress](https://www.cypress.io/) — end-to-end test automation framework
- Plain JavaScript (no TypeScript, no BDD framework)
- [GitHub Actions](https://github.com/features/actions) — to run the tests automatically on every push

## Project structure

```
cypress-qa-automation/
├── .github/
│   └── workflows/
│       └── cypress.yml       # runs the tests on every push to main
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js       # login screen tests
│   │   └── carrinho.cy.js    # cart and checkout tests
│   └── support/
│       └── e2e.js            # Cypress default support file
├── cypress.config.js
└── package.json
```

## How to install and run

Prerequisite: [Node.js](https://nodejs.org/) installed.

```bash
# 1. Install dependencies
npm install

# 2. Open Cypress in interactive mode (watch the browser)
npx cypress open

# 3. Or run all tests directly from the terminal
npx cypress run
```

Since `baseUrl` is already configured in `cypress.config.js` to point to
`https://www.saucedemo.com`, there's nothing to run locally — you just need
an internet connection.

## Accounts used in the tests

SauceDemo itself provides test users, with the standard password
`secret_sauce`:

| User                | What happens                              |
| ------------------- | ----------------------------------------- |
| `standard_user`   | normal login, no issues                   |
| `locked_out_user` | login blocked (used in the negative test) |

## What each test file covers

### `login.cy.js`

- Successful login with valid username and password
- Login with incorrect password (expecting an error message)
- Login with a locked-out user (`locked_out_user`)
- Login without filling in the username field
- Login without filling in the password field

### `carrinho.cy.js`

- Adding a product to the cart
- Removing a product from the cart
- Adding multiple products and checking the cart counter
- Going to the cart page and seeing the added product
- Completing the full checkout flow, from the cart to the order
  confirmation screen

The tests are pretty straightforward: each `it(...)` visits the page,
interacts with elements using `cy.get()` (via the `data-test` attributes
SauceDemo already provides for this) and checks the expected result with
`cy.should(...)`. I didn't use any design pattern or abstraction — the code
is repetitive in some places on purpose, because the goal here was to
practice Cypress fundamentals.

## Next learning steps

This project is intentionally kept simple. As a future evolution, I plan to
study and apply:

- **Page Object Model**, to better organize each screen's selectors
- **BDD testing** (Cucumber/Gherkin), to write scenarios in language closer
  to the business
- API tests, in addition to UI tests

## FAQ

- **Why did I choose to test this flow?** Login and cart/checkout are the
  most critical flows of an e-commerce site: if a user can't log in or
  can't finish a purchase, the business loses a sale. That's why I covered
  both the happy path and a few error scenarios (wrong password, locked
  user, empty required field).
- **What do the tests verify?** That the screen responds as expected to
  each action: after a valid login, the system takes me to the products
  page; after an invalid login, the correct error message appears; after
  adding a product, the cart counter updates; after completing the
  purchase, the order confirmation message appears.
- **How would I run this day to day?** Locally, with `npx cypress open` to
  watch the test run step by step in the browser while writing or
  debugging, and `npx cypress run` to run everything quickly from the
  terminal. I also set up a GitHub Actions workflow
  (`.github/workflows/cypress.yml`) that runs the tests automatically on
  every push, to simulate what a real CI pipeline would look like.
