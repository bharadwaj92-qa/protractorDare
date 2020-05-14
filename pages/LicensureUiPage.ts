import { $, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
/*
Page Objects help in better re-usablitity and maintenance of element locators
This file exports CalculatorPageObject class
**/
export class LicensureUiPage {
  public isPlanFullyInsured_Medicaid_Non_ERISAASO:ElementFinder;
  public is_this_Medicare_Plan:ElementFinder;
  public is_this_Medicaid_Plan: ElementFinder;
  public is_this_HMO_Plan: ElementFinder;
  public is_AttendingProvider_Physician: ElementFinder;

  chkAllTheSame = $("#AllSameChkBx");
  btnReset = $("#ResetBtn");
  btnAdmin = $("#AdminBtn"); //Added by amit
  btnCancel = $("#CancelBtn"); //Added by amit
  Cancelbtn = element(by.xpath("//*[@id='CancelBtn']"));

  drpDwnStatesOfResidence = $("#stateOfResidence");
  drpDwnStatesOfIssue = $("#stateOfIssue");
  drpDwnStatesOfService = $("#stateOfService");
  btnSubmit =$("#SubmitBtn");
  txtAge = $("#AgeTxtBx");
  drpDwnStateOfApproval = $("#resultTypeDrpDwn");
  drpDwnAuthReview = $("#authTypeDrpDwn");
  rdoBtnFullyInsuredYes = element(by.xpath("//input[@name='isFullyInsured' and @value='Y']"));
  rdoBtnFullyInsuredNo = element(by.xpath("//input[@name='isFullyInsured' and @value='N']"));
  rdoBtnMedicarePlanYes = element(by.xpath("//input[@name='isMedicare' and @value='Y']"));
  rdoBtnMedicarePlanNo = element(by.xpath("//input[@name='isMedicare' and @value='N']"));
  rdoBtnMedicaidYes = element(by.xpath("//input[@name='isMedicaid' and @value='Y']"));
  rdoBtnMedicaidNo = element(by.xpath("//input[@name='isMedicaid' and @value='N']"));
  rdoBtnHMOPlanYes = element(by.xpath("//input[@name='isHMO' and @value='Y']"));
  rdoBtnHMOPlanNo = element(by.xpath("//input[@name='isHMO' and @value='N']"));
  textoutput = element(by.xpath("//div[@class='col-md-6 col-sm-6 col-xs-6']//following::div[@class='card']']"));
  rdoBtnProviderPhysicianYes = element(by.xpath("//input[@name='isAttendingProvider' and @value='Y']"));
  rdoBtnProviderPhysicianNo = element(by.xpath("//input[@name='isAttendingProvider' and @value='N']"));
  txtUserName = $("#UserNameTxt");
  txtPwd = $("#PwdTxt");
  btnLogin = $("#LoginBtn");
  lblInvalidLoginError = element(by.xpath("//h6[text()='User name or password are incorrect, please try again']"));
  btnLogOut = element(by.xpath("//*[text()='Logout']"));
  txtOutputMsg:ElementArrayFinder = element.all(by.xpath("//li[@id='outputMessage']"));
  txtSMMsg:ElementArrayFinder = element.all(by.xpath("//li[@id='specialNotes']"));
  txtSOG:ElementFinder = element(by.xpath("//*[@id='stateOfGov']"));
  labelLicensureGuidance: ElementFinder = element(by.xpath("//*[contains(text(),'Licensure Guidance')]"));
  labelTATGuidance : ElementFinder = element(by.xpath("//*[contains(text(),'Turn Around Time Guidance')]"));
  labelOptumInternal: ElementFinder = element(by.xpath("//*[contains(text(),'Optum Internal Determination and Verbal Notification Goal:')]"));
  labelDetermination: ElementFinder = element(by.xpath("//*[contains(text(),'Determination:')]"));
  labelVerbalNotification: ElementFinder = element(by.xpath("//*[contains(text(),'Verbal Notification:')]"));
  labelWrittenNotification: ElementFinder = element(by.xpath("//*[contains(text(),'Written Notification:')]"));

  


}