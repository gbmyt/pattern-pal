// =============================================
//           			Home Page
// =============================================
describe("Header", () => {
    beforeEach(() => {
        cy.session("signed-in", () => {
            cy.signIn()
        })
    })

    it("Renders the UserButton when user is signed in", () => {
        // assert buttons render as expected
        cy.get("button:contains('Sign Up')").should("not.exist")

        cy.get("button:contains('Sign In')", { timeout: 2000 }).should(
            "not.exist"
        )

        // assert userbutton exists in place of the missing Sign-In/Up CTAs
        cy.get("#user-button").should("be.visible")
    })
})

// describe("Landing Page", () => {
//     it("visits the home page", () => {
//         cy.get("#editor-cta").should("contain", "Get Started")
//         cy.get("button:contains('Sign Out'")
//             .should("exist")
//             .and("should:be.visible")
//     })

//     it("navigates to the Chart Editor", () => {
//         cy.get("#editor-cta").should("contain", "Get Started").click()

//         cy.url().should("include", "/editor")

//         // assert user button and recent carousel renders
//     })
// })

// // =============================================
// //              Chart Editor
// // =============================================
// describe("Chart Editor", () => {
//     describe("Layout renders", () => {
//         it("displays the editor menu bar", function () {
//             cy.visit("/editor", { failOnStatusCode: false })

//             // the editor should render a controls menu
//             cy.get("button:contains('Edit ✎')")
//                 .click()
//                 .get("button:contains('Reset Color')")

//             // Clicking 'X' collapses the menu bar
//             cy.get("button:contains('X')").click()
//             cy.get("button:contains('Reset Color')").should("not.exist")
//         })
//     })
// })

// // =============================================
// // Prisma + UI Updates Correctly
// // =============================================
// describe("Integration Tests", () => {
//     describe("Prisma", function () {
//         it("Delete user from the Clerk UserButton also deletes PPal user and their charts", function () {})
//     })

//     describe("Chart Editor", () => {
//         it("Save new chart updates the recent charts carousel", () => {})
//         it("Updating chart updates correct card/chart/db record", () => {})
//         it("Delete chart removes the correct card from recents carousel", () => {})
//     })

//     // =============================================
//     // NextJS
//     // =============================================
//     describe("Server Actions", () => {})
//     describe("Data fetching returns expected data for a given user", () => {
//         // (returns correct record count, correct records for logged in user)
//     })
// })

// // =============================================
// // Error Handling
// // =============================================
// describe("Error handling", () => {
//     it("Error message shows when missing title from editor form", () => {
//         // move this to the Chart Editor test group? or keep separate
//     })
// })
