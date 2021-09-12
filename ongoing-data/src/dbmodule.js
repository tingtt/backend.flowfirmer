const { json } = require('body-parser');
const models = require('./models')
const model = new models();
const Test = model.testModel();
const Target = model.targetModel();
const Document = model.documentModel();
const Term = model.termModel();
const Todo = model.todoModel();
const Habit = model.habitModel();
const TodoArchive = model.todoArchiveModel();
const OutcomeArchive = model.outcomeArchiveModel();
const FeelingAndDiaryArchive = model.feelingAndDiaryArchiveModel();

//insert to Test collection

/*
こいつ削除予定
*/
exports.checkNullTest = async (id, objectId)=>{
    const result = await Test.find({
        id: id,
        _id: objectId
    })

    return result
}


exports.saveTest = async (jsonForSaveTest)=>{
    const test = new Test(jsonForSaveTest)
    const result = await test.save();//
    return result
}

//get all data from Test collection
exports.getTestById = async (id)=>{
    const result = await Test.find({
        id : id
    })
    return result
}

//update test table where _id = id
exports.updateTest = async (id, objectId, json)=>{
    const update = await Test.updateOne({_id: objectId,id: id},{
        $set: {
            name : json.name
        }

    });
    return update
}


exports.deleteTest = async (id, objectId) =>{
    const result= await Test.deleteOne({
        _id: objectId,
        id: id
    })
    return result
}

//insert to Target collection
exports.saveTarget = async (jsonForSaveTarget)=>{
    const target = new Target(jsonForSaveTarget)
    const result = await target.save();//
    return result
}

exports.getTargetByUserId = async (id)=>{
    const result = await Target.find({
        userId : id
    })
    return result
}

exports.getTargetByOutcomeId = async (id) => {
    const result = await Target.findOne({
        'outcomes._id': id
    });
    return result;
};

exports.updateTargetByObjectId = async (id, json)=>{
    const update = await Target.updateOne({_id: json._id,userId: id},{
        $set: {
            name: json.name,
            outcomes: json.outcomes,
            pinnedAtNavigationList: json.pinnedAtNavigationList,
            hiddenAtNavigationList: json.hiddenAtNavigationList,
            themeColor: json.themeColor
        }
    });
    return update
}

exports.updateOnlyOutcomesInTargetByObjectId = async (id, json)=>{
    const update = await Target.updateOne({_id: json._id, userId: id},{
        $set: {
            outcomes: json.outcomes
        }
    })
}

exports.deleteTargetByObjectId = async (id, objectId)=> {
    const result= await Target.deleteOne({
        _id: objectId,
        userId: id
    })
    return result
}

exports.saveDocument = async (json) => {
    const document = new Document(json)
    const result = document.save();
    return result
}

exports.getDocumentByUserId = async (id) => {
    const result = await Document.find({
        userId: id
    })
    return result
}

exports.updateDocumentByObjectId = async (id, json)=> {
    const update = await Document.updateOne({_id: json._id, userId: id},{
        $set: {
            name : json.name,
            uri : json.uri,
            targetId : json.targetId
        }
    })
    return update
}

exports.deleteDocumentByObjectId = async (id, objectId)=>{
    const result = await Document.deleteOne({
        _id: objectId,
        userId: id
    })
    return result
}

exports.saveTerm = async (json) => {
    const term = new Term(json)
    const result = term.save();
    return result
}

exports.getTermByUserId = async (id) => {
    const result = await Term.find({
        userId: id
    })
    return result
}

exports.updateTermByObjectId = async (id, json) => {
    const update = await Term.updateOne({_id: json._id, userId: id},{
        $set: {
            name: json.name,
            description: json.description,
            startDatetimeScheduled: json.startDatetimeScheduled,
            endDatetimeScheduled: json.endDatetimeScheduled,
            startDatetime: json.startDatetime,
            targetList: json.targetList,
            endDatetime: json.endDatetime       
        }
    })
    return update
}

exports.deleteTermByObjectId = async (id, objectId)=>{
    const result = await Term.deleteOne({
        _id: objectId,
        userId: id
    })
    return result
}

exports.saveTodo = async (json) => {
    const todo = new Todo(json)
    const result = todo.save();
    return result
}

exports.getTodoByUserId = async (id) => {
    const result = await Todo.find({
        userId: id
    })
    return result
}

exports.updateTodoByObjectId = async (id, json) => {
    const update = await Todo.updateOne({_id: json._id, userId: id},{
        $set: {
            name: json.name,
            startDatetimeScheduled: json.startDatetimeScheduled,
            timeInfoExisted: json.timeInfoExisted,
            processingTimeScheduled: json.processingTimeScheduled,
            repeatPattern: json.repeatPattern,
            repeatDayForWeekly: json.repeatDayForWeekly,
            targetList: json.targetList,
            term: json.term,
            completed: json.completed,
            archived: json.archived,
            description: json.description,
            repeatDateForMonthly: json.repeatDateForMonthly,
            checkInDateTime: json.checkInDateTime
        }
    })
    return update
}

exports.deleteTodoByObjectId = async (id, objectId) => {
    const result = await Todo.deleteOne({
        _id: objectId,
        userId: id
    })
    return result
}

exports.saveHabit = async (json) => {
    const habit = new Habit(json)
    const result = habit.save();
    return result
}

exports.getHabitByUserId = async (id) => {
    const result = await Habit.find({
        userId: id
    })
    return result
}

exports.updateHabitByObjectId = async (id, json) => {
    const update = await Habit.updateOne({_id: json._id, userId: id},{
        $set: {
            name: json.name,
            target: json.target
        }
    })
    return update
}

exports.deleteHabitByObjectId = async (id, objectId) => {
    const result = await Habit.deleteOne({
        _id: objectId,
        userId: id
    })
    return result
}

//TodoArchive保存用のモジュール
exports.saveTodoArchive = async (json) => {
    const todoArchive = new TodoArchive(json)
    const result = todoArchive.save();
    return result
}

//todoarchive一覧をuserIdごとに取得するモジュール
exports.getTodoArchiveByUserId = async (id) => {
    const result = await TodoArchive.find({
        userId: id
    })
    return result
}

//すでにtodoArchiveが登録されているか確認するためのモジュール
//登録されていない場合"[]"を返す
exports.getTodoArchiveByUserIdAndTodoId = async (id, todoId) => {
    const result = await TodoArchive.find({
        userId: id,
        todoId: todoId
    })
    return result
}

//todoArcives のkey statisticの値をupdateするモジュール
exports.updateStaisticsOfTodoArchive = async (id, todoId, statisticsData) => {
    const update = await TodoArchive.updateOne({userId: id, todoId: todoId},{
        $set: {
            statistics: statisticsData
        }
    })
    return update
}

//TodoArchiveを_idごとに削除
exports.deleteTodoArchiveByObjectId = async (id, objectId) => {
    const result = await TodoArchive.deleteOne({
        _id: objectId,
        userId: id
    })
    return result
}

//oucomeArchive にデータを保存
exports.saveOutcomeArchive = async (json) => {
    const outcomeArchive = new OutcomeArchive(json)
    const result = outcomeArchive.save();
    return result
}
//feelingArchive にデータを保存
exports.saveFeelingAndDiaryArchive = async (json) => {
    const feelingAndDiaryArchive = new FeelingAndDiaryArchive(json)
    const result = feelingAndDiaryArchive.save();
    return result
}

//test 用　outcomeArchive取得
exports.getOutcomeArchive = async (id) => {
    const result = await OutcomeArchive.find({
        userId: id
    })
    return result
}
////test 用　feelingArchive取得
exports.getFeelingAndDiaryArchive = async (id) => {
    const result = await FeelingAndDiaryArchive.find({
        userId: id
    })
    return result
}

exports.getOutcomeArchiveByCroup = async (id) => {
    const result = await OutcomeArchive.aggregate.group({
        _id: $outcomeId
    })
    return result
}

exports.getFeelingArchive = async (id) => {
    const result = await FeelingAndDiaryArchive.find({
        userId: id
    },'positiveValue negativeValue checkInDateTime').sort({checkInDateTime: 1})
    return result
}

