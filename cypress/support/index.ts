// cypress/support/index.ts
export {}
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to authenticate a user with Clerk auth.
             * @example cy.signIn()
             */
            signUp(): Chainable<JQuery<HTMLElement>>
            signIn(): Chainable<JQuery<HTMLElement>>
            signOut(): Chainable<JQuery<HTMLElement>>
        }
    }
}
