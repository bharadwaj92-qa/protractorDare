Feature: Admin Button & Login UI
    Scenario: Verifying Admin button is displayed on DARE application main page
        Given application url
        Then home page of the application should be launched
        When user click on Admin button
        Then user should see Admin login popup

    Scenario: Verifying Admin popup appears login popup with all required fields
        Given application url
        When user click on Admin button
        Then user should see followinng fields
            | IdentificationType | Value           |
            | TEXT               | DARE: Decision Automation Rules Engine           |
            | TEXT               | Admin Login     |
            | TEXT               | UserName:       |
            | TEXT               | Password:       |
            | TEXT               | Cancel          |
            | TEXT               | Login           |
            | TEXT               | reset password? |
            | ID                 | UserNameTxt     |
            | ID                 | PwdTxt          |

    Scenario: Verify user is displayed with DARE home page when Cancel button clicked in Admin login popup
        Given application url
        When user click on Admin button
        When user click on the Cancel button
        Then user should see Admin button