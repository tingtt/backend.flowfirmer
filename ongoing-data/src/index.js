const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-url')


const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const PORT = process.env.PORT;
const DBHOST = process.env.DBHOST

mongoose.connect(
    DBHOST+'/test',
    {useNewUrlParser: true}
);

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


    
});


app.listen(PORT, () => {
    console.log(`FROM ONGOING-DATA: ongoing-data is listning on port` + String(PORT));
    console.log("FROM ONGOING-DATA:dbhost = "+DBHOST)
});
