# Unit Test Todos

## A list of tests that still need to be implemented. This is not an exhaustive list

Regression Tests / Bug-Fixes

-   Redirects to the wrong route after sign-in with Clerk, even after dropping cache and re-starting the build. Confirmed all routes have been updated in the code base. Should be routing to '/editor' but instead goes to 'http://localhost:3000/pattern'
-   Delete user from the Clerk manage button should delete user in pattern pal database and all associated db charts.

UI Test todos

-   Carousel renders a list of cards
-   Cards have expected text and styles
-   Clicking save new chart updates the recent carousel (check for text)
-   Updating chart updates correct card/chart/db record
-   Clicking delete removes the correct card from recents carousel

-   Pixel fill modes (paint/symbol/erase) operate as expected
-   Drag to fill operates as expected

-   Error message shows when missing title from editor form

-   Grid size exceeds max errors display correctly
-   Increasing/decreasing grid dimensions modified grid component as expected

-   Modal open/closed state

-   Download image works and saves the current chart state

-   Sidebar links work
-   Sidebar links render correct text
-   Sidebar transitions and position

-   Footer sticks to bottom but doesn’t overlap large content

-   Server actions and db tests
-   Protected and public routes behave as expected
-   Data fetching (returns correct record count, correct records for logged in user)
