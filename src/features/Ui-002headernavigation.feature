@ui @regression @second
Feature: Validate main global header navigation accessibility

  Background:
    Given User is on the Home Page

    Scenario: Verify global header navigation redirects correctly
    When User clicks on "<Menu>" navigation link
    Then User should navigate to "<URL>" page

    Examples:
      | Menu            | URL          |
      | Home             | /            |
      | Products         | /products    |
      | Cart             | /view_cart   |
      | Signup / Login   | /login       |
      | Test Cases       | /test_cases  |
      | API Testing      | /api_list    |
      | Contact us       | /contact_us  |

  Scenario: Verify header navigation links are accessible
    Then "Home" navigation link should be visible
    And "Products" navigation link should be visible
    And "Cart" navigation link should be visible
    And "Signup / Login" navigation link should be visible
    And "Test Cases" navigation link should be visible
    And "API Testing" navigation link should be visible
    And "Video Tutorials" navigation link should be visible
    And "Contact us" navigation link should be visible

  Scenario: Verify header navigation links are keyboard accessible
    When User presses the Tab key
    Then Focus should move to header navigation links

  Scenario: Verify header navigation links are clickable
    When User clicks on "Products" navigation link
    Then User should navigate to Products page