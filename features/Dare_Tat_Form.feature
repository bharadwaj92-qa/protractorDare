Feature: How Request Recieved Field is Enabled
    Scenario: Verifying How Request Recieved button is displayed on DARE application TAT form
        Given application url
        Then home page of the application should be launched
        When the State of Issue "Delaware"
        When the Product type "Commercial Fully Insured/Shared Risk"
        Then user should see How Request recieved field

      Scenario: Verifying How Request Recieved button is displayed on DARE application TAT form
        Given application url
        Then home page of the application should be launched
        When the State of Issue "West Virginia"
        When the Product type "Commercial Fully Insured/Shared Risk"
        Then user should see How Request recieved field