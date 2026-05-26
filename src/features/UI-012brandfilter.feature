@ui @regression @twelthtest
Feature: Product Catalog Brand Filtering Validation
  As a portal visitor
  I want to filter products by clicking on a specific brand name
  So that I can see an updated catalog containing only items from that brand

  Background:
    Given User is on the Home Page
    When User clicks on "Products" navigation link
    Then User should navigate to "/products" page

  Scenario Outline: UI-012 - Filter products by specific brand and verify item updates
    When User clicks on the brand name "<BrandName>" in the left sidebar
    Then A "BRAND - <BrandName>" header section should be displayed
    And All returned filtered product cards must belong to the brand "<BrandName>"

    Examples:
      | BrandName |
      | Polo      |
      | H&M       |
      | Madame    |