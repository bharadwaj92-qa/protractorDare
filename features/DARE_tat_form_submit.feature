Feature: Submit Dare TAT form
    Scenario: Turn around time is displayed when we click on submit
        Given application url
        Then home page of the application should be launched
        When Guidance type is clicked
        When select Request Date Time
        When checkbox for same reciept Date is clicked
        When the State of Residence "Texas"
        When the State of Issue "Texas"
        When the State of Service "Arizona"
        When enter the member age
        When the Product type "Commercial Fully Insured/Shared Risk"
        When Hmo Plan is "No"
        When the benefit type is "MH"
        When the is Attending Provider physician is "No"
        When the review is "P2P Review"
        When the authorization type is "Non-Urgent Pre-Service"
        When level of care is "Inpatient"
        When User clicks on submit button
        Then user should see licensure guidance and Turn around time guidance section

     