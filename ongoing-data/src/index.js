const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
require('mongoose-type-url')


const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const PORT = process.env.PORT;
const PORT = process.env.DBHOST

mongoose.connect(
    DBHOST+'/test',
    {useNewUrlParser: true}
);

//以下スキーマ設計

//target内の成果リスト内のスキーマ
//targetValue: undefined,
const sampleOutcomeScheme = new mongoose.Schema({
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
const TargetSchema = new mongoose.Schema({
    id: Number,
    user_id: Number,
    name: String,
    themeColor: String,
    outcomeSchemes: [sampleOutcomeScheme]
});

/*
    ToDoリスト用スキーマ
    term: undefined
*/
const ToDoSchema = new mongoose.Schema({
    id: Number,
    user_id: Number,
    name: String,
    description: String,
    startDatetimeScheduled: Date,
    timeInfoExisted: Boolean,
    processingTimeScheduled: Number,
    repeatPattern: String,
    repeatDayForWeekly: [],
    targetList: [TargetSchema],
    completed: true

});

/*
    term用スキーマ
    term: undefined
    documentList: undefined
*/

const TermSchema = new mongoose.Schema({
    id: Number,
    user_id: Number,
    name: String,
    description: String,
    targetList: [TargetSchema],
    startDatetimeScheduled: Date,
    endDatetimeScheduled: Date,
    startDatetime: Date,
    toDoList:[ToDoSchema],

});

const Document = new mongoose.Schema({
    id: Number,
    user_id: Number,
    name: String,
    url: mongoose.SchemaTypes.Url,
    targetList: [TargetSchema]
})

const sampleHabitRemind = new mongoose.Schema({
    id: Number,
    user_id: Number,
    name: String,
    target: TargetSchema
})

const FeelingType = new mongoose.Schema({
    id: Number,
    user_id: Number,
    name: String,
    defaultPositivePercent: Number,
    defaultNegativePercent: Number
})
const Archive = new mongoose.Schema({
    id: Number,
    user_id: Number,
    refType: String,
    ref: ToDoSchema,
    targets: [TargetSchema],
    outcomes:[
        {
            Scheme: sampleOutcomeScheme,
            value: Number
        }
    ],
    text: String,
    feelingList:[
        {
            feeling: FeelingType,
            positivePercent: Number,
            negativePercent: Number
        }
    ],

    datetime: Date

})

app.post("/newUserReg", (req, res) => {
    /*受け取るjson（テスト）
    {
        "name": "Mr. ノードJS",
        "password": "Kan272420",
        "email": "nodejs.example.com"
    }
    */
    console.log("ONGOING-DATA:test strating!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("body の中身は："+req.body)
    let postData = req.body;
    console.log("AONGOING-DATA:newUserReg 最初取得したJson＝"+postData)
    let postDataStr = JSON.stringify(postData);
    console.log("ONGOING-DATA:newUserReg postDataStr="+postDataStr)


    
});


app.listen(PORT, () => {
    console.log(`FROM ONGOING-DATA: ongoing-data is listning on port` + String(PORT));
    console.log("FROM ONGOING-DATA:dbhost = "+DBHOST)
});
