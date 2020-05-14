import { BeforeAll, After, Status } from 'cucumber';
import { browser } from 'protractor';
import { ExcelUtil } from '../commonFunctions/ExcelUtil';
import { Output } from '../pages/Output';

BeforeAll(function () {
  var { setDefaultTimeout } = require('cucumber');
  setDefaultTimeout(12000 * 100000);
})

// Before(async()=> {
//    await browser.forkNewDriverInstance(false,true);
// })
After(async function (scenario) {
  try {
    if (scenario.result.status === Status.FAILED) {
      const World = this;
      return browser.takeScreenshot().then(function (buffer) {
        return World.attach(buffer, 'image/png');
      });
    }
    await ExcelUtil.writeExcel(Output.lstCombinations);
    console.log("Executed the excel output");
  } catch (error) {
    console.log("Failed Executing the excel output");
    console.log(error);
  }
});

