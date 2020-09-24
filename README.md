# ard-apiTesting
Framework to automate API Tests with Broadcom ARD TDM and Postman

#Depedencies
Download latest Node JS https://nodejs.org/en/download/
Download latest Postman Desktop https://www.postman.com/downloads/ and Newman CLI https://www.npmjs.com/package/newman
Download Broadcom TDM 4.8 or higher
Download Broadcom ARD 3.0 or higher

#Install Node JS Dependencies 
$ npm install
$ touch .env
$ vi .env

# Configure Env Variables.
TDM_URL=  // base tdm base Url ** <http://<HOST>:8080
TDM_USERNAME= // TDM username
TDM_PASSWORD= //TDM password
TDM_PROJECTID=  //TDM Project Id. numeric
TDM_VERSIONID=  //TDM Version Id. numeric
POSTMAN_COLLECTION= //Postman Collection Name <json>
POSTMAN_ENV_VARS=  // Postman Env Variables
POSTMAN_GLOBAL_VARS= //Postman Global File
POSTMAN_DIR= // Postman Folder path.
DIGITAL_BANK_URL= // Digital Bank Application under Test Hostname.

# Execute
  $ npm tdm.js
