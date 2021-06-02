const express = require("express");
var request = require("request");
const bodyParser = require('body-parser')
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


//
// Extracts environment variables to globals for convenience.
//

const PORT = process.env.PORT;
const LOGIN_HOST = process.env.LOGIN_HOST;
const LOGIN_PORT = parseInt(process.env.LOGIN_PORT);
const NEW_USER_REG_PATH = "/new_user_reg"
 

console.log(`Forwarding login requests to ${LOGIN_HOST}:${LOGIN_PORT}.`);


app.post("/newUserReg", (req, res) => {
    /*受け取るjson（テスト）
    {
        "name": "Mr. ノードJS",
        "password": "Kan272420",
        "email": "nodejs.example.com"
    }
    */
    console.log("getting !!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    //console.log(req.body.message)
    console.log("body の中身は："+req.body)
    let postData = req.body;
    let postDataStr = JSON.stringify(postData);


    var options = {
        uri: "http://example.com/test",
        headers: {
          "Content-type": "application/json",
        },
        json: {
          "key1": "param1",
          "key2": "param2"
        }
      };
    
    res.json({ id: 1 });
});

app.post('/login' , (req , res)=>{
    /*うけとるJson(test)
    {
        "email": "nodejs.example.com",
        "password": "Kan272420"      
    }
    */

})

//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    var now = new Date();
    var d = now.getDate();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    console.log("FROM API-GATEWAY : modfied at "+d+"日" +h+ ":"+m+":"+s);
    console.log(`FROM API-GATEWAY : api-gateway is listning on port` + String(PORT));
    console.log('FROM API-GATEWAY : HOST to send request : '+LOGIN_HOST);
    console.log('FROM API-GATEWAY : PORT to send request : '+LOGIN_PORT);
    console.log('FROM API-GATEWAY : PATH to send request : '+NEW_USER_REG_PATH);



});
