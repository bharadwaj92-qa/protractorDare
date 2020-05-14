import { Config, browser } from 'protractor';
import { EnvDetails } from './envdetails';
 
export const config: Config = EnvDetails.setConfig({
    SELENIUM_PROMISE_MANAGER: false,
    capabilities:{
        chromeOptions:{
            "useAutomationExtension": false
        }
    },
    directConnect: true,
    chromeDriver: "../../chromedriver.exe",
   //chromeDriver:"C:/ProgramData/Chrome_driver_78.0.3904.70/chromedriver.exe",
    //Custom framework configuration
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    ignoreUncaughtExceptions: true,
    // Specs to run
    specs: [
      //  "../../features/DARE_Admin.feature",
       // "../../features/dareMainUI.feature"
      // "../../features/DARE_tat_form_submit.feature",
       "../../features/DARE_tat_form_submit_1.feature"
           //"../../features/Dare_Tat_Form.feature"
        // "../../features/login.feature"
         //"../../features/DareSmoke.feature",
    ],
  

  
    
    onPrepare: () => {
        {
            var reporter = require('protractor-multiple-cucumber-html-reporter-plugin'); 
            browser.ignoreSynchronization = true; 
           browser.manage().window().maximize(); 
   
         }
    },
    //Cucumber configurations
    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: 'json:./reports/results.json',
        require: ["../../jsFiles/stepDefinations/*.js"],
        strict: true
        //  tags: "@CucumberScenario or @ProtractorScenario or @TypeScriptScenario or @OutlineScenario",
    },
    //useAllAngular2AppRoots: true,
    //Plug-in configurations
    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            // read the options part
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true,
            displayDuration: true,
            //durationInMS: true,
            pageTitle: "DARE Automation Report",
            reportName: "DARERegressionReport",
            metadatakey: "deviceDetails",
            customData: {
                title: 'DARE',
                data: [
                    { label: 'Project', value: 'DARE' },
                    { label: 'Release', value: '1.2.3' },
                    { label: 'Cycle', value: 'B11221.34321' },
                    { label: 'Execution Start Time', value: Date.now() },
                    { label: 'Execution End Time', value: Date.now() }
                ]
            }
        }

    }],
    params:{
      //  url:"https://dare-ui-ohbsqa.ocp-elr-core-nonprod.optum.com/",
       url:"https://ohbs-dare-ui-dare-ui-ohbsqa.ocp-ctc-core-nonprod.optum.com/dare",
     // url:"https://dare-ui-ohbsdev.ocp-ctc-core-nonprod.optum.com",
       // PRODurl:"https://dare-ui-ohbsprod.ocp-ctc-core-nonprod.optum.com"
       Testdatafile:"./TestData/TestData.xlsx",
       InputSheetname:"Combinations",
       Outputdatafile:'/ExcelOutput/Output.xlsx',
       OutputSheetname: 'ResultFiles'
    }
});

console.log(config);