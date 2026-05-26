@ui @regression @fourteenthtest
Feature: Shopping Cart Quantity and Calculation Validation
  As a portal visitor
  I want to add the same product multiple times from the grid layout
  So that I can verify the cart quantity increments and updates the calculation metrics

  Background:
    Given User is on the Home Page
    When User clicks on "Products" navigation link
    Then User should navigate to "/products" page

  Scenario: UI-014 - Increment cart element quantity via multi-addition from grid
    When User hovers over the first product card and clicks "Add to cart"
    And User clicks "Continue Shopping" button on the modal pop-up
    And User hovers over the first product card and clicks "Add to cart" again
    And User clicks "Continue Shopping" button on the modal pop-up
    And User clicks on "Cart" navigation link
    Then The cart table row quantity should display "2"
    And The cart table row subtotal calculation should update accurately based on unit price