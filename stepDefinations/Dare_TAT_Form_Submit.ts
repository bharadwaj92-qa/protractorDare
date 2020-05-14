import { browser } from 'protractor';
import { CommonFunctions } from '../commonFunctions/CommonFunctions';

import { TATUiPage } from '../pages/TATUIPage';
var { Given } = require('cucumber');
var { When } = require('cucumber');
var { Then } = require('cucumber');
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
var Excel = require('exceljs');
var TATUIPage: TATUiPage = new TATUiPage();
var assert = require('chai').assert

import { element, by,By,$ } from 'protractor';
import Collections = require("typescript-collections");

import { ExcelUtil } from '../commonFunctions/ExcelUtil';
import { Output } from '../pages/Output';
import { waitToBePresent } from '@hetznercloud/protractor-test-helper/dist';
import { Status } from 'cucumber';
import { contains } from 'typescript-collections/dist/lib/arrays';
var now = new Date();
var { Then } = require('cucumber');
const selection='Licensure and Turnaround time guidance';
const tat="Optum Internal Determination and verbal notification Goal:  Thursday 02/06/20, 11:59 PM ISTaccess_timeDetermination:    Thursday 02/06/20,11:59 PM ISTaccess_timeVerbal Notification:     Tuesday 02/04/20, 06:52 PM ISTaccess_timeWritten Notification:  Tuesday 02/04/20, 06:52 PM ISTaccess_timeRequest received electronically:SPECIAL INSTRUCTIONS:ADMIN Review: 2W not to exceed 10C days for Decision and letter";


 When('Guidance type is clicked', async function () {
  TATUIPage.guidanceTypeInput.click();
  await CommonFunctions.staticWait(1000);
  $("mat-option[ng-reflect-value|='1']").click();
  await CommonFunctions.staticWait(3000);
 });

 When('select Request Date Time', async function () {
    TATUIPage.dateControl.click();
    await CommonFunctions.staticWait(2000);
    await CommonFunctions.clickElement(await element(by.xpath("//*[text()='Set']")))
 });

 When('checkbox for same reciept Date is clicked', async function () {
    $('#mat-checkbox-2-input').click();
    TATUIPage.isReceiptDateSame.click();
    await CommonFunctions.staticWait(2000);
});

When('the State of Residence {string}', async function (sor:string) {
    await CommonFunctions.type(TATUIPage.sorInput ,sor);
    await CommonFunctions.staticWait(2000);
    await CommonFunctions.clickElement(await element(by.xpath("//*[text()='"+sor+"']")))
   });

   When('the State of Service {string}', async function (sos:string) {
    await CommonFunctions.type(TATUIPage.sosInput ,sos);
    await CommonFunctions.staticWait(2000);
    await CommonFunctions.clickElement(await element(by.xpath("//*[text()='"+sos+"']")))
   });

   When('enter the member age', async function () {
    await CommonFunctions.type(TATUIPage.memberAge ,'25');
    await CommonFunctions.staticWait(2000);
   });

   When('the benefit type is {string}', async function (ben:string) {
    await CommonFunctions.selectOptionByOptionValue(TATUIPage.benefit, ben);
    await CommonFunctions.staticWait(2000);
   });

   When('Hmo Plan is {string}', async function (hmo:string) {
    await CommonFunctions.selectOptionByOptionValue(TATUIPage.isHMO, hmo);
    await CommonFunctions.staticWait(2000);
   });

   When('the is Attending Provider physician is {string}', async function (attendingProv:string) {
    await CommonFunctions.selectOptionByOptionValue(TATUIPage.isAttendingProviderPhysician, attendingProv);
    await CommonFunctions.staticWait(2000);
   });

   When('the review is {string}', async function (review:string) {
    await CommonFunctions.selectOptionByOptionValue(TATUIPage.review, review);
    await CommonFunctions.staticWait(2000);
   });

   When('the authorization type is {string}', async function (authType:string) {
    await CommonFunctions.selectOptionByOptionValue(TATUIPage.authreview, authType);
    await CommonFunctions.staticWait(2000);
   });

   When('level of care is {string}', async function (loc:string) {
    await CommonFunctions.selectOptionByOptionValue(TATUIPage.levelofcare, loc);
    await CommonFunctions.staticWait(2000);
   });

   When('User clicks on submit button', async function () {
    $('.submit-button').click();
    await CommonFunctions.staticWait(10000);
   });

   Then('user should see licensure guidance and Turn around time guidance section',async function(){
    expect(await TATUIPage.sog.getText()).to.equals("State of Governance= TX");
    const tattext=await TATUIPage.tatsec.getText();
   
   console.log("tattext"+tattext.includes('INSTRUCTIONS'));

   expect (tattext.includes('INSTRUCTIONS')).to.be.true;
   await CommonFunctions.staticWait(3000);
   });
  

    
   Then('user should see licensure guidance section',async function(){
    expect(await TATUIPage.sog1.getText()).to.equals("States of Governance= AK and AL");
   await CommonFunctions.staticWait(3000);
   });



    

   

 

 