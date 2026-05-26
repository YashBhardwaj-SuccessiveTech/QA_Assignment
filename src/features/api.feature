@api @regression
Feature: Automation Exercise Complete API Master Suite

  @api001 @smoke
  Scenario: API-001 - Execute GET /productsList and validate structural array types
    When User executes a "GET" request to "productsList"
    Then The response status code should be 200
    And The response body should contain a valid array of products with type structures

  @api002
  Scenario: API-002 - Execute an invalid POST /productsList request and assert method rejection
    When User executes an unsupported "POST" request to "productsList"
    Then The response status code should be 200
    And The response json property "message" should match "This request method is not supported."

  @api003
  Scenario: API-003 - Execute GET /brandsList and assert baseline brand items populate the body
    When User executes a "GET" request to "brandsList"
    Then The response status code should be 200
    And The response body should populate a valid list of brand tracking elements

  @api004
  Scenario: API-004 - Execute an invalid PUT /brandsList request and validate appropriate error formatting
    When User executes an unsupported "PUT" request to "brandsList"
    Then The response status code should be 200
    And The response json property "message" should match "This request method is not supported."

  @api005
  Scenario: API-005 - Execute POST /searchProduct passing valid body parameters
    When User searches for a product using keyword "jean"
    Then The response status code should be 200
    And The matching array results should all contain the item keyword "jean"

  @api006
  Scenario: API-006 - Execute POST /searchProduct missing the required body parameter
    When User dispatches a search request missing the product query parameter
    Then The response status code should be 200
    And The response json property "responseCode" should be 400
    And The response json property "message" should match "Bad request, search_product parameter is missing in POST request."

  @api007 @smoke
  Scenario: API-007 - Execute a complete User Lifecycle sequence sequentially
    When User submits a create account request for "API Test User" with email "api_test_master_2026@test.com"
    Then The response json property "responseCode" should be 201
    And The response json property "message" should match "User created!"
    
    When User updates the account name to "API Updated User" for email "api_test_master_2026@test.com"
    Then The response json property "responseCode" should be 200
    And The response json property "message" should match "User updated!"
    
    When User fetches details for user account email "api_test_master_2026@test.com"
    Then The response status code should be 200
    And The backend data object user name attribute should match "API Updated User"
    
    When User requests destruction of the account with email "api_test_master_2026@test.com"
    Then The response json property "responseCode" should be 200
    And The response json property "message" should match "Account deleted!"

  @api008
  Scenario: API-008 - Execute POST /verifyLogin with invalid credentials
    When User logs in via API using email "fake_user_2026@invalid.com" and password "wrongpass123"
    Then The response json property "responseCode" should be 404
    And The response json property "message" should match "User not found!"