describe("Signed out", () => {
    it("should navigate to the dashboard in a signed out state", () => {
        // open dashboard page
        cy.visit("http://localhost:3000/dashboard", { failOnStatusCode: false })

        // check h1 says signed out
        cy.get("h1").contains("Signed out")
    })
})

describe("Signed in", () => {
    beforeEach(() => {
        cy.session("signed-in", () => {
            cy.signIn()
        })
    })

    it("navigate to the dashboard", () => {
        // open dashboard page
        cy.visit("http://localhost:3000/dashboard", {
            failOnStatusCode: false,
        })

        // check h1 says signed in
        cy.get("h1").contains("Signed in")
    })
})
