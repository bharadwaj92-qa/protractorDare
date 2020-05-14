import { protractor, ElementFinder, browser, element, by, $, ElementArrayFinder } from 'protractor';
import { async } from '@angular/core/testing';
import { click, waitToBeDisplayed } from '@hetznercloud/protractor-test-helper';
import { text } from '@angular/core/src/render3';
import { type } from 'os';

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

export class CommonFunctions {

    static async isElementDisplayed(objElement) {
        return await objElement.isDisplayed();
    }

    static async getTextFromElement(objElement: ElementFinder) {
        return await objElement.getText();
    }

    static async selectByVisibleText(selectElement: ElementFinder, value: string): Promise<void> {
        await selectElement.element(by.xpath("./option[text()='" + value + "']")).click();
        await browser.sleep(1000);
        return Promise.resolve();
    }

    static async selectDropdownByIndex(element, index, milliseconds) {
        element.all(by.tagName('option'))
            .then(function (options) {
                return options[index].click();
            });
        if (typeof milliseconds != 'undefined') {
            return browser.sleep(milliseconds);
        }
    };

    public static async selectByValue(selectElement: ElementFinder, value: string): Promise<void> {
        console.log("Selecting element based on value  : " + value)
        // select the option
        await selectElement.element(by.xpath("./option[value='" + value + "']")).click();
        await this.staticWait(1000);
        return Promise.resolve();
    }

    public static isMultiple(dropDownElement: ElementFinder) {
        // select the option
        dropDownElement.getAttribute("multiple").then(function (multipleOrNot) {
            if (multipleOrNot) {
                return true
            } else {
                return false;
            }
        });
    }
    public static getSelectValues(selectElement: ElementFinder) {
        return selectElement.all(by.tagName('option')).map(function (elem, index) {
            return elem.getText();
        });
    }

    public static getSelectedValueFromDrpDwn(selectElement: ElementFinder) {
        return selectElement.$('option').getText();
    }

    public static isElementChecked(chkElement: ElementFinder) {
        return chkElement.isSelected();
    }

    public static async clickElement(ele: ElementFinder) {
        return await ele.click();
    }

    public static async clickElement1(ele: ElementFinder) {
        return await ele.click();
    }

    public static async type(ele: ElementFinder, textToEnter) {
        return await ele.sendKeys(textToEnter);
    }

    public static async staticWait(sleepTime: number) {
        return await browser.sleep(sleepTime)
    }

    public static async getTitle() {
        return await browser.getTitle();
    }

    public static async identifyElement(type: string, value: string) {
        let ele: ElementFinder;
        switch (type.toLocaleUpperCase()) {
            case "TEXT":
                ele = await element(by.xpath("//*[text()='" + value + "']"));
                break;
            case "PARTIALTEXT":
                ele = await element(by.xpath("//*[contains(text(),'" + value + "')]"));
                break;
            case "ID":
                ele = await $("#" + value);
                break;
            case "CLASS":
                ele = await $("." + value);
                break;
            case "XPATH":
                ele = await element(by.xpath(value));
                break;
        }
        return await ele;
    }

    public static async getTextFromArrayOfElements(ele: ElementArrayFinder): Promise<string> {
        //var message = " ";
        // await ele.each(async function (element, index) {
        //     // Will print 0 First, 1 Second, 2 Third.
        //    await element.getText().then(async function (text) {
        //        message = await message+" "+ await text;
        //        console.log("message variable :::>> "+message);
        //     });
        // });

        return ele.map(async function (elm) {
            await waitToBeDisplayed(elm);
            return await elm.getText();
        }).then(async function (texts) {
            // await texts.forEach(async text=>{
            //     console.log("Logging")
            //     message = await message+ await text;
            // });
            return texts.toString();
        });
    }

    public static async clearInput(objElement: ElementFinder):Promise<void>{
        return await objElement.clear();
    }

    public static async selectOptionByOptionValue(ele, valueToFind) {

       // const ele = element(by.xpath("//*[@formcontrolname='requestReceived']"));
       await ele.click().then(() => {
            
          ele.getAttribute('aria-owns').then((optionIdsString: string) => {
              const optionIds = optionIdsString.split(' ');    
      
              for (let optionId of optionIds) {
                const option = element(by.id(optionId));
                option.getText().then((text) => {
                    console.log(text);
                  if (text === valueToFind) {
                   CommonFunctions.jsClick(option);
                  }
                });
              }
            });
        });
      }
      
      //selectOptionByOptionValue('your-id', '1');
      public static async jsClick(ele:ElementFinder){
        await browser.executeScript("arguments[0].click();", ele);
      }
}