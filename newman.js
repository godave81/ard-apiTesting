const newman = require('newman');
const config = require('/home/dmunoz81/Desktop/TDM/tdm/cfg/tdmConfig')

const postMan = (tdmUserName) => {

    //get Postman Collection Files, Global and Env Json files.
    let pmCollection = config.getPostManCollection();
    let pmGlobal = config.getPostManGlobal();
    let pmEnv = config.getPostManMEnv();

    //Get Digital Bank HostName
    let baseUrl = config.getDigitalBankHostName();

    // call newman.run to pass `options` object and wait for callback
    newman.run({
        collection: require(pmCollection),
        globals: require(pmGlobal),
        environment: require(pmEnv),
        globalVar: [
            { "key": "tdmUserName", "value": tdmUserName },
        ],
        envVar: [
            {"key": "baseUrl", "value": baseUrl },
        ],

        reporters: 'cli'
    },

        function (err) {
            if (err) { throw err; }
            console.log('collection run complete!');
        });
}

module.exports = postMan