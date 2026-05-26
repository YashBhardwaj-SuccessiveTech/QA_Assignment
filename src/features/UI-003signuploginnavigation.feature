@ui @regression @third
Feature: Navigate cleanly to the Sign-up / Login functional layout

  Background:
    Given User is on the Home Page

  Scenario: Verify navigation to Sign-up / Login page
    When User clicks on "Signup / Login" navigation link
    Then User should navigate to "/login" page
    And Login form section should be visible
    And Signup form section should be visible
    And "Login to your account" text should be visible
    And "New User Signup!" text should be visible
    