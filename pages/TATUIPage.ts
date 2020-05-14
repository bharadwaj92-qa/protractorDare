import { $, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class TATUiPage {
    stateOfIssue = element(by.xpath("//*[@formcontrolname='stateOfIssue']"));
    product = element(by.xpath("//*[@formcontrolname='product']"));
    requestReceived = element(by.xpath("//*[@formcontrolname='requestReceived']"));
    soiInput = element(by.xpath("//*[@ng-reflect-placeholder='State of Issue']"));
    sorInput = element(by.xpath("//*[@ng-reflect-placeholder='State of Residence']"));
    sosInput = element(by.xpath("//*[@ng-reflect-placeholder='State of Service']"));
    guidanceType=element(by.xpath("//*[@formcontrolname='guidanceType']"));
    guidanceTypeInput=element(by.xpath("//*[@ng-reflect-name='guidanceType']"));
    memberAge=element(by.xpath("//*[@formcontrolname='memberAge']"));
    benefit=element(by.xpath("//*[@formcontrolname='benefit']"));
    isAttendingProviderPhysician=element(by.xpath("//*[@formcontrolname='isAttendingProviderPhysician']"));
    review=element(by.xpath("//*[@formcontrolname='review']"));
    isHMO=element(by.xpath("//*[@formcontrolname='isHMO']"));
    authreview=element(by.xpath("//*[@formcontrolname='authreview']"));
    levelofcare=element(by.xpath("//*[@formcontrolname='levelofcare']"));
    dateControl=element(by.xpath("//*[@formcontrolname='dateControl']"));
    isReceiptDateSame=element(by.xpath("//*[@formcontrolname='isReceiptDateSame']"));
    submitBtn=element(by.xpath("//*[@class='submit-button mat-raised-button mat-button-base']"));
     sog=element(by.xpath("(//*[text()='Licensure Guidance']/following-sibling::mat-card-content//p)[2]"));
     sog1=element(by.xpath("(//*[text()='Licensure Guidance']/following-sibling::mat-card-content//p)[3]"));
     tatsec=element(by.xpath("//*[text()='Turn Around Time Guidance']/following-sibling::mat-card-content"));
     //tatsec=element(by.xpath("//*[contains(text()='Turn Around Time Guidance']/following-sibling::mat-card-content),'ADMIN Review: 2W not to exceed 10C days for Decision and letter']"));
    
    // chkAllTheSame = $("#AllSameChkBx");
    // chkAllTheSame = $("#AllSameChkBx");
}