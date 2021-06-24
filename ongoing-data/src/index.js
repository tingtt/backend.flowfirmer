const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-url')
var amqp = require('amqplib/callback_api');




const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.DBHOST) {
    throw new Error("Please specify the DBHOST for the HTTP server with the environment variable DBHOST.");
}

if (!process.env.RABBIT) {
    throw new Error("Please specify the QUEUE_HOST for the HTTP server with the environment variable QUEUE_HOST.");
}

const PORT = process.env.PORT;
const DBHOST = process.env.DBHOST
const RABBIT = process.env.RABBIT;

mongoose.connect(
    DBHOST+'/test',
    {useNewUrlParser: true}
);

amqp.connect(RABBIT, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'hello';
        var msg = 'Hello world';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log("ONGOING-DATA: sendding msg ====== "+msg);
    });

    setTimeout(function() {
        connection.close();
        process.exit(0)
    }, 500);


});

//以下スキーマ設計

//target内の成果リスト内のスキーマ
//targetValue: undefined,
const sampleOutcomeScheme = new Schema({
    id: Number,
    user_id: Number,
    target_id: Number,
    name: String,
    unitName: String,
    statisticsRule: String,
    defaultValue: Number
});

/*
    targetスキーマ

    childTargetList: undefined,
    parentTarget: undefined

*/
// const TargetSchema = new Schema({
//     id: Number,
//     user_id: Number,
//     name: String,
//     themeColor: String,
//     outcomeSchemes: [sampleOutcomeScheme]
// });

// /*
//     ToDoリスト用スキーマ
//     term: undefined
// */
// const ToDoSchema = new Schema({
//     id: Number,
//     user_id: Number,
//     name: String,
//     description: String,
//     startDatetimeScheduled: Date,
//     timeInfoExisted: Boolean,
//     processingTimeScheduled: Number,
//     repeatPattern: String,
//     repeatDayForWeekly: [],
//     targetList: [TargetSchema],
//     completed: true

// });

// /*
//     term用スキーマ
//     term: undefined
//     documentList: undefined
// */

// const TermSchema = new Schema({
//     id: Number,
//     user_id: Number,
//     name: String,
//     description: String,
//     targetList: [TargetSchema],
//     startDatetimeScheduled: Date,
//     endDatetimeScheduled: Date,
//     startDatetime: Date,
//     toDoList:[ToDoSchema],

// });

// const Document = new Schema({
//     id: Number,
//     user_id: Number,
//     name: String,
//     url: mongoose.SchemaTypes.Url,
//     targetList: [TargetSchema]
// })

// const sampleHabitRemind = new Schema({
//     id: Number,
//     user_id: Number,
//     name: String,
//     target: TargetSchema
// })

// const FeelingType = new Schema({
//     id: Number,
//     user_id: Number,
//     name: String,
//     defaultPositivePercent: Number,
//     defaultNegativePercent: Number
// },{timestamps : true})
// const Archive = new Schema({
//     id: Number,
//     user_id: Number,
//     refType: String,
//     ref: ToDoSchema,
//     targets: [TargetSchema],
//     outcomes:[
//         {
//             Scheme: sampleOutcomeScheme,
//             value: Number
//         }
//     ],
//     text: String,
//     feelingList:[
//         {
//             feeling: FeelingType,
//             positivePercent: Number,
//             negativePercent: Number
//         }
//     ],

//     datetime: Date

// })

app.post("/test", (req, res) => {
    /*受け取るjson（テスト）
    {
        "id":int 
    }
    */
    console.log("ONGOING-DATA:test strating!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("body の中身は："+req.body)
    let postData = req.body;
    console.log("AONGOING-DATA:newUserReg 最初取得したJson＝"+postData)
    let postDataStr = JSON.stringify(postData);
    console.log("ONGOING-DATA:newUserReg postDataStr="+postDataStr)
    var id = req.body.id
    console.log("id====="+id)

    // amqp.connect(RABBIT, function(error0, connection) {
    //     if (error0) {
    //         throw error0;
    //     }
    //     connection.createChannel(function(error1, channel) {
    //         if (error1) {
    //             throw error1;
    //         }
    //         var queue = 'hello';
    //         var msg = 'Hello world';

    //         channel.assertQueue(queue, {
    //             durable: false
    //         });

    //         channel.sendToQueue(queue, Buffer.from(msg));
    //         console.log("ONGOING-DATA: sendding msg ====== "+msg);
    //     });

    //     setTimeout(function() {
    //         connection.close();
    //         process.exit(0)
    //     }, 500);


    // });
});


app.listen(PORT, () => {
    console.log(`FROM ONGOING-DATA: ongoing-data is listning on port` + String(PORT));
    console.log("FROM ONGOING-DATA:dbhost = "+DBHOST)
});
