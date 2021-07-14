const express = require("express");
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
var request = require("request");
const moduleFordb = require('./dbmodule');

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

if (!process.env.DBPORT) {
    throw new Error("Please specify the DBHOST for the HTTP server with the environment variable DBHOST.");
}


const PORT = process.env.PORT;
const DBHOST = process.env.DBHOST
const DBPORT = parseInt(process.env.DBPORT)
const LOGIN_HOST = process.env.LOGIN_HOST;
const LOGIN_PORT = parseInt(process.env.LOGIN_PORT);
const NEW_USER_REG_PATH = "/new_user_reg";
const USER_LOGIN_PATH = "/login";


console.log(`Forwarding login requests to ${LOGIN_HOST}:${LOGIN_PORT}.`);

var jwtDecription = (id) => {
    console.log("here is inside of jwtDecription function")
    console.log(id)
    const token = id
    const jwtSecret = "secret_key_goes_here"
    var id = 0
    jwt.verify( token, jwtSecret, (err, decoded) => {
        if (err) {
            console.log( `ERROR: err.message=[${err.message}]` );
        } else {
            console.log( `OK: decoded.id=${decoded.id}` );
            id = decoded.id
        }
    });

    return id
}



// //test table select * from ... where id = 1
// async function getTestFiltter(){
//     const result = await Test.find({
//         id : 17
//     })

//     console.log("以下getTestFillterの内容")
//     console.log(result)

//     return result
// }

// async function getTestFillterAndCertainProperties(){
//     const result = await Test.find({
//         id :14, name : {$eq: "certain properties"}})

//     console.log("以下getTestFillterAndCertainPropertiesの内容");
//     console.log(result);
//     return result
// }

// //update test table where _id = id
// async function updateTest(id, json){

//     const update = await Test.findById(id);

//     if (!update) return 400

//     console.log(json.id)
//     console.log(json.name)
//     update.id = json.id;
//     update.name = json.name;

//     const result = await update.save();
//     console.log("以下updateTestの内容");
//     console.log(result);
//     return result

// }

// async function deleteTest(id){
//     const result = await Test.deleteOne({_id:id})
//     if (!result) return 400
//     console.log("以下deleteTestの内容")
//     console.log(result);
//     console.log("delete メソッド成功");
//     return result
// }

// console.log("以下saveTest excution")
// saveTest();

// console.log("以下getTest excution")
// getTest();

// console.log("getTestFiltter excution")
// getTestFiltter();

// console.log("getTestFillterAndCertainProperties excution")
// getTestFillterAndCertainProperties();

// console.log("updateTest excution")
// const jsonForUpdateTest = {"id": 200, "name": "updated successfully"}
// updateTest("60e881cbe05eb136a5ba48a0", jsonForUpdateTest);//引数に id(object id = _id: 60e696f30254fe21f25dd26e) json(変更したデータの内容)
// getTest();
// console.log("deleteTest excution");
// deleteTest("60e881cbe05eb136a5ba48a0");//引数にid (objectId)60e696f30254fe21f25dd26e
// const jsonTest = {"id":33, "name": "aaaaaaaaaaaaaaaa"}

// moduleFordb.saveTest(jsonTest).then(x => {
//     console.log("以下saveの内容")
//     console.log(x);
//     console.log(typeof(x))
//     const json = JSON.stringify(x)
    
//     console.log("一個だけ")
//     console.log(JSON.parse(json)._id)
// })


// (async () => {
//     console.log(await moduleFordb.saveTest(jsonTest))
//   })()
// const get = moduleFordb.getTestAll();
// console.log("以下findの内容")
// // (async () => {
// //     console.log(await moduleFordb.getTestAll())
// //   })()

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


app.post("/newUserReg", (req, res) => {
    /*受け取るjson（テスト）
    {
        "name": "Mr. ノードJS",
        "password": "Kan272420",
        "email": "nodejs.example.com"
    }
    */
    console.log("API-GATEWAY:newUserReg strating!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    //console.log(req.body.message)
    console.log("body の中身は："+req.body)
    let postData = req.body;
    console.log("API-GATEWAY:newUserReg 最初取得したJson＝"+postData)
    let postDataStr = JSON.stringify(postData);
    console.log("API-GATEWAY:newUserReg postDataStr="+postDataStr)
    console.log("API-GATEWAY:newUserReg forwarding to login service "+LOGIN_HOST+":"+LOGIN_PORT)


    var options = {
        uri: "http://"+LOGIN_HOST+":"+LOGIN_PORT+NEW_USER_REG_PATH,
        headers: {
          "Content-type": "application/json",
        },
        json: postData
    };

    var temp;
    request.post(options, (error, response, body) => {
        if (error) return console.log("API-GATEWAY:newUserReg post return error")
        temp = JSON.stringify(response.body)
        console.log("API-GATEWAY:newUserReg 返ってきた値="+String(temp))
        res.json(response.body)
    });
});

app.post('/login' , (req , res)=>{
    /*うけとるJson(test)
    {
        "email": "api_gateway@example.com",
        "password": "api-gateway"
    }
    */


    console.log("API-GATEWAY:login strating!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("body の中身は："+req.body)
    let postData = req.body;
    console.log("API-GATEWAY:login 最初取得したJson＝"+postData)
    let postDataStr = JSON.stringify(postData);
    console.log("API-GATEWAY:login postDataStr="+postDataStr)
    console.log("API-GATEWAY:login forwarding to login service "+LOGIN_HOST+":"+LOGIN_PORT)


    var options = {
        uri: "http://"+LOGIN_HOST+":"+LOGIN_PORT+USER_LOGIN_PATH,
        headers: {
          "Content-type": "application/json",
        },
        json: postData
    };

    var temp;
    request.post(options, (error, response, body) => {
        if (error) return console.log("API-GATEWAY:login post return error")

        temp = JSON.stringify(response.body)
        console.log("API-GATEWAY:login 返ってきた値="+String(temp))
        res.json(response.body)
    });


})


app.post('/toOngoingData' , (req , res)=>{
    /*うけとるJson(test)
    {
        "token": String
    }
    */

    console.log("toOngoingData strating!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    //console.log(req.body.message)
    const postData = req.body;
    const postDataStr = JSON.stringify(postData);
    console.log("postDataStr="+postDataStr)
    const id = jwtDecription(req.body.token)
    console.log(id)


   res.send('hello from simple server :)')

})

app.post('/saveTest' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token)
        data :{
            name : String
        }
    }
    */
    console.log("saveTest!!!!!!!!!!!");
    const postData = req.body.data;

    const id = jwtDecription(req.body.token);

    postData["id"] = id
    console.log(postData)

    moduleFordb.saveTest(postData).then(result => {
        console.log("以下saveの内容")
        console.log(result);

        const json = JSON.stringify(result);
        
        console.log("一個だけ")
        console.log(JSON.parse(json)._id)
        //登録したtableの_idを返す
        res.json({
            objectId:JSON.parse(json)._id,
            status : 200
        })
    }).catch(error =>{
        console.log("saveTest 失敗");
        console.log(error);
        res.json({
            onjectId: "",
            status: 400
        })
    });
});

app.post('/getTestbyId' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token)
    }
    */
    console.log("getTestById!!!!!!!!!!!");
    // var postData = req.body.data; 今回必要なし
    // console.log(postData)

    const id = jwtDecription(req.body.token);

    moduleFordb.getTestById(id).then(result => {
        console.log("以下getTestByIdの内容");
        console.log(result);

        const json = JSON.stringify(result);
        console.log("結果表示");
        console.log(JSON.parse(json));
        res.json({data: JSON.parse(json)});
        // res.json(JSON.parse(json));
    }).catch(error =>{
        console.log("getTestById 失敗");
        console.log(error);
        res.json({
            onjectId: "",
            status: 400
        })
    });
});

app.post('/updateTestByObjectId' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            _id : String
            id : Int,
            name : String
        }
    }
    */
    console.log("updateTestByObjectId!!!!!!!!!!!");

    const id = jwtDecription(req.body.token);

    //const postData = req.body.data;
    console.log("以下受け取ったJson")
    console.log(req.body)

    moduleFordb.updateTest(id, req.body.data._id, req.body.data)
        .then(result => {
            if (!result) return res.json({status:400, message:"dberror"})
        }).catch(error =>{
            console.log("updateTestByObjectId 失敗");
            console.log(error);
            res.json({
                status: 400,
                message: "updateTestByObjectId 失敗"
            })
        });
})



/*
予定しているrouting

insert to each mongo table
get each mongo table
update each mongo table

#### add Archive table to registry archive###


*/


app.listen(PORT, () => {
    console.log(`FROM ONGOING-DATA: ongoing-data is listning on port` + String(PORT));
    console.log("FROM ONGOING-DATA:dbhost = "+DBHOST)
});
