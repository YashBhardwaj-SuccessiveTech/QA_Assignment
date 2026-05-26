@invalidlogin @ui @regression
Feature: Validate login rejection and error message strings for invalid inputs

  Background:
    Given User is on the Home Page

  Scenario: Verify login is rejected for invalid credentials

    When User clicks on "Signup / Login" navigation link

    Then User should navigate to "/login" page

    When User enters invalid email and password

    And User clicks on "Login" button

    Then Login error message should be visible

    And "Your email or password is incorrect!" text should be visible