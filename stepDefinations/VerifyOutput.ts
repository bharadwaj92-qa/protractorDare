import { element, By } from 'protractor';
import Collections = require("typescript-collections");
import { CommonFunctions } from '../commonFunctions/CommonFunctions';
import { LicensureUiPage } from '../pages/LicensureUiPage';
import { ExcelUtil } from '../commonFunctions/ExcelUtil';
import { Output } from '../pages/Output';
import { waitToBePresent } from '@hetznercloud/protractor-test-helper/dist';
import { Status } from 'cucumber';
import { async } from '@angular/core/testing';
var now = new Date();
var { Then,When } = require('cucumber');
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

var lUIPage: LicensureUiPage = new LicensureUiPage();

Then('Execute the combinations placed in {string} file and {string} sheet', async function (filePath, sheetName) {

        var data: Collections.LinkedList<Map<string, string>> = await ExcelUtil.readExcel(filePath, sheetName);
        var dataArray = data.toArray();
        //data.forEach(rowData => {
        for (var i = 0; i < dataArray.length; i++) {
          var rowData: Map<string, string> = dataArray[i];
          try {
            CommonFunctions.clickElement(lUIPage.btnReset);
            await CommonFunctions.selectByVisibleText(lUIPage.drpDwnStatesOfResidence, rowData.get("StateOfResidence"));
            await waitToBePresent(lUIPage.drpDwnStatesOfIssue);
            // await CommonFunctions.staticWait(1000);
            await CommonFunctions.selectByVisibleText(lUIPage.drpDwnStatesOfIssue, rowData.get("StateOfIssue"));
            await waitToBePresent(lUIPage.drpDwnStatesOfService);
            // await CommonFunctions.staticWait(1000);
            await CommonFunctions.selectByVisibleText(lUIPage.drpDwnStatesOfService, rowData.get("StateOfService"));
            await CommonFunctions.clearInput(lUIPage.txtAge);
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
            } catch (error) {outputStatus = Status.FAILED; }
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
          } catch (error) {
            var op = new Output(rowData.get("IsFullyInsured"), rowData.get("IsMedicare"), rowData.get("IsMedicaid"), rowData.get("IsHMO"), rowData.get("IsAttendingProvider"), rowData.get("StateOfResidence"), rowData.get("StateOfIssue"), rowData.get("StateOfService"), rowData.get("Age"), rowData.get("ResultTypeDrpDwn"), rowData.get("ExpectedMessage"), error.toString(), rowData.get("ExpectedSM"), actualSMMsg, rowData.get("ExpectedSOG"), actualSOGMsg, now.getDate().toString() + now.getTime().toString(), Status.FAILED, Status.FAILED, Status.FAILED, Status.FAILED);
            Output.lstCombinations.add(op);
          }
        }
      });

      When('select the combinations {string},{string},{string},{string},{string},{string},{string},{string},{string},{string},{string},{string},{string}', async function (sor, soi, sos, age, fullyInsured, medicare, medicaid, dualmmp, hmo, dirEmployer, pp, review, authreview) {
        await CommonFunctions.selectByVisibleText(lUIPage.drpDwnStatesOfResidence, sor);
        await waitToBePresent(lUIPage.drpDwnStatesOfIssue);
        // await CommonFunctions.staticWait(1000);
        await CommonFunctions.selectByVisibleText(lUIPage.drpDwnStatesOfIssue, soi);
        await waitToBePresent(lUIPage.drpDwnStatesOfService);
        // await CommonFunctions.staticWait(1000);
        await CommonFunctions.selectByVisibleText(lUIPage.drpDwnStatesOfService,sos);
        await CommonFunctions.clearInput(lUIPage.txtAge);
        await CommonFunctions.type(lUIPage.txtAge, age);
        await CommonFunctions.clickElement(element(By.xpath("//input[@name='isFullyInsured' and @value='" + fullyInsured + "']")));
        // await CommonFunctions.staticWait(500);
        //is Medicare-Plan
        await CommonFunctions.clickElement(element(By.xpath("//input[@name='isMedicare' and @value='" + medicare + "']")));
        //await CommonFunctions.staticWait(500);
        await CommonFunctions.clickElement(element(By.xpath("//input[@name='isMedicaid' and @value='" + medicaid + "']")));
        // await CommonFunctions.staticWait(500);
        await CommonFunctions.clickElement(element(By.xpath("//input[@name='isDualMMP' and @value='" + dualmmp + "']")));
        //is Hmo-Plan
        await CommonFunctions.clickElement(element(By.xpath("//input[@name='isHMO' and @value='" + hmo + "']")));
        await CommonFunctions.clickElement(element(By.xpath("//input[@name='isStateOhio' and @value='" + dirEmployer + "']")));
        // await CommonFunctions.staticWait(500);
        //Attending Provider a Physician
        await CommonFunctions.clickElement(element(By.xpath("//input[@name='isAttendingProvider' and @value='" + pp + "']")));
        // await CommonFunctions.staticWait(500);
        await CommonFunctions.selectByVisibleText(lUIPage.drpDwnStateOfApproval, review);
        await CommonFunctions.selectByVisibleText(lUIPage.drpDwnAuthReview, authreview);
        await CommonFunctions.clickElement(lUIPage.btnSubmit);
        // element.all(By.xpath("(//*[@class='card'])[2]")).map(function(elm){
        await CommonFunctions.staticWait(5000);
        

      });

      Then('Verify the licensure and tat guidance', async function () {
        var licensureGuidance:Boolean = await lUIPage.labelLicensureGuidance.isDisplayed();
        var tatGuidance:Boolean = await lUIPage.labelTATGuidance.isDisplayed();
        var labelOptumInternal:Boolean = await lUIPage.labelOptumInternal.isDisplayed();
        var labelDetermination:Boolean = await lUIPage.labelDetermination.isDisplayed();
        var labelVerbalNotification:Boolean = await lUIPage.labelVerbalNotification.isDisplayed();
        var labelWrittenNotification:Boolean = await lUIPage.labelWrittenNotification.isDisplayed();
        expect(licensureGuidance && tatGuidance && labelOptumInternal && labelDetermination && labelVerbalNotification && labelWrittenNotification).to.be.true;
        
      });