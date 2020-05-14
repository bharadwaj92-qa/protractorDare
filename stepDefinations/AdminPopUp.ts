import { browser,by } from 'protractor';
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

Then('user should see Admin button', async () => {
  expect(await CommonFunctions.isElementDisplayed(lUIPage.btnAdmin)).to.be.true;
});

When('user click on Admin button', async () => {
  await CommonFunctions.clickElement(lUIPage.btnAdmin);
  await CommonFunctions.staticWait(1000);
});


Then('user should see Admin login popup', async () => {
  expect(await CommonFunctions.isElementDisplayed(lUIPage.btnCancel)).to.be.true;
});

Then('user enter valid {string} and {string} in username and password fields', async (username, password) => {
  await CommonFunctions.staticWait(2000);
  await CommonFunctions.type(lUIPage.txtUserName, username);
  await CommonFunctions.type(lUIPage.txtPwd, password);
});

When('user clicks on Login button', async () => {
  await CommonFunctions.clickElement(lUIPage.btnLogin);
});

When('user click on the Cancel button', async () => {

  await CommonFunctions.staticWait(1000);
  await CommonFunctions.clickElement(element(By.xpath("//*[@id='CancelBtn']")));
  await CommonFunctions.staticWait(1000);
});

Then('user should see Admin UI page', async () => {
  await CommonFunctions.staticWait(2000);
  await CommonFunctions.isElementDisplayed(element(by.xpath("//*[contains(text(),'Admin Page')]")));
});

Then('user should see error message', async () => {
  await CommonFunctions.staticWait(1500);
  await CommonFunctions.isElementDisplayed(lUIPage.lblInvalidLoginError);
});

