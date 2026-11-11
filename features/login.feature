Feature: Login

  Scenario Outline: Reject login with invalid credentials
    Given I am on the login page
    When I submit login with email "<email>" and password "<password>"
    Then I should see the invalid login message

    Examples:
      | email                          | password     |
      | unknown.user.one@example.com   | wrongpassword |
      | unknown.user.two@example.com   | wrongpassword |
