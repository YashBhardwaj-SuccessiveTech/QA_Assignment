@ui @regression
Feature: Verify home page elements and responsive layout sections

  Background:
    Given User is on the Home Page

  Scenario: Verify home page sections are displayed
    Then Header navigation menu should be visible
    And Home page slider should be visible
    And Category section should be visible on left sidebar
    And Brands section should be visible on left sidebar
    And Features Items section should be visible
    And Recommended Items section should be visible
    And Subscription section should be visible in footer

  Scenario: Verify navigation menu items
    Then "Home" menu should be visible
    And "Products" menu should be visible
    And "Cart" menu should be visible
    And "Signup / Login" menu should be visible
    And "Test Cases" menu should be visible
    And "API Testing" menu should be visible
    And "Video Tutorials" menu should be visible
    And "Contact us" menu should be visible

  Scenario: Verify home page responsiveness on tablet view
    Given User sets screen resolution to tablet size
    When User refreshes the page
    Then Category and product sections should align properly
    And Product cards should display properly
    And No UI element should overlap

  # Scenario: Verify scroll up functionality from footer
  #   When User scrolls to bottom of page
  #   Then Subscription section should be visible
  #   When User clicks on scroll up arrow
  #   Then User should be navigated to top of page
  #   And Slider text should be visible

    