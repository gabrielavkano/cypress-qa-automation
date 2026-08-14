
# Cypress QA Automation

🌐 [Read this in English](./README.en.md)

Este é um projeto pessoal de estudo, onde estou praticando automação de
testes com **Cypress**. No meu trabalho como QA eu já uso automação no
dia a dia, e criei esse repositório para treinar e mostrar, de forma
simples, como eu escrevo testes automatizados end-to-end.

Os testes rodam contra o [SauceDemo](https://www.saucedemo.com/), um
site de e-commerce falso, mantido publicamente pela Sauce Labs
justamente para quem está aprendendo (ou praticando) automação de
testes. Não é uma aplicação de nenhuma empresa real.

## Tecnologias usadas

- [Cypress](https://www.cypress.io/) — framework de automação de testes end-to-end
- JavaScript puro (sem TypeScript, sem framework de BDD)
- [GitHub Actions](https://github.com/features/actions) — para rodar os testes automaticamente a cada push

## Estrutura do projeto

```
cypress-qa-automation/
├── .github/
│   └── workflows/
│       └── cypress.yml       # roda os testes a cada push na main
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js       # testes da tela de login
│   │   └── carrinho.cy.js    # testes de carrinho e checkout
│   └── support/
│       └── e2e.js            # arquivo de suporte padrão do Cypress
├── cypress.config.js
└── package.json
```

## Como instalar e rodar

Pré-requisitos: [Node.js](https://nodejs.org/) instalado.

```bash
# 1. Instalar as dependências
npm install

# 2. Abrir o Cypress em modo interativo (visualizando o navegador)
npx cypress open

# 3. Ou rodar todos os testes direto pelo terminal
npx cypress run
```

Como o `baseUrl` já está configurado no `cypress.config.js` apontando
para `https://www.saucedemo.com`, não precisa rodar nada localmente —
só precisa de internet.

## Contas usadas nos testes

O próprio SauceDemo disponibiliza usuários de teste, com senha padrão
`secret_sauce`:

| Usuário            | O que acontece                               |
| ------------------- | -------------------------------------------- |
| `standard_user`   | login normal, sem problema nenhum            |
| `locked_out_user` | login bloqueado (uso isso no teste negativo) |

## O que cada arquivo de teste cobre

### `login.cy.js`

- Login com sucesso usando usuário e senha válidos
- Login com senha incorreta (esperando mensagem de erro)
- Login com usuário bloqueado (`locked_out_user`)
- Login sem preencher o campo de usuário
- Login sem preencher o campo de senha

### `carrinho.cy.js`

- Adicionar um produto ao carrinho
- Remover um produto do carrinho
- Adicionar vários produtos e conferir o contador do carrinho
- Ir até a página do carrinho e ver o produto que foi adicionado
- Fazer o fluxo completo de checkout, do carrinho até a tela de
  confirmação do pedido

Os testes são bem diretos: cada `it(...)` visita a página, interage
com os elementos usando `cy.get()` (pelos atributos `data-test`, que o
SauceDemo já disponibiliza para isso) e confere o resultado esperado
com `cy.should(...)`. Não usei nenhum padrão de projeto nem
abstração — é código repetitivo em alguns pontos, de propósito, porque
o objetivo aqui foi treinar o básico do Cypress mesmo.

## Próximos passos de aprendizado

Esse projeto ainda é simples de propósito. Como evolução futura, pretendo
estudar e aplicar:

- **Page Object Model**, para organizar melhor os seletores de cada tela
- **Testes em BDD** (Cucumber/Gherkin), para escrever cenários em
  linguagem mais próxima do negócio
- Testes de API, além dos testes de interface

## FAQ

- **Por que escolhi testar esse fluxo?** Login e carrinho/checkout são
  os fluxos mais críticos de um e-commerce: se o usuário não conseguir
  entrar na conta ou finalizar uma compra, a empresa perde venda. Por
  isso escolhi cobrir tanto o caminho de sucesso quanto alguns cenários
  de erro (senha errada, usuário bloqueado, campo obrigatório vazio).
- **O que os testes verificam?** Que a tela responde do jeito esperado
  para cada ação: depois de um login válido, o sistema me leva para a
  página de produtos; depois de um login inválido, aparece a mensagem
  de erro certa; depois de adicionar um produto, o contador do carrinho
  atualiza; depois de finalizar a compra, aparece a mensagem de
  confirmação do pedido.
- **Como eu rodaria isso no dia a dia?** Localmente, com
  `npx cypress open` para ver o teste rodando passo a passo no
  navegador enquanto escrevo ou debugo, e `npx cypress run` para rodar
  tudo rápido pelo terminal. Também deixei configurado um workflow no
  GitHub Actions (`.github/workflows/cypress.yml`) que roda os testes
  automaticamente a cada push, para simular como seria numa esteira de
  CI de verdade.
