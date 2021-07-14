const mongoose = require("mongoose");
require('mongoose-type-url')


const DBHOST = process.env.DBHOST//Mongoのip address
const DBPORT = parseInt(process.env.DBPORT)//Mongo のport番号

//mongoDB に接続
mongoose.connect('mongodb://test:test@'+DBHOST+':'+DBPORT+'/test',{useNewUrlParser: true})
.then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err));



//以下スキーマ設計

//target内の成果リスト内のスキーマ
//targetValue: undefined,
// const sampleOutcomeScheme = new Schema({
//     id: Number,
//     user_id: Number,
//     target_id: Number,
//     name: String,
//     unitName: String,
//     statisticsRule: String,
//     defaultValue: Number
// });

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
            themeColor : String,

            outcomes : [{
                objectId : String,
                usreId : Number,
                targetId : String,
                name : String,
                unitName : String,
                statisticsRule : String,
                defaultValue : Number
            }],

            pinnedAtNavigationList : Boolean,
            hiddenAtNavigationList : Boolean

        });
        
        const target = mongoose.model('targets', targetSchema)

        return target

    }

    // documentModel(){
    //     /*
    //     uri : String のほうがいい？
    //     tergetList [targetSchema] 注意事項 at 162 
    //     */
    //     const documentSchema = new mongoose.Schema({
    //         userId : Number,
    //         name : String,
    //         uri : mongoose.SchemaTypes.Url,
    //         targetList : [{
    //             objectId : String,
    //             userId : Number,
    //             name : String,
    //             themeColor : String,

    //             outcomes : [{
    //                 objectId : String,
    //                 usreId : Number,
    //                 targetId : String,
    //                 name : String,
    //                 unitName : String,
    //                 statisticsRule : String,
    //                 defaultValue : Number
    //             }],

    //             pinnedAtNavigationList : Boolean,
    //             hiddenAtNavigationList : Boolean
    //         }]

    //     })

    //     const document = mongoose.model('test', documentSchema)

    //     return document
    // }

    // termModel(){
    //     /*
    //     targetList => targetSchema({})

    //     */
    //     const termSchema = new mongoose.Schema({
    //         usrId : Number,
    //         name : String,
    //         description : String,

    //         targetList : [{
    //             objectId : String,
    //             userId : Number,
    //             name : String,
    //             themeColor : String,

    //             outcomes : [{
    //                 objectId : String,
    //                 usreId : Number,
    //                 targetId : String,
    //                 name : String,
    //                 unitName : String,
    //                 statisticsRule : String,
    //                 defaultValue : Number
    //             }],

    //             pinnedAtNavigationList : Boolean,
    //             hiddenAtNavigationList : Boolean
    //         }],

    //         startDatetimeScheduled: Date,
    //         endDatetimeScheduled: Date,
    //         startDatetime: Date,

    //         documentList: [{
    //             objectId : String,
    //             userId : Number,
    //             name : String,
    //             uri : mongoose.SchemaTypes.Url,
    //             targetList : [{
    //                 objectId : String,
    //                 userId : Number,
    //                 name : String,
    //                 themeColor : String,

    //                 outcomes : [{
    //                     objectId : String,
    //                     usreId : Number,
    //                     targetId : String,
    //                     name : String,
    //                     unitName : String,
    //                     statisticsRule : String,
    //                     defaultValue : Number
    //                 }],

    //                 pinnedAtNavigationList : Boolean,
    //                 hiddenAtNavigationList : Boolean
    //             }]
    //         }]

    //     })

    //     const term = mongoose.model('test', targetSchema)

    //     return term
    // }

    // todoModel(){
    //     const todoSchema = mongoose.Schema({
    //         userId : Number,
    //         name : String,
    //         startDatetimeScheduled : Date,
    //         processingTimeScheduled : Number,
    //         repeatPattern : String,
    //         repeatDayForWeekly : [],
    //         targetList : [],
    //         term : [],
    //         completed : Boolean

    //     })

    //     const todo = mongoose.model('test', todoSchema)

    //     return todo
    // }

    // /*
    // target の所String に変更
    // */
    // habitsRemindModel(){
    //     const habitsRemindSchema = mongoose.Schema({
    //         userId : Number,
    //         name : String,
    //         target : String
    //     })
    // }
}