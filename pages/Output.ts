import { Status } from 'cucumber';
import Collections = require('typescript-collections');


export class Output {

    private isFullyInsured: string;
    private isMedicare: string;
    private isMedicaid: string;
    private isHMO: string;
    private isAttendingProvider: string;
    private stateOfResidence: string;
    private stateOfIssue: string;
    private stateOfService: string;
    private age: string;
    private resultTypeDrpDwn:string;
    private actualMessage: string;
    private expectedMessage: string;
    private expectedSM:string;
    private actualSM: string;
    private actualSOG: string;
    private expectedSOG: string;
    private executionTime: string;
    private tcStatus: Status;
    private msgStatus: Status
    private smStatus: Status;
    private sogStatus: Status;
	public static lstCombinations:Collections.LinkedList<Output> = new Collections.LinkedList<Output>();

    constructor(isFullyInsured:string, isMedicare:string, isMedicaid, isHMO, isAttendingProvider, stateOfResidence, stateOfIssue, stateOfService, age,resultTypeDrpDwn, actualMessage, expectedMessage,expectedSM, actualSM, actualSOG, expectedSOG, executionTime, tcStatus, msgStatus,smStatus, sogStatus) {
        this.isFullyInsured = isFullyInsured;
		this.isMedicare = isMedicare;
		this.isMedicaid = isMedicaid;
		this.isHMO = isHMO;
		this.isAttendingProvider = isAttendingProvider;
		this.stateOfResidence = stateOfResidence;
		this.stateOfIssue = stateOfIssue;
		this.stateOfService = stateOfService;
		this.age = age;
		this.resultTypeDrpDwn = resultTypeDrpDwn;
		this.expectedMessage = expectedMessage;
		this.actualMessage = actualMessage;
		this.expectedSM = expectedSM;
		this.actualSM = actualSM;
		this.actualSOG = actualSOG;
		this.expectedSOG = expectedSOG;
		this.executionTime = executionTime;
		this.tcStatus = tcStatus;
		this.msgStatus = msgStatus;
		this.smStatus = smStatus;
		this.sogStatus = sogStatus;
    }

    public getIsFullyInsured() {
		return this.isFullyInsured;
	}
	public setIsFullyInsured(isFullyInsured) {
		this.isFullyInsured = isFullyInsured;
	}
	public getIsMedicare() {
		return this.isMedicare;
	}
	public setIsMedicare( isMedicare) {
		this.isMedicare = isMedicare;
	}
	public getIsMedicaid() {
		return this.isMedicaid;
	}
	public setIsMedicaid( isMedicaid) {
		this.isMedicaid = isMedicaid;
	}
	public getIsHMO() {
		return this.isHMO;
	}
	public setIsHMO(isHMO) {
		this.isHMO = isHMO;
	}
	public getIsAttendingProvider() {
		return this.isAttendingProvider;
	}
	public setIsAttendingProvider(isAttendingProvider) {
		this.isAttendingProvider = isAttendingProvider;
	}
	public getStateOfResidence() {
		return this.stateOfResidence;
	}
	public setStateOfResidence(stateOfResidence) {
		this.stateOfResidence = stateOfResidence;
	}
	public getStateOfIssue() {
		return this.stateOfIssue;
	}
	public setStateOfIssue(stateOfIssue) {
		this.stateOfIssue = stateOfIssue;
	}
	public getStateOfService() {
		return this.stateOfService;
	}
	public setStateOfService(stateOfService) {
		this.stateOfService = stateOfService;
	}
	public getAge() {
		return this.age;
	}
	public setAge( age) {
		this.age = age;
	}
	public getResultTypeDrpDwn() {
		return this.resultTypeDrpDwn;
	}
	public setResultTypeDrpDwn(resultTypeDrpDwn) {
		this.resultTypeDrpDwn = resultTypeDrpDwn;
	}
	
	public getActualMessage() {
		return this.actualMessage;
	}
	public  setActualMessage(actualMessage) {
		this.actualMessage = actualMessage;
	}
	public getExpectedMessage() {
		return this.expectedMessage;
	}
	public setExpectedMessage(expectedMessage) {
		this.expectedMessage = expectedMessage;
	}
	public getActualSM() {
		return this.actualSM;
	}
	public  setActualSM( actualSM) {
		this.actualSM = actualSM;
	}
	public  getExpectedSM() {
		return this.expectedSM;
	}
	public  setExpectedSM(expectedSM) {
		this.expectedSM = expectedSM;
	}
	public getActualSOG() {
		return this.actualSOG;
	}
	public  setActualSOG( actualSOG) {
		this.actualSOG = actualSOG;
	}
	public getExpectedSOG() {
		return this.expectedSOG;
	}
	public  setExpectedSOG(expectedSOG) {
		this.expectedSOG = expectedSOG;
	}
	
	public getExecutionTime() {
		return this.executionTime;
	}
	public setExecutionTime(executionTime) {
		this.executionTime = executionTime;
	}
	public getTcStatus() {
		return this.tcStatus;
	}
	public setTcStatus(tcStatus) {
		this.tcStatus = tcStatus;
	}
	
	public getMsgStatus() {
		return this.msgStatus;
	}
	public  setMsgStatus(msgStatus) {
		this.msgStatus = msgStatus;
	}
	public getSmStatus() {
		return this.smStatus;
	}
	public setSmStatus(smStatus) {
		this.smStatus = smStatus;
	}
	public getSogStatus() {
		return this.sogStatus;
	}
	public setSogStatus(sogStatus) {
		this.sogStatus = sogStatus;
	}

}
