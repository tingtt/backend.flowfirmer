const mongoose = require("mongoose");
require('mongoose-type-url')


const DBHOST = process.env.DBHOST//Mongoのip address
const DBPORT = parseInt(process.env.DBPORT)//Mongo のport番号

//mongoDB に接続
mongoose.connect('mongodb://test:test@'+DBHOST+':'+DBPORT+'/test',{useNewUrlParser: true})
.then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err));


//各mongoコレクションのスキーマを設定する　used in ./module.js
module.exports = class models{
    //コレクションtest 用のスキーマを返すメソッド
    testModel() {
        //スキーマ設計
        const testSchema = new mongoose.Schema({
            id : Number,
            name : String
        });
        const test = mongoose.model('test', testSchema)
        return test
    }

    targetModel(){
        /*
        outcomeSchemes => outcomes

        ー未実装ー
        childTargetList: undefined
        parentTarget: undefined
        */
        const targetSchema = new mongoose.Schema({
            userId : Number,
            name : String,
            outcomes : [{
                name : String,
                unitName : String,
                statisticsRule : String,
                defaultValue : Number,
                targetValue: Number
            }],
            pinnedAtNavigationList : Boolean,
            hiddenAtNavigationList : Boolean,
            themeColor: {
                r: Number,
                g: Number,
                b: Number
            }

        });
        const target = mongoose.model('targets', targetSchema)
        return target
    }

    documentModel(){
        const documentSchema = new mongoose.Schema({
            userId : Number,
            name : String,
            uri : String,
            targetId : String
        })
        const document = mongoose.model('documents', documentSchema)
        return document
    }

    termModel(){
        /*
        targetList => targetSchema({})
        */
        const termSchema = new mongoose.Schema({
            userId : Number,
            name : String,
            description : String,
            targetList : [],
            startDatetimeScheduled: Date,
            endDatetimeScheduled: Date,
            startDatetime: Date,
            endDatetime: Date
        })
        const term = mongoose.model('terms', termSchema)
        return term
    }

    todoModel(){
        const todoSchema = new mongoose.Schema({
            userId : Number,
            name : String,
            startDatetimeScheduled : Date,
            timeInfoExisted : Boolean,
            processingTimeScheduled : Number,
            repeatPattern : String,
            repeatDayForWeekly : [],
            targetList : [],
            term : String,
            completed : Boolean,
            archived: Boolean,
            description: String,
            repeatDateForMonthly: Number,
            checkInDateTime: Date
        })
        const todo = mongoose.model('todos', todoSchema)
        return todo
    }

    habitModel(){
        const habitSchema = new mongoose.Schema({
            userId : Number,
            name : String,
            target : String
        })
        const habit = mongoose.model('habits', habitSchema)
        return habit
    }

    todoArchiveModel(){
        
        const todoArchiveSchema = new mongoose.Schema({
            userId: Number,
            todoId: String,
            checkInDateTime: Date,
            targets: [],
            statistics: {}
        })
        const todoArchive = mongoose.model('todoArchives', todoArchiveSchema)
        return todoArchive
    }
    /*

    */

    //ダッシュボードで表示する統計データ（成果、outcome）用のスキーマ
    outcomeArchiveModel(){
        const outcomeArchiveSchema = new mongoose.Schema({
            userId: Number,
            refType: String,
            refId: String,
            outcomeId: String,
            value: Number,
            checkInDateTime: Date,
        })
        const outcomeArchive = mongoose.model('outcomeArchives', outcomeArchiveSchema)
        return outcomeArchive
    }

    feelingAndDiaryArchiveModel(){
        const feelingAndDiaryArchiveSchema = new mongoose.Schema({
            userId: Number,
            refType: String,
            refId: String,
            textForDiary: String,
            positiveValue: Number,
            negativeValue: Number,
            checkInDateTime: Date,
            diaryFlag: Boolean,
            feelingFlag: Boolean
        })

        const feelingAndDiaryArchive = mongoose.model('feelingAndDiaryArchives', feelingAndDiaryArchiveSchema)
        return feelingAndDiaryArchive
    }
}

/*
todo archive 

habit archive

diary
*/