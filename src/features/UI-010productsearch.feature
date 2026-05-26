@ui @regression @tenthtest @ui @regression
Feature: Product Catalog Search Validation
  As a portal visitor
  I want to search for products using specific keywords
  So that I can see a filtered grid displaying only relevant matching items

  Background:
    Given User is on the Home Page
    When User clicks on "Products" navigation link
    Then User should navigate to "/products" page

  Scenario: UI-010 - Execute keyword product search yielding successful results
    When User enters search keyword "Dress" in the product search bar
    And User clicks the search submit button
    Then A "SEARCHED PRODUCTS" header section should be displayed
    And All returned product cards must contain the keyword "Dress" in their title