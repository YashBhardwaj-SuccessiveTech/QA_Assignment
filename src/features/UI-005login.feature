@ui @regression @smoke
Feature: Log in with valid credentials and verify user profile banner

  Background:
    Given User is on the Home Page

  Scenario: Verify logged in user banner after successful login

    # Register new user first
    When User clicks on "Signup / Login" navigation link
    Then User should navigate to "/login" page

    When User enters generated signup name and email
    And User clicks on "Signup" button

    Then User should navigate to "/signup" page
    And Account Information section should be visible

    When User fills account details form
    And User clicks on "Create Account" button

    Then Account Created message should be visible
    When User clicks on "Continue" button
    And User clicks on "Logout" navigation link

    Then User should navigate to "/login" page

    # Login with same generated user
    When User enters registered email and password

    Then Logged in username banner should be visible
    And Logout button should be visible