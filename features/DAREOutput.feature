Feature: DARE Output

     Verifying DARE Output with different combinations of input
    # Scenario: Verify DARE app output with Same State combinations of input
    #     Given application url
    #     Then home page of the application should be launched
    #     Then Execute the combinations placed in "./TestData/TestData.xlsx" file and "Combinations" sheet

    Scenario Outline: Verify DARE app Licensure guidance and TAT guidance with combinations of input
        Given application url
        Then home page of the application should be launched
        When select the combinations "<sor>","<soi>","<sos>","<age>","<fullyInsured>","<medicare>","<medicaid>","<dualmmp>","<hmo>","<diremployer>","<pp>","<review>","<authreview>"
        Then Verify the licensure and tat guidance
        Examples:
            | sor     | soi        | sos         | age | fullyInsured | medicare | medicaid | dualmmp | hmo | diremployer | pp | review     | authreview             |
            | Arizona | California | Connecticut | 21  | Y            | N        | Y        | N       | Y   | Y           | Y  | P2P Review | Non-Urgent Pre-Service |