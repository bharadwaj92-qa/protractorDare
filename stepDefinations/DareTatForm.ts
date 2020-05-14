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

import { element, by,By,$ } from 'protractor';
import Collections = require("typescript-collections");

import { ExcelUtil } from '../commonFunctions/ExcelUtil';
import { Output } from '../pages/Output';
import { waitToBePresent } from '@hetznercloud/protractor-test-helper/dist';
import { Status } from 'cucumber';
var now = new Date();
var { Then } = require('cucumber');
const selection='Licensure and Turnaround time guidance';


 When('the State of Issue {string}', async function (soi:string) {
  // TATUIPage.guidanceTypeInput.click();
  // await CommonFunctions.staticWait(3000);
  // $("mat-option[ng-reflect-value|='1']").click();
  await CommonFunctions.staticWait(5000);
    await CommonFunctions.type(TATUIPage.soiInput ,soi);
    await CommonFunctions.staticWait(2000);
    await CommonFunctions.clickElement(await element(by.xpath("//*[text()='"+soi+"']")))
 });

 When('the Product type {string}', async function (product:string) {
   await CommonFunctions.selectOptionByOptionValue(TATUIPage.product, product);
   await CommonFunctions.staticWait(2000);
 });

 Then('user should see How Request recieved field',async function(){
   expect( TATUIPage.requestReceived.isDisplayed());
   TATUIPage.requestReceived.click();
   await CommonFunctions.staticWait(2000);
   expect(element(by.xpath("//*[@ng-reflect-value='Electronic/Portal']")));
   expect(element(by.xpath("//*[@ng-reflect-value='Telephonic/Fax']")));
   //CommonFunctions.selectOptionByOptionValue(TATUIPage.requestReceived,"Electronic/Portal");
 });

 

 

 

 