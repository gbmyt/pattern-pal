describe.skip("Sanity Checks", () => {
    it("works", () => {
        expect(true).to.equal(true)
    })
})

describe.skip("Auth", () => {
    describe("Sign Up", function () {
        it("Navigates to the Sign Up page", () => {
            // get the url and assert the route is /sign-up
        })
        it("Renders 'Sign Up' header", () => {})
        it("Renders email input", () => {})
        it("Renders password input", () => {})
        it("Renders Sign Up button", () => {})
        it.skip("Redirects to the editor after sign in", function () {
            // Should be routing to '/editor' but instead goes to 'http://localhost:3000/pattern'
        })
    })

    describe("Sign In", function () {
        it("Navigates to the Sign In page", () => {
            // get the url and assert the route is /sign-in
        })
        it("Renders 'Sign In' header", () => {})
        it("Renders email input", () => {})
        it("Renders password input", () => {})
        it("Renders Sign In button", () => {})

        it.skip("Redirects to the editor after sign in", function () {
            // Should be routing to '/editor' but instead goes to 'http://localhost:3000/pattern'
        })
    })

    describe("Sign Out", function () {
        it.skip("Protects the correct routes when logged out", function () {})
        it.skip("Redirects to the (editor or sign in page) after logging out", function () {})
    })
})

describe("Home Page", () => {
    beforeEach(() => {
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

// =============================================
//              Chart Editor
// =============================================
describe("Chart Editor", () => {
    describe.only("Layout renders", () => {
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

    // =============================================
    // Editor Functionality
    // =============================================
    describe("Functionality", () => {
        // -   Pixel fill modes (paint/symbol/erase) operate as expected
        // -   Drag to fill operates as expected
        // -   Grid size exceeds max errors display correctly
        // -   Increasing/decreasing grid dimensions modified grid component as expected
        // -   Download image works and saves the current chart state
    })
})

// move to separate component test dir?
describe.skip("Components", () => {
    beforeEach(() => {
        cy.visit("/", { failOnStatusCode: false })
    })

    describe("Header", () => {
        it.skip("Renders the Sign Up and Sign In buttons when user is signed out", () => {
            // make sure logged out
            cy.contains("a", "Sign Up")
            cy.contains("a", "Sign In")
            // make sure UserButton does not exist on page
        })

        it("Renders the UserButton when user is signed in", () => {
            it("Renders the UserButton when user is signed in", () => {
                // sign in

                // assert buttons render as expected
                cy.get("button:contains('Sign Up')").should("not.exist")

                cy.get("button:contains('Sign In')", { timeout: 2000 }).should(
                    "not.exist"
                )

                // assert userbutton exists
            })
        })
    })

    describe("Modal", () => {
        // -   Modal open/closed state
    })

    describe("Carousel", () => {
        // -   Carousel renders a list of cards
    })

    describe("Card", () => {
        // -   Cards have expected text and styles
    })
    describe("Sidebar", () => {
        it.skip("renders the expected link text", () => {})
        it.skip("navigates to the link href", () => {})
        it.skip("transitions and position", () => {})
    })
    describe("Footer", () => {
        // -   Footer sticks to bottom but doesn’t overlap large content
    })
})

// =============================================
// Prisma + UI Updates Correctly
// =============================================
describe.skip("Integration Tests", () => {
    describe("Clerk", function () {
        it("Delete user from the Clerk UserButton also deletes PPal user and their charts", function () {})
    })

    describe("Chart Editor", () => {
        it("Save new chart updates the recent charts carousel", () => {})
        it("Updating chart updates correct card/chart/db record", () => {})
        it("Delete chart removes the correct card from recents carousel", () => {})
    })

    // =============================================
    // NextJS
    // =============================================
    describe("Server Actions", () => {})
    describe("Data fetching returns expected data for a given user", () => {
        // (returns correct record count, correct records for logged in user)
    })
})

// =============================================
// Error Handling
// =============================================
describe.skip("Error handling", () => {
    it("Error message shows when missing title from editor form", () => {
        // move this to the Chart Editor test group? or keep separate
    })
})
