const models = require('./models')
const model = new models();
const Test = model.testModel();
const Target = model.targetModel();



//insert to Test collection
exports.saveTest = async (jsonForSaveTest)=>{
    const test = new Test(jsonForSaveTest)

    const result = await test.save();//

    // if(!result) return 400 false のほうがいいかも

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

    // const update = await Test.findById(objectId);
    const update = await Test.find({
        _id: objectId,
        id: id,
    });

    if (!update) return false

    // console.log(json.id)
    // console.log(json.name)
    update.name = json.name

    const result = await update.save();

    return result

}

//insert to Target collection
exports.saveTarget = async (jsonForSaveTarget)=>{
    const target = new Target(jsonForSaveTarget)

    const result = await target.save();//

    // if(!result) return 400 false のほうがいいかも

    return result
}


// exports.getTestFiltter = async ()=>{
    
// }