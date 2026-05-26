@ui @regression @fifteenthtest
Feature: Contact Us Form and Attachment Upload Validation
  As a portal visitor
  I want to submit a support message with a file attachment via the Contact Us form
  So that I can verify the system successfully accepts my inquiry layout parameters

  Scenario: UI-015 - Fill Contact Us form, upload attachment, and submit successfully
    Given User is on the Home Page
    When User clicks on "Contact us" navigation link
    Then User should see a contact form header "GET IN TOUCH"
    When User fills the contact form fields with valid information
    And User uploads a sample test file attachment
    And User clicks the contact form submit button
    Then A contact success message "Success! Your details have been submitted successfully." should be displayed