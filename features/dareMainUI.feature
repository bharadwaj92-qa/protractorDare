Feature: Dare Tool UI

    Scenario: Verifying licensure tool UI fields
        Given application url
        Then user should see followinng fields
            | IdentificationType | Value                                       |
            | PARTIALTEXT        | Is the plan Fully Insured or Non-ERISA ASO? |
            | PARTIALTEXT        | Is this a Medicare Plan?                    |
            | PARTIALTEXT        | Is this a Medicaid Plan?                    |
            | XPATH              | //*[@for='hmo']                             |
            | PARTIALTEXT        | Is the Attending Provider a Physician?      |
            | ID                 | AllSameChkBx                                |
            | PARTIALTEXT        | Member Age:                                 |
            | PARTIALTEXT        | Submit                                      |
            | PARTIALTEXT        | State of Ohio - Direct Employer Group:      |
            | PARTIALTEXT        | Authorization Review Type:                  |

    Scenario: Verify reset functionality is working as expected
        Given application url
        When user enter and clicks on few fields in UI page
        And clicks on reset button
        Then verify all fields are cleared

    Scenario: Verify values P2P Review, Retrospective, 1st Appeal and 2nd Appeal are populated in Approval dropdown
        Given application url
        Then following values are displayed in Approval dropdown
            | Buttons                      |
            | P2P Review                   |
            | Retrospective                |
            | 1st Appeal pre / intreatment |
            | 1st Appeal discharged        |
            | 2nd Appeal pre / intreatment |
            | 2nd Appeal discharged        |
