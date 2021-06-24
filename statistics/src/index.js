const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
var amqp = require('amqplib/callback_api');
const Schema = mongoose.Schema;


if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.DBHOST) {
    throw new Error("Please specify the DBHOST for the HTTP server with the environment variable DBHOST.");
}

if (!process.env.RABBIT) {
    throw new Error("Please specify the QUEUE_HOST for the HTTP server with the environment variable QUEUE_HOST.");
}

//環境変数取得
const PORT = process.env.PORT;
const DBHOST = process.env.DBHOST
const RABBIT = process.env.RABBIT;

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//rabbit からメッセージ取得（テスト） 
amqp.connect(RABBIT, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log("FROM STATISTICS: getting queue ====== "+queue);

        channel.consume(queue, function(msg) {
            console.log("FROM STATISTICS: message ===== ", msg.content.toString());
        }, {
            noAck: true
        });

    });
});



app.post("/test", (req, res) => {
    /*受け取るjson（テスト）
    {
        "id":int 
    }
    */
    console.log("STATISTICS:test strating!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("body の中身は："+req.body)
    let postData = req.body;
    console.log("STATISTICS:newUserReg 最初取得したJson＝"+postData)
    let postDataStr = JSON.stringify(postData);
    console.log("STATISTICS:newUserReg postDataStr="+postDataStr)
    var id = req.body.id
    console.log("id====="+id)  
});


app.listen(PORT, () => {
    console.log(`FROM STATISTICS: statistics is listning on port` + String(PORT));
    console.log("FROM STATISTICS:dbhost = "+DBHOST)
});
