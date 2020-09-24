require('dotenv').config();
const path = require('path');

const dirPath = path.resolve(process.env.POSTMAN_DIR); // returns directory absolute path

module.exports  = {

    //get Credentials
    getTDMConfigUrl: function () {
        return process.env.TDM_URL; // base tdm base Url ** <http://<HOST>:8080
    },

    getTDMConfigUserName: function () {
        return process.env.TDM_USERNAME; // TDM username
    },

    getTDMConfigPassword: function () {
        return process.env.TDM_PASSWORD; //TDM password
    },

    getTDMBasicToken: function () { /* Convert String to Base 64 */
        
        let credentials = this.getTDMConfigUserName() + ":" + this.getTDMConfigPassword();
        let buffer = Buffer.from(credentials);

        let tdmBasicToken = buffer.toString('base64', 'utf-8');
        return tdmBasicToken;
    },

    getTDMProjectId: function () {
        return process.env.TDM_PROJECTID; //TDM Project Id. numeric
    },

    getTDMVersionId: function () {
        return process.env.TDM_VERSIONID; //TDM Version Id. numeric
    },

    getPostManCollection: function() {
        return path.join(dirPath, process.env.POSTMAN_COLLECTION); //Postman Collection Name
    },

    getPostManMEnv: function() {
        return path.join(dirPath, process.env.POSTMAN_ENV_VARS); // Postman Env Variables
    },

    getPostManGlobal: function () {  
        return path.join(dirPath, process.env.POSTMAN_GLOBAL_VARS); //Postman Global File
    },

    getDigitalBankHostName: function () {
        return process.env.DIGITAL_BANK_URL; // Digital Bank URL
    }
};