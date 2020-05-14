import { browser } from 'protractor';
import { CommonFunctions } from '../commonFunctions/CommonFunctions';
import { LicensureUiPage } from '../pages/LicensureUiPage';
var { Given } = require('cucumber');
var { When } = require('cucumber');
var { Then } = require('cucumber');
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
var Excel = require('exceljs');
var lUIPage: LicensureUiPage = new LicensureUiPage();

import { element, By } from 'protractor';
import Collections = require("typescript-collections");

import { ExcelUtil } from '../commonFunctions/ExcelUtil';
import { Output } from '../pages/Output';
import { waitToBePresent } from '@hetznercloud/protractor-test-helper/dist';
import { Status } from 'cucumber';
var now = new Date();
var { Then } = require('cucumber');


var lUIPage: LicensureUiPage = new LicensureUiPage();


Given('application url', async function () {
   await browser.get(browser.params.url);
   this.attach("application is launched>>>>>>:" +browser.params.url);
   await CommonFunctions.staticWait(10000);
});

Then('home page of the application should be launched', async function () {
  expect(await CommonFunctions.getTitle()).to.equals("DareApp"); //("DARE: Decision Automation Rules Engine");

});

Then('user should see followinng fields', async function (fields) {
  var data = fields.hashes();
  for (var i = 0; i < data.length; i++) {
    var diplyed = await CommonFunctions.isElementDisplayed(await CommonFunctions.identifyElement(data[i].IdentificationType, data[i].Value));
    await this.attach(diplyed ? data[i].Value + " displayed" : data[i].Value + " not displayed");
    expect(await diplyed).to.be.true;
  }
});

Then('Execute the combinations present in {string} file and {string} sheet', async function (filePath, sheetName) {
  var data: Collections.LinkedList<Map<string, string>> = await ExcelUtil.readExcel(filePath, sheetName);
  var dataArray = data.toArray();
  //data.forEach(rowData => {
  for (var i = 0; i < 2; i++) {
    var rowData: Map<string, string> = dataArray[i];
    try {
      await CommonFunctions.selectByVisibleText(lUIPage.drpDwnStatesOfResidence, rowData.get("StateOfResidence"));
      await waitToBePresent(lUIPage.drpDwnStatesOfIssue);
      // await CommonFunctions.staticWait(1000);
      await CommonFunctions.selectByVisibleText(lUIPage.drpDwnStatesOfIssue, rowData.get("StateOfIssue"));
      await waitToBePresent(lUIPage.drpDwnStatesOfService);
      // await CommonFunctions.staticWait(1000);
      await CommonFunctions.selectByVisibleText(lUIPage.drpDwnStatesOfService, rowData.get("StateOfService"));
      await CommonFunctions.type(lUIPage.txtAge, rowData.get("Age"));
      await CommonFunctions.clickElement(element(By.xpath("//input[@name='isFullyInsured' and @value='" + rowData.get("IsFullyInsured") + "']")));
      // await CommonFunctions.staticWait(500);
      //is Medicare-Plan
      await CommonFunctions.clickElement(element(By.xpath("//input[@name='isMedicare' and @value='" + rowData.get("IsMedicare") + "']")));
      //await CommonFunctions.staticWait(500);
      await CommonFunctions.clickElement(element(By.xpath("//input[@name='isMedicaid' and @value='" + rowData.get("IsMedicaid") + "']")));
      // await CommonFunctions.staticWait(500);
      //is Hmo-Plan
      await CommonFunctions.clickElement(element(By.xpath("//input[@name='isHMO' and @value='" + rowData.get("IsHMO") + "']")));
      // await CommonFunctions.staticWait(500);
      //Attending Provider a Physician
      await CommonFunctions.clickElement(element(By.xpath("//input[@name='isAttendingProvider' and @value='" + rowData.get("IsAttendingProvider") + "']")));
      // await CommonFunctions.staticWait(500);
      await CommonFunctions.selectByVisibleText(lUIPage.drpDwnStateOfApproval, rowData.get("ResultTypeDrpDwn"));
      
      await CommonFunctions.clickElement(lUIPage.btnSubmit);
      // element.all(By.xpath("(//*[@class='card'])[2]")).map(function(elm){
      await CommonFunctions.staticWait(5000);
      var actualOpMsg = await CommonFunctions.getTextFromArrayOfElements(lUIPage.txtOutputMsg);
      actualOpMsg = actualOpMsg === undefined || actualOpMsg === null ? " " : actualOpMsg;
      var actualSMMsg = await CommonFunctions.getTextFromArrayOfElements(lUIPage.txtSMMsg);
      actualSMMsg = actualSMMsg === undefined || actualSMMsg === null ? " " : actualSMMsg;
      var actualSOGMsg = await CommonFunctions.getTextFromElement(lUIPage.txtSOG);
      actualSOGMsg = actualSOGMsg === undefined || actualSOGMsg === null ? " " : actualSOGMsg;
      console.log(actualOpMsg);
      console.log(actualOpMsg);
      var actualMsg: string = actualOpMsg.toString().replace(/,/g, "").trim().replace(/\s/g, "").replace(/[\[\]']+/g, '').replace(/-/g, "");
      var expMsg = rowData.get("ExpectedMessage").replace(/,/g, "").trim().replace(/\s/g, "").replace(/[\[\]']+/g, '').replace(/-/g, "");
      var isMsgDisplayed: boolean = await actualMsg.includes(expMsg);
      var outputStatus: Status = Status.PASSED;
      try {
        expect(isMsgDisplayed).to.be.true;
      } catch (error) {outputStatus = Status.PASSED; }
      actualMsg = actualSMMsg.toString().replace(/,/g, "").trim().replace(/\s/g, "").replace(/[\[\]']+/g, '').replace(/-/g, "");
      expMsg = rowData.get("ExpectedSM") != undefined ? rowData.get("ExpectedSM").replace(/,/g, "").trim().replace(/\s/g, "").replace(/[\[\]']+/g, '').replace(/-/g, "") : " ".trim();
      var isSMDisplayed: boolean = await actualMsg.includes(expMsg);
      var smStatus: Status = Status.PASSED;
      try {
        expect(isSMDisplayed).to.be.true;
      } catch (error) {smStatus = Status.FAILED; }

      actualMsg = actualSOGMsg.toString().replace(/,/g, "").trim().replace(/\s/g, "").replace(/[\[\]']+/g, '').replace(/-/g, "");
      expMsg = rowData.get("ExpectedSOG") != undefined ? rowData.get("ExpectedSOG").replace(/,/g, "").trim().replace(/\s/g, "").replace(/[\[\]']+/g, '').replace(/-/g, "") : " ".trim();
      var isSOGDisplayed: boolean = await actualMsg.includes(expMsg);
      var sogStatus: Status = Status.PASSED;
      try {
        expect(isSOGDisplayed).to.be.true;
      } catch (error) {sogStatus = Status.FAILED;}    
      var comboStatus: Status = !isMsgDisplayed || !isSMDisplayed || !isSOGDisplayed?Status.FAILED:Status.PASSED;
      var op = new Output(rowData.get("IsFullyInsured"), rowData.get("IsMedicare"), rowData.get("IsMedicaid"), rowData.get("IsHMO"), rowData.get("IsAttendingProvider"), rowData.get("StateOfResidence"), rowData.get("StateOfIssue"), rowData.get("StateOfService"), rowData.get("Age"), rowData.get("ResultTypeDrpDwn"), rowData.get("ExpectedMessage"), actualOpMsg, rowData.get("ExpectedSM"), actualSMMsg, rowData.get("ExpectedSOG"), actualSOGMsg, now.getDate().toString() + now.getTime().toString(), comboStatus, outputStatus, smStatus, sogStatus);
      Output.lstCombinations.add(op);
      CommonFunctions.staticWait(500);
      //Reset-button
      CommonFunctions.clickElement(lUIPage.btnReset);
      CommonFunctions.staticWait(500);
    } catch (error) {
      var op = new Output(rowData.get("IsFullyInsured"), rowData.get("IsMedicare"), rowData.get("IsMedicaid"), rowData.get("IsHMO"), rowData.get("IsAttendingProvider"), rowData.get("StateOfResidence"), rowData.get("StateOfIssue"), rowData.get("StateOfService"), rowData.get("Age"), rowData.get("ResultTypeDrpDwn"), rowData.get("ExpectedMessage"), error.toString(), rowData.get("ExpectedSM"), actualSMMsg, rowData.get("ExpectedSOG"), actualSOGMsg, now.getDate().toString() + now.getTime().toString(), Status.FAILED, Status.FAILED, Status.FAILED, Status.FAILED);
      Output.lstCombinations.add(op);
      CommonFunctions.clickElement(lUIPage.btnReset);
    }
  }
});

When('user enter and clicks on few fields in UI page', async function () {
  await CommonFunctions.clickElement(lUIPage.rdoBtnFullyInsuredYes)
  await CommonFunctions.clickElement(lUIPage.rdoBtnMedicarePlanNo);
  await CommonFunctions.clickElement(lUIPage.rdoBtnMedicaidYes);
  await CommonFunctions.clickElement(lUIPage.rdoBtnHMOPlanNo);
  await CommonFunctions.clickElement(lUIPage.rdoBtnProviderPhysicianYes);
  await CommonFunctions.selectByVisibleText(lUIPage.drpDwnStatesOfResidence, "Alabama");
  await CommonFunctions.clickElement(lUIPage.chkAllTheSame);
  await CommonFunctions.selectByVisibleText(lUIPage.drpDwnStateOfApproval, "P2P Review");
});

When('clicks on reset button', async function () {
  await CommonFunctions.clickElement(lUIPage.btnReset);
});

Then('verify all fields are cleared', async function () {
  await browser.sleep(2000)
  var fullyInsuredNo: boolean = await lUIPage.rdoBtnFullyInsuredNo.isSelected();
  this.attach("Fully insured No radio button is selected " + fullyInsuredNo);
  expect(fullyInsuredNo).to.be.false;
  var fullyInsuredYes: boolean = await lUIPage.rdoBtnFullyInsuredYes.isSelected();
  this.attach("Fully insured Yes radio button is selected " + fullyInsuredYes);
  expect(fullyInsuredYes).to.be.false;
  var hmoPlanNo: boolean = await lUIPage.rdoBtnHMOPlanNo.isSelected();
  this.attach("HMO PLan No radio button is selected " + hmoPlanNo);
  expect(hmoPlanNo).to.be.false;
  var hmoPlanYes: boolean = await lUIPage.rdoBtnHMOPlanYes.isSelected();
  this.attach("HMO PLan Yes radio button is selected " + hmoPlanYes);
  expect(hmoPlanYes).to.be.false;
  await browser.sleep(2000)
  var medicaidNo: boolean = await lUIPage.rdoBtnMedicaidNo.isSelected();
  this.attach("Medicaid No radio button is selected " + medicaidNo);
  expect(medicaidNo).to.be.false;

  expect(await CommonFunctions.isElementChecked(lUIPage.rdoBtnMedicaidYes)).to.be.false;
  expect(await CommonFunctions.isElementChecked(lUIPage.rdoBtnMedicarePlanNo)).to.be.false;
  expect(await CommonFunctions.isElementChecked(lUIPage.rdoBtnMedicarePlanYes)).to.be.false;
  expect(await CommonFunctions.isElementChecked(lUIPage.rdoBtnProviderPhysicianNo)).to.be.false;
  expect(await CommonFunctions.isElementChecked(lUIPage.rdoBtnProviderPhysicianYes)).to.be.false;
});

When('user selects any of the two state dropdowns', async function () {
  // await CommonFunctions.selectDropdownByIndex(lUIPage.drpDwnStatesOfResidence, 2, 1000);
  // await CommonFunctions.selectDropdownByIndex(lUIPage.drpDwnStatesOfIssue, 3, 1000);

  var wb = new Excel.Workbook();
  wb.xlsx.readFile("./Test.xlsx").then(async function () {
    var inboundWorksheet = await wb.getWorksheet("Sheet1");
    console.log("State of REsidance to be selected::?>>>" + inboundWorksheet.getRow(2).getCell(7));
    await CommonFunctions.staticWait(10000);
    await CommonFunctions.selectDropdownByIndex(lUIPage.drpDwnStatesOfResidence, 2, 1000);
  });

});
Then('all the same checkbox should be {string}', async function (active: string) {
  var alltheSame: boolean;
  alltheSame = await lUIPage.chkAllTheSame.isEnabled()
  if (active === "enabled") {
    this.attach("All the same checkbox is >>>>" + alltheSame ? "enabled" : "disabled");
    expect(alltheSame).to.be.true;
  } else {
    this.attach("All the same checkbox is >>>>" + alltheSame ? "disabled" : "enabled");
    expect(alltheSame).to.be.false;
  }
});

When('user selects value from single dropdown', async function () {
  await CommonFunctions.selectDropdownByIndex(lUIPage.drpDwnStatesOfResidence, 3, 2000);
});

Then('user clicks on All the Same checkbox', async function () {
  await lUIPage.chkAllTheSame.click();
});

Then('all state dropdowns should be populated with same value', async function () {
  var selectedValueResidence = await CommonFunctions.getSelectedValueFromDrpDwn(lUIPage.drpDwnStatesOfResidence);
  var selectedValueIssue = await CommonFunctions.getSelectedValueFromDrpDwn(lUIPage.drpDwnStatesOfIssue);
  var selectedValueService = await CommonFunctions.getSelectedValueFromDrpDwn(lUIPage.drpDwnStatesOfService);
  this.attach("Drop down values are >>>>: " + selectedValueResidence + "   " + selectedValueIssue + "   " + selectedValueService);
  expect(selectedValueResidence).to.equal(selectedValueIssue);
  expect(selectedValueResidence).to.equal(selectedValueService);
  expect(selectedValueIssue).to.equal(selectedValueService);
});



// When('user select  Diffrent combination of IP', async function () {
//   var wb = new Excel.Workbook();
//   let sor = wb.xlsx.readFile("./Test.xlsx").then( async function(){
//       var inboundWorksheet = await wb.getWorksheet("Sheet1");
//       console.log("State of REsidance to be selected::?>>>" +inboundWorksheet.getRow(2).getCell(7));
//       await CommonFunctions.staticWait(10000);
//       await CommonFunctions.selectDropdownByIndex(lUIPage.drpDwnStatesOfResidence, 2, 1000);

// });
// });


Then('following values are displayed in Approval dropdown', async function (dataTable) {
  var data = dataTable.hashes();
  var options = await CommonFunctions.getSelectValues(lUIPage.drpDwnStateOfApproval);
  for (var i = 0; i < data.length; i++) {
    this.attach("check values present " + options.some(o => o === data[i].Buttons));
    expect(options.some(o => o === data[i].Buttons)).to.true;
  }
});

