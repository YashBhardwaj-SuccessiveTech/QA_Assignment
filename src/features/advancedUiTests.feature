@ui @regression
Feature: Advanced UI Native Context and Network Manipulation

  As an automated QA Engineer
  I want to leverage Playwright's native browser network routing pipelines
  In order to validate front-end asset resiliency under blocked asset execution paths

  @ui016 @smoke @advance
  Scenario: UI-016 - Intercept network routing and abort heavy static assets to verify layout resilience
    Given User initializes a network interception route to block all "image" type assets
    When User navigates to the home page
    Then The textual page elements and navigation header should remain fully visible
    And The web layout structure preserves structural stability without breaking