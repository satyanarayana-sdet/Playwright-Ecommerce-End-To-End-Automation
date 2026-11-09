Feature: Login

  Scenario Outline: Reject login with an unregistered email
    Given I am on the login page
    When I submit the "<description>" login data
    Then I should see the invalid login message

    Examples:
      | description               |
      | unregistered email        |
      | another unregistered email |
