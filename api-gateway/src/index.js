const express = require("express");
var request = require("request");
const bodyParser = require('body-parser');
const { Error } = require("mongoose");
const jwt = require('jsonwebtoken')
require("date-util")


const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//
// Throws an error if the any required environment variables are missing.
//

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.LOGIN_HOST) {
    throw new Error("Please specify the host name for the login microservice in variable LOGIN_HOST.");
}

if (!process.env.LOGIN_PORT) {
    throw new Error("Please specify the port number for the login microservice in variable LOGIN_PORT.");
}

if (!process.env.ONGOING_DATA_PORT){
    throw new Error("Please specify the port number for the ongoing-data microservice in variable ONGOING_DATA_PORT")
}

if (!process.env.ONGOING_DATA_HOST) {
    throw new Error("Please specify the host name for the ONGOING-DATA  microservice in variable ONGOING_DATA_HOST.");
}

//
// Extracts environment variables to globals for convenience.
//

const PORT = process.env.PORT;
const LOGIN_HOST = process.env.LOGIN_HOST;
const LOGIN_PORT = parseInt(process.env.LOGIN_PORT);
const NEW_USER_REG_PATH = "/new_user_reg";
const USER_LOGIN_PATH = "/login";
const ONGOING_DATA_HOST = process.env.ONGOING_DATA_HOST;
const ONGOING_DATA_PORT = parseInt(process.env.ONGOING_DATA_PORT);

 

console.log(`Forwarding login requests to ${LOGIN_HOST}:${LOGIN_PORT}.`);


app.post("/newUserReg", (req, res) => {
    /*受け取るjson（テスト）
    {
        "name": "Mr. ノードJS",
        "password": "Kan272420",
        "email": "nodejs.example.com"
    }
    */
    console.log("API-GATEWAY:newUserReg strating!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    //console.log(req.body.message)
    console.log("body の中身は："+req.body)
    let postData = req.body;
    console.log("API-GATEWAY:newUserReg 最初取得したJson＝"+postData)
    let postDataStr = JSON.stringify(postData);
    console.log("API-GATEWAY:newUserReg postDataStr="+postDataStr)
    console.log("API-GATEWAY:newUserReg forwarding to login service "+LOGIN_HOST+":"+LOGIN_PORT)


    var options = {
        uri: "http://"+LOGIN_HOST+":"+LOGIN_PORT+NEW_USER_REG_PATH,
        headers: {
          "Content-type": "application/json",
        },
        json: postData
    };

    var temp;
    request.post(options, (error, response, body) => {
        if (error) return console.log("API-GATEWAY:newUserReg post return error")
        temp = JSON.stringify(response.body)
        console.log("API-GATEWAY:newUserReg 返ってきた値="+String(temp))
        res.json(response.body)
    });
});

app.post('/login' , (req , res)=>{
    /*うけとるJson(test)
    {
        "email": "api_gateway@example.com",
        "password": "api-gateway"
    }
    */


    console.log("API-GATEWAY:login strating!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("body の中身は："+req.body)
    let postData = req.body;
    console.log("API-GATEWAY:login 最初取得したJson＝"+postData)
    let postDataStr = JSON.stringify(postData);
    console.log("API-GATEWAY:login postDataStr="+postDataStr)
    console.log("API-GATEWAY:login forwarding to login service "+LOGIN_HOST+":"+LOGIN_PORT)


    var options = {
        uri: "http://"+LOGIN_HOST+":"+LOGIN_PORT+USER_LOGIN_PATH,
        headers: {
          "Content-type": "application/json",
        },
        json: postData
    };

    var temp;
    request.post(options, (error, response, body) => {
        if (error) return console.log("API-GATEWAY:login post return error")

        temp = JSON.stringify(response.body)
        console.log("API-GATEWAY:login 返ってきた値="+String(temp))
        res.json(response.body)
    });


})

app.post('/toOngoingData' , (req , res)=>{
    /*うけとるJson(test)
    {
        "token": String
    }
    */

    console.log("API-GATEWAY:newUserReg strating!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    //console.log(req.body.message)
    let postData = req.body;
    console.log("API-GATEWAY:newUserReg 最初取得したJson＝"+postData)
    let postDataStr = JSON.stringify(postData);
    console.log("API-GATEWAY:newUserReg postDataStr="+postDataStr)
    console.log("API-GATEWAY:newUserReg forwarding to login service "+LOGIN_HOST+":"+LOGIN_PORT)



   res.send('hello from simple server :)')

})

//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`FROM API-GATEWAY : api-gateway is listning on port` + String(PORT));
    console.log('FROM API-GATEWAY : HOST to send request : '+LOGIN_HOST);
    console.log('FROM API-GATEWAY : PORT to send request : '+LOGIN_PORT);
    console.log('FROM API-GATEWAY : PATH to send request : '+NEW_USER_REG_PATH);



});
