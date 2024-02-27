describe("Sanity Checks", () => {
    it("works", () => {
        expect(true).to.equal(true)
    })
})

describe("Home Page", () => {
    beforeEach(() => {
        // reset and seed the database prior to every test
        // cy.exec("npm run db:reset && npm run db:seed")
        cy.visit("/", { failOnStatusCode: false }) // not sure why I get 401 Unauthorized without this flag
    })
    it("visits the home page", () => {
        cy.get("#editor-cta").should("contain", "Get Started")
    })

    it("navigates to the Chart Editor", () => {
        cy.get("#editor-cta").should("contain", "Get Started").click()

        // we should be redirected to /editor
        cy.url().should("include", "/editor")
    })
})

describe("Chart Editor", () => {
    it("displays the editor menu bar", function () {
        cy.visit("/editor", { failOnStatusCode: false })

        // the editor should render a controls menu
        cy.get("button:contains('Edit ✎')")
            .click()
            .get("button:contains('Reset Color')")

        // Clicking 'X' collapses the menu bar
        cy.get("button:contains('X')").click()
        cy.get("button:contains('Reset Color')").should("not.exist")
    })
})
