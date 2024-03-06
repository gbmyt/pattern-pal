// Test the Sign up/in pages function and render correctly
// Test the redirect path is correct after sign-up, sign-in, sign-out actions
describe("Auth", () => {
    describe("Sign Up", function () {
        // Before each test click Sign up button so that we get the Clerk generated url string with the correct redirect path
        beforeEach(() => {
            cy.visit(
                "/sign-up?after_sign_in_url=%2Feditor&after_sign_up_url=%2Fnew-user&redirect_url=%2F",
                { failOnStatusCode: false }
            )
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

        it("errors on a blank email input", function () {
            cy.get("button:contains('Continue')").click()
            cy.url().should("include", "/sign-up")

            // Cannot detect Chrome Tooltip, can't even click on it to inspect in browser
            // cy.contains(/Please fill out this field./i).should("exist")
        })

        it("errors on a blank password input", function () {
            cy.get("input#emailAddress-field")
                .click()
                .type(Cypress.env(`test_register_email`))

            cy.get("button:contains('Continue')").click()
            cy.url().should("include", "/sign-up")
        })

        it("Allows the user to create an account", () => {
            // Create your account
            cy.get("input#emailAddress-field")
                .click()
                .type(Cypress.env(`test_register_email`))
            cy.get("input#password-field")
                .click()
                .type(Cypress.env(`test_register_password`))

            // Press the button to create an account
            cy.get("button:contains('Continue')").click()
            cy.contains(
                "Your password meets all the necessary requirements."
            ).should("be.visible")

            // Assert we were redirected to the chart editor (or dashboard? TBD)
            // This fails because Clerk detects 'bot traffic' when attempting to sign up. Debug TODO
            // cy.url().should("include", "/editor")
            // cy.get("user-button").should("exist").and("should:be.visible")
        })

        // it('email/username has already been taken', function() {});
        // it("allows third-party sign-up via Gmail/Facebook/Apple", () => {})
    })

    describe("Sign In", () => {
        beforeEach(() => {
            cy.visit(
                "/sign-in?after_sign_in_url=%2Feditor&after_sign_up_url=%2Fnew-user&redirect_url=%2F",
                { failOnStatusCode: false }
            )
        })

        it("Navigates to the Sign In page", () => {
            cy.url().should("include", "/sign-in")
        })

        it("Renders Sign In page header", () => {
            cy.get("h1")
                .invoke("text")
                .should("match", /Sign in/i)
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

        it("Prompts the user to Sign up if they don't have an account", () => {
            cy.get("a")
                .invoke("text")
                .should("match", /Sign up/i)
        })

        it("errors on a blank email input", function () {
            cy.get("button:contains('Continue')").click()
            cy.url().should("include", "/sign-in")

            // Cannot detect Chrome Tooltip, can't even click on it to inspect in browser
            // cy.contains(/Please fill out this field./i).should("exist")
        })

        it("errors on a blank password input", function () {
            cy.get("input#identifier-field")
                .click()
                .type(Cypress.env(`test_register_email`))

            cy.get("button:contains('Continue')").click()
            cy.url().should("include", "/sign-in")
        })
    })
})
