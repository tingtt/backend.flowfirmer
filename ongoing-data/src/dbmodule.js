const { json } = require('body-parser');
const models = require('./models')
const model = new models();
const Test = model.testModel();
const Target = model.targetModel();
const Document = model.documentModel();
const Term = model.termModel();
const Todo = model.todoModel();
const Habit = model.habitModel();

//insert to Test collection
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

exports.updateTargetByObjectId = async (id, json)=>{
    const update = await Target.updateOne({_id: json._id,userId: id},{
        $set: {
            name: json.name,
            themeColor: json.themeColor,
            outcomes: json.outcomes,
            pinnedAtNavigationList: json.pinnedAtNavigationList,
            hiddenAtNavigationList: json.hiddenAtNavigationList
        }
    });
    return update
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
            targetList: json.targetList       }
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
            completed: json.completed
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


// exports.getTestFiltter = async ()=>{
    
// }