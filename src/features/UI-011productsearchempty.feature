@ui @regression @eleventhtest
Feature: Product Catalog Search Empty-State Validation
  As a portal visitor
  I want to search for products using a non-existent keyword
  So that I can verify the application gracefully handles an empty-state results grid

  Background:
    Given User is on the Home Page
    When User clicks on "Products" navigation link
    Then User should navigate to "/products" page

  Scenario: UI-011 - Execute keyword product search yielding explicit empty-state results
    When User enters search keyword "InvalidProductXYZ" in the product search bar
    And User clicks the search submit button
    Then A "SEARCHED PRODUCTS" header section should be displayed
    And The returned product catalog grid should be empty with zero items displayed