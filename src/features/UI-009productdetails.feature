@productsdetails @ui @regression
Feature: Product Detail Attributes Validation
  As a portal visitor
  I want to inspect a specific product's details
  So that I can verify its price, name, and stock attributes match the catalog information

  Background:
    Given User is on the Home Page
    When User clicks on "Products" navigation link
    Then User should navigate to "/products" page

  Scenario: UI-009 - Verify first product details page attributes match the grid card
    When User saves the name and price of the first product card
    And User clicks "View Product" on the first product card
    Then User should navigate to the product details page view
    And The product details name and price must match the saved card attributes
    And The product metadata attributes should display valid status conditions