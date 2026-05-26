@ui @regression

Feature: Register an entirely new user leveraging dynamic data generation

  Background:
    Given User is on the Home Page

  Scenario: Verify user can register with dynamically generated data
    When User clicks on "Signup / Login" navigation link
    Then User should navigate to "/login" page

    When User enters generated signup name and email
    And User clicks on "Signup" button

    Then User should navigate to "/signup" page
    And Account Information section should be visible

    When User fills account details form
    And User clicks on "Create Account" button

    Then Account Created message should be visible