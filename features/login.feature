Feature: Admin Login Functionality

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
            |            |          |