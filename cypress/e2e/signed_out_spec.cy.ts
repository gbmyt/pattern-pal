describe("Header", () => {
    beforeEach(() => {
        cy.visit("/", { failOnStatusCode: false })
    })

    it("displays the 'Sign Up' & 'Sign In' buttons when user is signed out", () => {
        cy.get("button")
            .invoke("text")
            .should("match", /Sign Up/i)

        cy.get("button")
            .invoke("text")
            .should("match", /Sign In/i)

        // assert absence of UserButton
    })
})

describe("Landing Page", () => {
    beforeEach(() => {
        cy.visit("/", { failOnStatusCode: false })
    })

    it("renders", () => {
        cy.get("#editor-cta").should("contain", /Get Started/i)
    })

    it("navigates to the Chart Editor", () => {
        cy.get("#editor-cta")
            .contains(/Get Started/i)
            .click()

        // we should be redirected to /editor
        cy.url().should("include", "/editor")
    })
})

// =============================================
//              Chart Editor
// =============================================
describe("Chart Editor", () => {
    beforeEach(() => {
        cy.visit("/editor", { failOnStatusCode: false })
    })

    describe("layout", () => {
        it("displays the editor menu bar", function () {
            // the editor should render a controls menu
            cy.get("button:contains('Color')").click()
            // cy.get("button:contains('Reset Color')").should("be.visible")
        })

        // it("displays the default grid", () => {})
        // it("displays the download button", () => {})
        // it("does not display Recent Charts carousel", () => {})
    })

    describe("Chart Details", () => {
        it("does not render a chart from the database", () => {
            cy.get("button:contains('Save')").click()
            cy.get("div").contains("Create an Account to Name & Save Your Grid")
        })
    })

    // // =============================================
    // // Editor Functionality
    // // =============================================
    describe("Editor Menu", () => {
        describe("Color Wheel", () => {
            it("user can set custom fill color", function () {
                cy.get("button:contains('Color')").click()
                cy.get("button:contains('Reset Color')").click()

                // Clicking 'X' collapses the menu bar
                // cy.get("button:contains('X')").should("exist").click()
                cy.get("button:contains('Reset Color')").should("not.exist")
            })
        })
        // -   Pixel fill modes (paint/symbol/erase) operate as expected
        // -   Drag to fill operates as expected
        // -   Grid size exceeds max errors display correctly
        // -   Increasing/decreasing grid dimensions modified grid component as expected
        // -   Download image works and saves the current chart state

        describe("CTAs", () => {
            it("New, Save, and Delete buttons should exist", function () {
                cy.get("button:contains('New')").should("be.visible")
                cy.get("button:contains('Delete')").should("be.visible")
                cy.get("button:contains('Save')").should("be.visible")
            })
        })
    })
})

// move to separate component test dir?
// describe("Components", () => {
//     describe("Modal", () => {
//         // -   Modal open/closed state
//     })

//     describe("Carousel", () => {
//         // -   Carousel renders a list of cards
//     })

//     describe("Card", () => {
//         // -   Cards have expected text and styles
//     })

//     describe("Sidebar", () => {
//         it("renders the expected link text", () => {})
//         it("navigates to the link href", () => {})
//         it("transitions and position", () => {})
//     })

//     describe("Footer", () => {
//         // -   Footer sticks to bottom but doesn’t overlap large content
//     })
// })
