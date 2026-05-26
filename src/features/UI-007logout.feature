@ui @regression @smoke
Feature: Execute secure session logout and check state redirection

  Scenario: UI-007 - Verify successful session logout and redirection after account creation
    Given User is on the Home Page
    When User clicks on "Signup / Login" navigation link
    Then User should navigate to "/login" page

    # Registration sequence using your existing step code
    When User enters generated signup name and email
    And User clicks on "Signup" button
    Then User should navigate to "/signup" page
    And Account Information section should be visible
    When User fills account details form
    And User clicks on "Create Account" button
    Then Account Created message should be visible
    When User clicks on "Continue" button

    # Clean UI-focused Logout Validation
    When User clicks on "Logout" navigation link
    Then User should navigate to "/login" page
    And Logged in username banner should not be visible
    And "Signup / Login" navigation link should be visible again

    