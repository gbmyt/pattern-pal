/// <reference types="cypress" />

import { useSignIn, useSignUp } from "@clerk/nextjs"

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add(`signUp`, () => {
    cy.log(`Registering.`)
    cy.visit("/", { failOnStatusCode: false })

    cy.window()
        .should((window) => {
            expect(window).to.not.have.property(`Clerk`, undefined)
            expect(window.Clerk.isReady()).to.eq(true)
        })
        .then(async (window) => {
            // sign out
            await cy.clearCookies({ domain: window.location.domain })

            await window.Clerk.client.signUp.create({
                emailAddress: Cypress.env("test_register_email"),
                password: Cypress.env("test_register_password"),
            })

            await window.Clerk.signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            })

            const completeSignUp =
                await window.Clerk.signUp.attemptEmailAddressVerification({
                    code: Cypress.env("verification_code"),
                })

            if (
                completeSignUp.verifications.emailAddress.status !== "complete"
            ) {
                /*  investigate the response, to see if there was an error
                   or if the user needs to complete more steps.*/
                console.log(JSON.stringify(completeSignUp, null, 2))
            }

            if (
                completeSignUp.verifications.emailAddress.status === "complete"
            ) {
                await window.Clerk.setActive({
                    session: completeSignUp.createdSessionId,
                })
                cy.visit("/new-user")
            }
        })
})

Cypress.Commands.add(`signIn`, () => {
    cy.log(`Signing in.`)
    cy.visit(`/`, { failOnStatusCode: false })

    cy.window()
        .should((window) => {
            expect(window).to.not.have.property(`Clerk`, undefined)
            expect(window.Clerk.isReady()).to.eq(true)
        })
        .then(async (window) => {
            // sign out
            // await cy.clearCookies({ domain: window.location.domain })
            cy.signOut()
            const res = await window.Clerk.client.signIn.create({
                identifier: Cypress.env(`test_login_email`),
                password: Cypress.env(`test_login_password`),
            })

            await window.Clerk.setActive({
                session: res.createdSessionId,
            })

            cy.log(`Finished Signing in.`)
        })
})

Cypress.Commands.add(`signOut`, () => {
    cy.log(`sign out by clearing all cookies.`)
    cy.clearCookies({ domain: window.location.domain })
})
