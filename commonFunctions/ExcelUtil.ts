import { Output } from '../pages/Output';
import { Status } from 'cucumber';
import Collections = require("typescript-collections");
import Excel = require("exceljs-plus");
var now = new Date();
const fs = require('fs');
const path = require('path');

const directory = '../DARE_Automation/ExcelOutput/';
export class ExcelUtil {

    public static readExcel(filePath: string, sheetName): Collections.LinkedList<Map<string, string>> {
        var wb = new Excel.Workbook();

        return wb.xlsx.readFile(filePath).then(function () {
            var data: Collections.LinkedList<Map<string, string>> = new Collections.LinkedList<Map<string, string>>();
            var sheet = wb.getWorksheet(sheetName);
            var totalRowsIncludingEmptyRows: number = sheet.rowCount
            console.log("total nuumber of rows : " + totalRowsIncludingEmptyRows)
            for (var i = 2; i <= totalRowsIncludingEmptyRows; i++) {
                var headerRow = sheet.getRow(1);
                var row = sheet.getRow(i);
                if (row.getCell(1).value === 'dare-ui') {
                    var rowData: Map<string, string> = new Map<string, string>();
                    row.eachCell(function (cell, colNumber) {
                        rowData.set(headerRow.getCell(colNumber).value, cell.value != undefined && cell.value != null ? cell.value : " ");
                    });
                    data.add(rowData);
                }
            }
            return data;
        });

    }

    public static async writeExcel(data: Collections.LinkedList<Output>) {
        var wb = new Excel.Workbook();
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
          
            for (const file of files) {
              fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
              });
            }
          });
        var sheet = wb.addWorksheet('Output');
        sheet.columns = [
            { header: 'IsFullyInsured', key: 'IsFullyInsured', width: 5 },
            { header: 'IsMedicare', key: 'IsMedicare', width: 5 },
            { header: 'IsMedicaid', key: 'IsMedicaid', width: 5 },
            { header: 'IsHMO', key: 'IsHMO', width: 5 },
            { header: 'IsAttendingProvider', key: 'IsAttendingProvider', width: 5 },
            { header: 'StateOfResidence', key: 'StateOfResidence', width: 15 },
            { header: 'StateOfIssue', key: 'StateOfIssue', width: 15 },
            { header: 'StateOfService', key: 'StateOfService', width: 15 },
            { header: 'Age', key: 'Age', width: 5 },
            { header: 'ResultTypeDrpDwn', key: 'ResultTypeDrpDwn', width: 5 },
            { header: 'ExpectedMessage', key: 'ExpectedMessage', width: 70 },
            { header: 'ActualMessage', key: 'ActualMessage', width: 70 },
            { header: 'ExpectedSM', key: 'ExpectedSM', width: 70 },
            { header: 'ActualSM', key: 'ActualSM', width: 70 },
            { header: 'ExpectedSOG', key: 'ExpectedSOG', width: 30 },
            { header: 'ActualSOG', key: 'ActualSOG', width: 30 },
            { header: 'ExecutionTime', key: 'ExecutionTime', width: 10 },
            { header: 'TCStatus', key: 'TCStatus', width: 10 }
        ];

        data.forEach(rowData => {
            sheet.addRow({
                IsFullyInsured: rowData.getIsFullyInsured(),
                IsMedicare: rowData.getIsMedicare(),
                IsMedicaid: rowData.getIsMedicaid(),
                IsHMO: rowData.getIsHMO(),
                IsAttendingProvider: rowData.getIsAttendingProvider(),
                StateOfResidence: rowData.getStateOfResidence(),
                StateOfIssue: rowData.getStateOfIssue(),
                StateOfService: rowData.getStateOfService(),
                Age: rowData.getAge(),
                ResultTypeDrpDwn: rowData.getResultTypeDrpDwn(),
                ExpectedMessage: rowData.getExpectedMessage(),
                ActualMessage: rowData.getActualMessage(),
                ExpectedSM: rowData.getExpectedSM(),
                ActualSM: rowData.getActualSM(),
                ExpectedSOG: rowData.getExpectedSOG(),
                ActualSOG: rowData.getActualSOG(),
                ExecutionTime: rowData.getExecutionTime(),
                TCStatus: rowData.getTcStatus()
            });
        });

        var colorPass = { color: { argb: '006400' } };
        var colorFail = { color: { argb: 'FF0000' } };

        var dataArray: Output[] = data.toArray();
        sheet.eachRow(function (row, rowNumber) {
            if (rowNumber > 1) {
                console.log("Message status ::>>>> " + dataArray[rowNumber - 2].getMsgStatus());
                if (dataArray[rowNumber - 2].getMsgStatus() === Status.PASSED) {
                    row.getCell("ExpectedMessage").font = colorPass;
                    row.getCell("ActualMessage").font = colorPass;
                } else {
                    row.getCell("ExpectedMessage").font = colorFail;
                    row.getCell("ActualMessage").font = colorFail;
                }

                if (dataArray[rowNumber - 2].getSmStatus() === Status.PASSED) {
                    row.getCell("ExpectedSM").font = colorPass;
                    row.getCell("ActualSM").font = colorPass;
                } else {
                    row.getCell("ExpectedSM").font = colorFail;
                    row.getCell("ActualSM").font = colorFail;
                }

                if (dataArray[rowNumber - 2].getSogStatus() === Status.PASSED) {
                    row.getCell("ExpectedSOG").font = colorPass;
                    row.getCell("ActualSOG").font = colorPass;
                } else {
                    row.getCell("ExpectedSOG").font = colorFail;
                    row.getCell("ActualSOG").font = colorFail;
                }
            }
        });
        
        var fileNameOp = "./ExcelOutput/CreateOutput" + now.getMilliseconds() + ".xls";
        console.log(fileNameOp);
        wb.xlsx.writeFile(fileNameOp);


        
        
    }


}