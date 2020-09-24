const tdmAPI = require('/home/dmunoz81/Desktop/TDM/tdm/utils/tdmRequestAccessToken');
const postMan = require('/home/dmunoz81/Desktop/TDM/tdm/newman');


tdmAPI.requestTDMAuthToken((error, response) => {
    if (error) {
        return console.log(error);
    }
    console.log(`requestTDMAuthToken statusCode: ${response.statusCode} \n ${response.tdmAuthToken}`);

    tdmAPI.getTDMTestDataModel(response.tdmAuthToken, (error, modelResponse) => {
        if (error) {
            return console.log(error);
        }
        console.log(`\n getTDMTestDataModel statusCode: ${modelResponse.statusCode} \n testDataModelId: ${modelResponse.testDataModelsList}`);

        tdmAPI.getTDMTestDataEnv(response.tdmAuthToken, (error, envResponse) => {
            if (error) {
                return console.log(error);
            }
            console.log(`\n getTDMTestDataEnv statusCode: ${envResponse.statusCode} \n testDataEnv Name:${envResponse.testDataEnvName} \n testDataEnv Id:  ${envResponse.testDataEnvId}`);

            tdmAPI.findTDMTestData(response.tdmAuthToken, envResponse.testDataEnvId, modelResponse.testDataModelsList, (error, findResponse) => {
                if (error) {
                    return console.log(error);
                }

                console.log(`\n findTDMTestData statusCode: ${findResponse.statusCode} \n testData User Name:${findResponse.tdmUserName}`);
            
                let username = findResponse.tdmUserName;
                
                if (!username){
                    return console.log("no user found from TDM Find and Reserve Model");
                }

                // Invoke Postman via Newman
                postMan(username);
                
            })
            
        })
    })
    
})

