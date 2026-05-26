@ui @regression @thirteenthtest
Feature: Product Catalog Cart Additions Validation
  As a portal visitor
  I want to add an item to my shopping cart directly from the grid layout
  So that I can verify the cart successfully registers and displays my selection

  Background:
    Given User is on the Home Page
    When User clicks on "Products" navigation link
    Then User should navigate to "/products" page

  Scenario: UI-013 - Add product items into the cart from the grid layout
    When User saves the name and price of the first product card
    And User hovers over the first product card and clicks "Add to cart"
    Then A success modal pop-up text "Added!" should be displayed
    When User clicks "Continue Shopping" button on the modal pop-up
    And User clicks on "Cart" navigation link
    Then The cart page table should display the matching saved product attributes