import { Config } from 'protractor';
import { config } from './config';

export class EnvDetails {
    public static setConfig(config: Config) {
        for (var i = 0; i < process.argv.length; i++) {
            if (process.argv[i] === '--params') {
                var brsr: String[] = process.argv[i + 1].split(":");
                if (brsr[0] === 'saucelabs') {
                    config.sauceUser = "vnagarj1";
                    config.sauceKey = "156c53ee-8689-4a00-bc49-55abd7036dd7";
                    config.platform = 'Windows 7';
                    config.screenResolution = '1920x1080';
                    config.shardTestFiles = false;
                    config.maxInstances = 100;
                    config.sauceSeleniumUseHttp = false;
                    config.ignoreProtectedModeSettings = true;
                    config = EnvDetails.browserConfig(config, brsr[1], 'sauce');
                    config.directConnect = false;
                } else {
                    config = EnvDetails.browserConfig(config, brsr[1], 'local');
                    //config.directConnect = true;
                }
            }
        }
        return config;
    }

    public static browserConfig(config: Config, brsr, env: string) {
        console.log("Browser user wants to run :::>>> " + brsr);
        if (env === "sauce") {
            switch (brsr.trim()) {
                case "ie":
                    config.capabilities.browserName = 'internet explorer';
                    config.capabilities.platform = 'WINDOWS';
                    config.capabilities.version = '11';
                    config.capabilities.tunnelIdentifier = 'Optum-Prd';
                    config.capabilities.parentTunnel = 'optumtest';
                    config.capabilities.maxDuration = 10800;
                    config.capabilities.commandTimeout = 300;
                    break;
                case "ff":
                    config.capabilities.browserName = 'firefox';
                    console.log("Firefox browser is configured");
                    config.capabilities.tunnelIdentifier = 'Optum-Prd';
                    config.capabilities.parentTunnel = 'optumtest';
                    config.capabilities.maxDuration = 10800;
                    config.capabilities.commandTimeout = 300;
                    break;
                case "chrome":
                    config.capabilities.browserName = 'chrome';
                    config.capabilities.tunnelIdentifier = 'Optum-Prd';
                    config.capabilities.parentTunnel = 'optumtest';
                    config.capabilities.maxDuration = 10800;
                    config.capabilities.commandTimeout = 300;
                    //config.capabilities.browserName = 'chrome';
                    break;
                case 'chromeff':
                    var brs: any[] = [
                        {
                            "browserName": 'firefox',
                            "tunnelIdentifier": 'Optum-Prd',
                            "parentTunnel": 'optumtest',
                            "maxDuration": 10800,
                            "commandTimeout": 300
                        }, {
                            "browserName": 'chrome',
                            "tunnelIdentifier": 'Optum-Prd',
                            "parentTunnel": 'optumtest',
                            "maxDuration": 10800,
                            "commandTimeout": 300
                            
                        }
                    ];
                    config.multiCapabilities = brs;
                    break;
                case 'chromeie':
                    var brs: any[] = [
                        {
                            "browserName": 'internet explorer',
                            "tunnelIdentifier": 'Optum-Prd',
                            "parentTunnel": 'optumtest',
                            "maxDuration": 10800,
                            "commandTimeout": 300
                        }, {
                            "browserName": 'chrome',
                            "tunnelIdentifier": 'Optum-Prd',
                            "parentTunnel": 'optumtest',
                            "maxDuration": 10800,
                            "commandTimeout": 300
                        }
                    ];
                    config.multiCapabilities = brs;
                    break;
                case 'ffie':
                    var brs: any[] = [
                        {
                            "browserName": 'firefox',
                            "tunnelIdentifier": 'Optum-Prd',
                            "parentTunnel": 'optumtest',
                            "maxDuration": 10800,
                            "commandTimeout": 300
                        }, {
                            "browserName": 'internet explorer',
                            "tunnelIdentifier": 'Optum-Prd',
                            "parentTunnel": 'optumtest',
                            "maxDuration": 10800,
                            "commandTimeout": 300
                        }
                    ];
                    config.multiCapabilities = brs;
                    break;
                case 'ffheadless':
                    var brs: any[] = [
                        {
                            "browserName": 'firefox',
                            "tunnelIdentifier": 'Optum-Prd',
                            "parentTunnel": 'optumtest',
                            "maxDuration": 10800,
                            "commandTimeout": 300,
                            'firefoxOptions': [
                                {
                                    args: ["--headless"]
                                }
                            ],
                            'moz:firefoxOptions': {
                                args: ["--headless"]
                            }
                        }
                    ];
                    config.multiCapabilities = brs;
                    break;
                case 'chromeheadless':
                    config.capabilities.browserName = 'chrome';
                    config.capabilities.chromeOptions.args = ["--headless"];
                    config.capabilities.tunnelIdentifier = 'Optum-Prd';
                    config.capabilities.parentTunnel = 'optumtest';
                    config.capabilities.maxDuration =  10800,
                    config.capabilities.commandTimeout = 300
                    break;
                case 'chromeheadlessie':
                    var brs: any[] = [
                        {
                            "browserName": 'chrome',
                            "tunnelIdentifier": 'Optum-Prd',
                            "parentTunnel": 'optumtest',
                            "maxDuration": 10800,
                            "commandTimeout": 300,
                            'chromeOptions': [
                                {
                                    args: ["--headless"]
                                }
                            ]
                        }, {
                            "browserName": 'internet explorer',
                            "tunnelIdentifier": 'Optum-Prd',
                            "parentTunnel": 'optumtest',
                            "maxDuration": 10800,
                            "commandTimeout": 300
                        }
                    ];
                    config.multiCapabilities = brs;
                    break;
                case 'chromeffheadless':
                    var brs: any[] = [
                        {
                            "browserName": 'chrome',
                            "tunnelIdentifier": 'Optum-Prd',
                            "parentTunnel": 'optumtest',
                            "maxDuration": 10800,
                            "commandTimeout": 300,
                            'chromeOptions': [
                                {
                                    args: ["--headless"]
                                }
                            ]
                        }, {
                            "browserName": 'firefox',
                            "tunnelIdentifier": 'Optum-Prd',
                            "parentTunnel": 'optumtest',
                            "maxDuration": 10800,
                            "commandTimeout": 300,
                            'firefoxOptions': [
                                {
                                    args: ["--headless"]
                                }
                            ],
                            'moz:firefoxOptions': {
                                args: ["--headless"]
                            }
                        }
                    ];
                    break;
                case 'ffheadlessie':
                    var brs: any[] = [
                        {
                            "browserName": 'firefox',
                            "tunnelIdentifier": 'Optum-Prd',
                            "parentTunnel": 'optumtest',
                            "maxDuration": 10800,
                            "commandTimeout": 300,
                            'firefoxOptions': [
                                {
                                    args: ["--headless"]
                                }
                            ],
                            'moz:firefoxOptions': {
                                args: ["--headless"]
                            }
                        }, {
                            "browserName": 'internet explorer',
                            "tunnelIdentifier": 'Optum-Prd',
                            "parentTunnel": 'optumtest',
                            "maxDuration": 10800,
                            "commandTimeout": 300
                        }
                    ];
                    config.multiCapabilities = brs;
                    break;
                default:
                    console.log("default browser(chrome) is configured");
                    config.capabilities.browserName = 'chrome';
                    config.capabilities.tunnelIdentifier = 'Optum-Prd';
                    config.capabilities.parentTunnel = 'optumtest';
                    config.capabilities.maxDuration = 10800;
                    config.capabilities.commandTimeout = 300;
            }
        } else if (env === "local") {
            switch (brsr.trim()) {
                case "ie":
                    config.capabilities.browserName = 'internet explorer';
                    config.capabilities.platform = 'WINDOWS';
                    config.capabilities.version = '11';
                    break;
                case "ff":
                    config.capabilities.browserName = 'firefox';
                    console.log("Firefox browser is configured");
                    break;
                case "chrome":
                    config.capabilities.browserName = 'chrome';
                    //config.capabilities.browserName = 'chrome';
                    break;
                case 'chromeff':
                    var brs: any[] = [
                        {
                            "browserName": 'firefox',
                        }, {
                            "browserName": 'chrome',
                        }
                    ];
                    config.multiCapabilities = brs;
                    break;
                case 'chromeie':
                    var brs: any[] = [
                        {
                            "browserName": 'internet explorer'
                        }, {
                            "browserName": 'chrome'
                        }
                    ];
                    config.multiCapabilities = brs;
                    break;
                case 'ffie':
                    var brs: any[] = [
                        {
                            "browserName": 'firefox'
                        }, {
                            "browserName": 'internet explorer'
                        }
                    ];
                    config.multiCapabilities = brs;
                    break;
                case 'ffheadless':
                    var brs: any[] = [
                        {
                            "browserName": 'firefox',
                            'firefoxOptions': [
                                {
                                    args: ["--headless"]
                                }
                            ],
                            'moz:firefoxOptions': {
                                args: ["--headless"]
                            }
                        }
                    ];
                    config.multiCapabilities = brs;
                    break;
                case 'chromeheadless':
                    config.capabilities.browserName = 'chrome';
                    config.capabilities.chromeOptions.args = ["--headless"];
                    break;
                case 'chromeheadlessie':
                    var brs: any[] = [
                        {
                            "browserName": 'chrome',
                            'chromeOptions': [
                                {
                                    args: ["--headless"]
                                }
                            ]
                        }, {
                            "browserName": 'internet explorer',
                        }
                    ];
                    config.multiCapabilities = brs;
                    break;
                case 'chromeffheadless':
                    var brs: any[] = [
                        {
                            "browserName": 'chrome',
                            'chromeOptions': [
                                {
                                    args: ["--headless"]
                                }
                            ]
                        }, {
                            "browserName": 'firefox',
                            'firefoxOptions': [
                                {
                                    args: ["--headless"]
                                }
                            ],
                            'moz:firefoxOptions': {
                                args: ["--headless"]
                            }
                        }
                    ];
                    break;
                case 'ffheadlessie':
                    var brs: any[] = [
                        {
                            "browserName": 'firefox',
                            'firefoxOptions': [
                                {
                                    args: ["--headless"]
                                }
                            ],
                            'moz:firefoxOptions': {
                                args: ["--headless"]
                            }
                        }, {
                            'browserName': 'internet explorer'
                        }
                    ];
                    config.multiCapabilities = brs;
                    break;
                default:
                    console.log("default browser(chrome) is configured");
                    config.capabilities.browserName = 'chrome';
            }
        } else {
            console.log("default browser(chrome) is configured");
            config.capabilities.browserName = 'chrome';
        }
        return config;
    }
}