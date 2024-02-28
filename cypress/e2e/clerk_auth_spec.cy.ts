// Test the Sign up/in pages function and render correctly
// Test the redirect path is correct after sign-up, sign-in, sign-out actions
describe("Auth", () => {
    describe("Sign Up", function () {
        // Before each test click Sign up button so that we get the Clerk generated url string with the correct redirect path
        beforeEach(() => {
            cy.visit("/", { failOnStatusCode: false })
            cy.get("button").contains("Sign up").should("be.visible").click()
        })

        it("Navigates to the Sign Up page", () => {
            cy.url().should("include", "/sign-up")
        })

        it("Renders Sign Up page header", () => {
            cy.get("h1")
                .invoke("text")
                .should("match", /Create your account/i)
        })

        it("Renders email input", () => {
            cy.get("label")
                .invoke("text")
                .should("match", /Email Address/i)
        })

        it("Renders password input", () => {
            cy.get("label")
                .invoke("text")
                .should("match", /Password/i)
        })

        it("Prompts the user to Sign In if they already have an account", () => {
            cy.get("a")
                .invoke("text")
                .should("match", /Sign In/i)
        })

        // This fails because Clerk detects 'bot traffic'. Need to do this programmatically
        it.skip("Allows the user to create an account", () => {
            // Create your account
            cy.get("input#emailAddress-field")
                .click()
                .type(Cypress.env(`test_email`))
            cy.get("input#password-field")
                .click()
                .type(Cypress.env(`test_password`))
            // Press the button to create an account
            cy.get("button:contains('Continue')").click()
        })

        it.skip("Redirects to the ChartEditor after sign up", function () {
            // Assert we were redirected to the chart editor (or dashboard? TBD)
            cy.url().should("include", "/editor")
            cy.get("user-button").should("exist").and("should:be.visible")
        })

        // it("allows third-party sign-up via Gmail/Facebook/Apple", () => {})
    })

    // describe.skip("Sign In", () => {
    //     before(() => {
    //         // sign in
    //         // cy.signIn()
    //     })

    //     it("Navigates to the Sign In page", () => {
    //         cy.url().should("include", "/sign-in")
    //     })

    //     it("Renders Sign In page header", () => {
    //         cy.get("h1")
    //             .invoke("text")
    //             .should("match", /Sign in/i)
    //     })

    //     it("Renders email input", () => {
    //         cy.get("label")
    //             .invoke("text")
    //             .should("match", /Email Address/i)
    //     })

    //     it("Renders password input", () => {
    //         cy.get("label")
    //             .invoke("text")
    //             .should("match", /Password/i)
    //     })

    //     it("Prompts the user to Sign up if they don't have an account", () => {
    //         cy.get("a")
    //             .invoke("text")
    //             .should("match", /Sign up/i)
    //     })

    // })

    // describe.skip("Sign Out", function () {
    //     it.skip("Protects the correct routes when logged out", function () {})
    //     it.skip("Redirects to the (editor or sign in page) after logging out", function () {
    //         cy.url().should("include", "/editor")
    //     })
    // })
})
