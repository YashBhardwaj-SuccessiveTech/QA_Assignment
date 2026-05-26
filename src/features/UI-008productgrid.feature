@ui @regression
Feature: Products Grid View Validation
  As a portal visitor
  I want to navigate to the products page
  So that I can verify the visibility of the product grid catalog layout

  Background:
    Given User is on the Home Page

  Scenario: UI-008 - Verify products grid view and confirm data item visibility
    When User clicks on "Products" navigation link
    Then User should navigate to "/products" page
    And All products section header should be visible
    And The left sidebar displaying Category and Brands should be visible
    And The product catalog cards grid should display valid interactive items
    And Subscription section should be visible in the layout footer