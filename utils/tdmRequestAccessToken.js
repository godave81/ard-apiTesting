const needle = require('needle');
const config = require('/home/dmunoz81/Desktop/TDM/tdm/cfg/tdmConfig')


const tdmBaseUrl = config.getTDMConfigUrl();
const tdmBasicToken = config.getTDMBasicToken();
const tdmProjectId = config.getTDMProjectId();
const tdmVersionId = config.getTDMVersionId();

module.exports = {

    //Request TDM Token - Login with credentials and receive a security token
    requestTDMAuthToken: (callback) => {

        var tdmAuthEndPoint = {
            url: tdmBaseUrl.concat('/TestDataManager/user/login'),
            rejectUnauthorized: false, // Disable SSL Check or NODE_TLS_REJECT_UNAUTHORIZED=0
            headers: { 'Content-Type': 'application/json', 'Accept': '*/*', 'Authorization': 'Basic ' + tdmBasicToken },
            isJson: { json: true }
        };


        needle.post(tdmAuthEndPoint.url, "", tdmAuthEndPoint, (error, response) => {
            if (error) {
                callback('Unable to connect to TDM Login Service!');
            }

            else if (!error && response.statusCode == 200) {
                callback(undefined, {
                    tdmAuthToken: response.body.token,
                    statusCode: response.statusCode
                })
            }

            else {
                callback('ERROR' + response.body.errorCode);
            }

        }) // end Needle POST

    }, // end requestTDMAuthToken

    // test-data-model-controller : Interface for Test Data Models
    getTDMTestDataModel: (tdmAuthToken, callback) => {

        //Get TDM test data models.
        var tdmTestDataModelEndPoint = {
            url: tdmBaseUrl.concat('/TDMDataReservationService/api/ca/v1/testDataModels?projectId=').concat(tdmProjectId).concat('&versionId=').concat(tdmVersionId),
            headers: { 'Accept': '*/*', 'Authorization': 'Bearer ' + tdmAuthToken },
            isJson: { json: true }
        };


        needle.get(tdmTestDataModelEndPoint.url, tdmTestDataModelEndPoint, (error, response) => {
            if (error) {
                callback('Unable to connect to TDM Test Data Model Service!');
            }

            else if (!error && response.statusCode == 200) {

                callback(undefined, {
                    testDataModelsList: response.body.testDataModelsList[0].id,
                    statusCode: response.statusCode
                })
            }

            else {
                callback('ERROR' + response.body.errorCode);
            }
        }) // end needle tdmTestDataModelEndPoint
    },  // end getTDMTestDataModel

    // Interface for getting all TDM Find and Reserve environments
    getTDMTestDataEnv: (tdmAuthToken, callback) => {

        //Get TDM test data models.
        var tdmTestDataEnvEndPoint = {
            url: tdmBaseUrl.concat('/TDMDataReservationService/api/ca/v1/environments?projectId=').concat(tdmProjectId).concat('&versionId=').concat(tdmVersionId),
            headers: { 'Content-Type': 'application/json', 'Accept': '*/*', 'Authorization': 'Bearer ' + tdmAuthToken },
            isJson: { json: true }
        };

        needle.get(tdmTestDataEnvEndPoint.url, tdmTestDataEnvEndPoint, (error, response) => {
            if (error) {
                callback('Unable to connect to TDM Test Data ENV Service!');
            }

            else if (!error && response.statusCode == 200) {

                callback(undefined, {
                    testDataEnvId: response.body.elements[0].id,
                    testDataEnvName: response.body.elements[0].name,
                    statusCode: response.statusCode
                })
            }

            else {
                callback('ERROR' + response.body.errorCode);
            }
        }) // end needle tdmTestDataEnvEndPoint

    }, //  end getTDMTestDataEnve


    findTDMTestData: (tdmAuthToken, testDataEnvId, testDataModelsList, callback) => {

        var requestBody = JSON.stringify({ "environmentId": testDataEnvId, "numberOfRecordsRequired": 10, "includeReservedRecords": false, "startAfterValues": {}, "showReservedRecords": false, "filters": [{ "fieldId": 14, "values": ["1"], "operator": "EQUALS" }, { "fieldId": 15, "values": ["1"], "operator": "EQUALS" }, { "fieldId": 12, "values": ["1"], "operator": "EQUALS" }, { "fieldId": 10, "values": ["1"], "operator": "EQUALS" }, { "values": ["ROLE_USER"], "fieldId": 21, "operator": "IN_VALUES" }] })

        //TDM Find EndPoint
        var tdmFindEndPoint = {
            method: 'POST',
            url: tdmBaseUrl.concat('/TDMDataReservationService/api/ca/v1/testDataModels/').concat(testDataModelsList).concat('/actions/find?projectId=').concat(tdmProjectId).concat("&versionId=").concat(tdmVersionId),
            headers: { 'Content-Type': 'application/json', 'Accept': '*/*', 'Authorization': 'Bearer ' + tdmAuthToken },
            isJson: { json: true }
        };

        needle.post(tdmFindEndPoint.url, requestBody, tdmFindEndPoint, (error, response) => {
            if (error) {
                callback('Unable to connect to TDM Test Data FIND Service!');
            }

            else if (!error && response.statusCode == 200) {

                callback(undefined, {
                    tdmUserName: response.body.records[0].columnValues.username,
                    statusCode: response.statusCode
                })
            }

            else {
                callback('ERROR ' + response.body.errorMsg);
            }

        }) // end needle tdmFindEndPoint

    }

} // module.exports