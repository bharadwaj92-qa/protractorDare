Feature: Dare Smoke Validations

       Scenario: Verifying Admin button is displayed on DARE application main page
              Given application url
              Then home page of the application should be launched
              When user click on Admin button
              Then user should see Admin login popup

       Scenario: Verifying Admin popup appears login popup with all required fields
              Given application url
              When user click on Admin button
              Then user should see followinng fields
                     | IdentificationType | Value                                  |
                     | TEXT               | DARE: Decision Automation Rules Engine |
                     | TEXT               | Admin Login                            |
                     | TEXT               | UserName:                              |
                     | TEXT               | Password:                              |
                     | TEXT               | Cancel                                 |
                     | TEXT               | Login                                  |
                     | TEXT               | reset password?                        |
                     | ID                 | UserNameTxt                            |
                     | ID                 | PwdTxt                                 |

       Scenario: Verify user is displayed with DARE home page when Cancel button clicked in Admin login popup
              Given application url
              When user click on Admin button
              When user click on the Cancel button
              Then user should see Admin button

       Scenario: Verify all the same checkbox is  enabled according to user entry
              Given application url
              When user selects value from single dropdown
              Then all the same checkbox should be "enabled"
              And user clicks on All the Same checkbox
              Then all state dropdowns should be populated with same value

       Scenario: Verify DARE app output with Two Different State combinations of input
              Given application url
              Then home page of the application should be launched
              Then Execute the combinations present in "./TestData/testdata.xlsx" file and "Combinations" sheet

       Scenario Outline: Verify the login functionality with valid username and password
              Given application url
              When user click on Admin button
              Then user enter valid "<UserName>" and "<Password>" in username and password fields
              When user clicks on Login button
              Then user should see Admin UI page
              Examples:
                     | UserName   | Password   |
                     | Dareadmin1 | Admin@2019 |
                     | Dareadmin2 | Admin@2019 |
                     | Dareadmin3 | Admin@2019 |

       Scenario Outline: Verify the login functionality with invalid username and password
              Given application url
              When user click on Admin button
              Then user enter valid "<UserName>" and "<Password>" in username and password fields
              When user clicks on Login button
              Then user should see error message
              Examples:
                     | UserName   | Password |
                     | DAREuser11 | United1  |
                     | DAREuser2  | United9  |
                     | DAREuser   | United19 |


