Feature: Submit Dare TAT form
    Scenario: Turn around time is displayed when we click on submit
        Given application url
        Then home page of the application should be launched
        When Guidance type is clicked
        When select Request Date Time
        When checkbox for same reciept Date is clicked
        When the State of Residence "Alabama"
        When the State of Issue "Alaska"
        When the State of Service "Arkansas"
        When enter the member age
        When the Product type "Medicaid"
        When the benefit type is "SUD"
        When the is Attending Provider physician is "No"
        When the review is "2nd Appeal discharged"
        When the authorization type is "Urgent / Expedited Pre-Service"
        When level of care is "Inpatient"
        When User clicks on submit button
        Then user should see licensure guidance section

     