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

/*
配列内が空か判断するコード関数にする予定
*/
const testArray = []
console.log(testArray)
if (!testArray.length) {
    console.log("a")
}else{
    console.log("b")
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
    const id = jwtDecription(req.body.token);
    console.log("以下受け取ったJson")
    console.log(req.body)

    moduleFordb.updateTest(id, req.body.data._id, req.body.data)
        .then(result => {
            console.log("以下updateTestByObjectIdnoの結果")
            console.log(result)
            res.json({
                status: 200,
                messaeg: "変更を適用できました！"
            })
        }).catch(error =>{
            console.log("updateTestByObjectId 失敗");
            console.log(error);
            res.json({
                status: 400,
                message: "変更を適用できませんでした"
            })
        });
});

app.post('/deleteTestByObjectId' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            _id : String
        }
    }
    */
    console.log("deleteTestByObjectId");
    const id = jwtDecription(req.body.token);

    console.log("以下受け取ったJson")
    console.log(req.body)

    moduleFordb.deleteTest(id, req.body.data._id).then(result => {
        console.log("以下deleteTestの結果")
        console.log(result);

        res.json({
            status: 200,
            messaeg: "変更を適用できました！"
        })
    }).catch(error =>{
        console.log("deleteTestByObjectId 失敗");
        console.log(error);

        res.json({
            status: 200,
            messaeg: "削除できませんでした！"
        })
    });

})
//id こっちで追加
app.post('/saveTarget' , (req , res)=>{
    /*
    受け取るJson
    {
        token: String
        data : {
            id はこっちで追加
            name : String,
            themeColor : String,

            outcomes : [{
                name : String,
                unitName : String,
                statisticsRule : String,
                defaultValue : Number
            }],

            pinnedAtNavigationList : Boolean,
            hiddenAtNavigationList : Boolean
        }

    }
    */
    console.log("saveTarget!!")
    console.log("以下受けっとったJson")
    console.log(req.body)
    //data.id 追加忘れない！！！！！！！！！！！！！！
    const id = jwtDecription(req.body.token);
    req.body.data['userId'] = id
    moduleFordb.saveTarget(req.body.data).then(result =>{
        console.log("以下saveTargetの内容")
        console.log(result)

        res.json({
            objectId:result._id,
            status : 200,
            message : "成功"
        })

    }).catch(error => {
        res.json({
            objectId: "",
            status: 400,
            message: error
        })
    })
})

app.post('/getTarget' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token)
    }
    */
    console.log("getTargetByUserId!!!!!!!!!!!");

    const id = jwtDecription(req.body.token);

    moduleFordb.getTargetByUserId(id).then(result =>{
        console.log("以下getTargetByUserIdの結果")
        console.log(result)

        res.json({
            status: 200,
            message: "取得成功",
            data : result       
        })
    }).catch(error => {
        console.log("getTargetByUserId")
        console.log(error)
        res.json({
            status: 400,
            message: "取得失敗",   
        })
    })


})

app.post('/updateTarget' , (req , res)=>{
    /*
    受け取るJson
    {
        token: String
        data : {
            userId : Int
            _id : String
            name : String,
            themeColor : String,

            outcomes : [{
                name : String,
                unitName : String,
                statisticsRule : String,
                defaultValue : Number
            }],

            pinnedAtNavigationList : Boolean,
            hiddenAtNavigationList : Boolean
        }
    }
    */

    const id = jwtDecription(req.body.token);
    console.log("以下受け取ったJson")
    console.log(req.body)
    // amountOfOutcome = req.data.outcomes.length
    

    moduleFordb.updateTargetByObjectId(id, req.body.data)
        .then(result => {
            console.log("以下updateTargetの内容")
            console.log(result)
            res.json({
                status: 200,
                messaeg: "変更を適用できました！"
            })
        }).catch(error => {
            console.log("updateTarget失敗")
            console.log(error)

            res.json({
                status: 400,
                message: "変更を適用に失敗しました"
            })
        })
})

app.post('/deleteTarget' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            _id : String
        }
    }
    */
   console.log("deleteTarget!!!!")
   console.log("受け取ったJson")
   console.log(req.body)

   const id = jwtDecription(req.body.token);

   moduleFordb.deleteTargetByObjectId(id, req.body.data._id)
    .then(result => {
        console.log("deleteTargetByObjectIdの内容")
        console.log(result)
        res.json({
            status: 200,
            message: "削除しました"
        })
    }).catch(error =>{
        console.log("deleteTargetByObjectId失敗")
        console.log(error)
        res.json({
            status: 400,
            message: "削除できませんでした"
        })
    })
})
//id こっちで追加
app.post('/saveDocument' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            name : String,
            uri : String,
            targetId : String
        }
    }
    */
    console.log("saveDocument!!!")
    console.log("受け取ったJson")
    console.log(req.body)
    const id = jwtDecription(req.body.token);//token 復号
    req.body.data['userId'] = id

    moduleFordb.saveDocument(req.body.data).then(result =>{
        console.log("saveDocumentの中身")
        console.log(result)
        res.json({
            status: 200,
            message: "Document 登録しました",
            objectId:result._id
        })
        
    }).catch(error=>{
        console.log("saveDocument失敗")
        console.log(error)
        res.json({
            status: 400,
            message: "Document 登録失敗",
            objectId: ""
        })
    })
})

app.post('/getDocumentByUserId' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token)
    }
    */
    console.log("getDocumentByUserId!!!!!!!!!!!");
    const id = jwtDecription(req.body.token);//userId復号

    moduleFordb.getDocumentByUserId(id).then(result => {
        console.log("以下getDocumentByUserIdの結果")
        console.log(result)
        res.json({
            status: 200,
            message: "取得成功",
            data : result       
        })

    }).catch(error => {
        console.log("以下getDocumentByUserId失敗")
        console.log(error)
        res.json({
            status: 400,
            message: "取得失敗"
        })
    })

})

app.post('/updateDocument' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            id : Int,
            _id : String
            name : String,
            uri : String,
            targetId : String
        }
    }
    */
    console.log("updateDocument!!!")
    const id = jwtDecription(req.body.token);
    console.log("以下受け取ったJson")
    console.log(req.body)
    moduleFordb.updateDocumentByObjectId(id, req.body.data).then(result => {
        console.log("以下updateTargetの内容")
        console.log(result)
        res.json({
            status: 200,
            messaeg: "変更を適用できました！"
        })
    }).catch(error => {
        console.log("updateTarget失敗")
        console.log(error)
        res.json({
            status: 400,
            messaeg: "変更を適用できませんでした"
        })
    })
})

app.post('/deleteDocument' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            _id : String
        }
    }
    */
    console.log("deleteDocument!!!!")
    console.log("受け取ったJson")
    console.log(req.body)
    const id = jwtDecription(req.body.token);//id 復号
    moduleFordb.deleteDocumentByObjectId(id, req.body.data._id).then(result => {
        console.log("deleteDocumentByObjectIdの内容")
        console.log(result)
        res.json({
            status: 200,
            message: "Document削除しました"
        })
    }).catch(error =>{
        console.log("deleteDocumentByObjectId失敗")
        console.log(error)
        res.json({
            status: 400,
            message: "Document削除できませんでした"
        })
    })
})

app.post('/saveTerm' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            userId : Int,
            name : String,
            description : String,
            targetList : [],
            startDatetimeScheduled: Date,
            endDatetimeScheduled: Date,
            startDatetime: Date,
        }
    }
    */
    console.log("saveDocument!!!")
    console.log("受け取ったJson")
    console.log(req.body)
    const id = jwtDecription(req.body.token);//token 復号
    req.body.data['userId'] = id

    moduleFordb.saveTerm(req.body.data).then(result => {
        console.log("saveTermの中身")
        console.log(result)
        res.json({
            objectId:result._id,
            status: 200,
            message: "term登録しました。"
        })
    }).catch(error => {
        console.log("saveTerm登録失敗しました。")
        console.log(error)
        res.json({
            objectId: "",
            status: 400,
            message: "saveTerm失敗しました。"
        })
    })
})

app.post('/getTermByUserId' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token)
    }
    */
    console.log("getTermByUserId!!!!!!!!!!!");
    const id = jwtDecription(req.body.token);//userId復号
    moduleFordb.getTermByUserId(id).then(result => {
        console.log("以下getTermByUserIdの結果")
        console.log(result)
        res.json({
            status: 200,
            message: "成功",
            data: result
        })
    }).catch(error => {
        console.log("getTermByUserId失敗")
        console.log(error)
        res.json({
            status: 400,
            message: "取得できませんでした。"
        })
    })
})

app.post('/updateTerm' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            _id: String
            userId : Int,
            name : String,
            description : String,
            targetList : [],
            startDatetimeScheduled: Date,
            endDatetimeScheduled: Date,
            startDatetime: Date,
        }
    }
    */
    console.log("updateTerm!!!")
    console.log("以下受け取ったJson")
    console.log(req.body)
    const id = jwtDecription(req.body.token);
    moduleFordb.updateTermByObjectId(id, req.body.data).then(result => {
        console.log("以下updateTermの内容")
        console.log(result)
        res.json({
            status: 200,
            messaeg: "変更を適用できました！"
        })
    }).catch(error => {
        console.log("updateTerm失敗")
        console.log(error)
        res.json({
            status: 400,
            messaeg: "変更を適用できませんでした"
        })
    })
})

app.post('/deleteTermByObjectId' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            _id : String
        }
    }
    */
    console.log("deleteTermByObjectId!!!!")
    console.log("受け取ったJson")
    console.log(req.body)
    const id = jwtDecription(req.body.token);//id 復号
    moduleFordb.deleteTermByObjectId(id, req.body.data._id).then(result => {
        console.log("deleteTermByObjectIdの内容")
        console.log(result)
        res.json({
            status: 200,
            message: "Term削除しました"
        })
    }).catch(error => {
        console.log("deleteTermByObjectId失敗")
        console.log(error)
        res.json({
            status: 400,
            message: "Term削除できませんでした"
        })
    })
})

//こっちでId追加
app.post('/saveTodo' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            name : String,
            startDatetimeScheduled : Date,
            timeInfoExisted : Boolean,
            processingTimeScheduled : Number,
            repeatPattern : String,
            repeatDayForWeekly : [],
            targetList : [],
            term : String,
            completed : Boolean
        }
    }
    */
    console.log("saveDocument!!!")
    console.log("受け取ったJson")
    console.log(req.body)
    const id = jwtDecription(req.body.token);//token 復号
    req.body.data['userId'] = id
    moduleFordb.saveTodo(req.body.data).then(result => {
        console.log("saveTodoの中身")
        console.log(result)
        res.json({
            objectId: result._id,
            status: 200,
            message: "todo登録成功"
        })
    }).catch(error => {
        console.log("saveTodo失敗")
        console.log(error)
        res.json({
            objectId: "",
            status: 400,
            message: "登録失敗しました。"
        })
    })
})

app.post('/getTodoByUserId' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token)
    }
    */
    console.log("getTodoByUserId!!!!!!!!!!!");
    console.log("取得したJsonの中身")
    console.log(req.body)
    const id = jwtDecription(req.body.token);//userId復号
    moduleFordb.getTodoByUserId(id).then(result => {
        console.log("以下getTodoByUserIdの結果")
        console.log(result)
        res.json({
            status: 200,
            message: "成功",
            data: result
        })
    }).catch(error => {
        console.log("getTodoByUserId失敗")
        console.log(error)
        res.json({
            status: 400,
            message: "取得できませんでした。"
        })
    })
})

app.post('/updateTodoByObjectId' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            _id: String
            name : String,
            startDatetimeScheduled : Date,
            timeInfoExisted : Boolean,
            processingTimeScheduled : Number,
            repeatPattern : String,
            repeatDayForWeekly : [],
            targetList : [],
            term : String,
            completed : Boolean
        }
    }
    */
    console.log("updateTodo!!!")
    console.log("以下受け取ったJson")
    console.log(req.body)
    const id = jwtDecription(req.body.token);
    moduleFordb.updateTodoByObjectId(id, req.body.data).then(result => {
        console.log("以下updateTodoの内容")
        console.log(result)
        res.json({
            status: 200,
            messaeg: "変更を適用できました！"
        })
    }).catch(error => {
        console.log("updateTodo失敗")
        console.log(error)
        res.json({
            status: 400,
            messaeg: "変更を適用できませんでした"
        })
    })
})

app.post('/deleteTodoByObjectId' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            _id : String
        }
    }
    */
    console.log("deleteTodoyObjectId!!!!")
    console.log("受け取ったJson")
    console.log(req.body)
    const id = jwtDecription(req.body.token);//id 復号
    moduleFordb.deleteTodoByObjectId(id, req.body.data._id).then(result => {
        console.log("deleteTodoByObjectIdの内容")
        console.log(result)
        res.json({
            status: 400,
            message: "Todo削除成功"
        })
    }).catch(error => {
        console.log("deleteTodoByObjectId失敗")
        console.log(error)
        res.json({
            status: 400,
            message: "Todo削除できませんでした"
        })
    })
})

//こっちでid追加
app.post('/saveHabit' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            name : String,
            target : String
        }
    }
    */
    console.log("saveHabit!!!")
    console.log("受け取ったJson")
    console.log(req.body)
    const id = jwtDecription(req.body.token);//token 復号
    req.body.data['userId'] = id
    moduleFordb.saveHabit(req.body.data).then(result => {
        console.log("saveHabitの中身")
        console.log(result)
        res.json({
            objectId: result._id,
            status: 200,
            message: "Habit登録成功"
        })
    }).catch(error => {
        console.log("saveHabit失敗")
        console.log(error)
        res.json({
            objectId: "",
            status: 400,
            message: "登録失敗しました。"
        })
    })
})

app.post('/getHabitByUserId' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token)
    }
    */
    console.log("getTodoByUserId!!!!!!!!!!!");
    console.log("取得したJsonの中身")
    console.log(req.body)
    const id = jwtDecription(req.body.token);//userId復号
    moduleFordb.getHabitByUserId(id).then(result => {
        console.log("以下getHabitByUserIdの結果")
        console.log(result)
        res.json({
            status: 200,
            message: "成功",
            data: result
        })
    }).catch(error => {
        console.log("getHabitByUserId失敗")
        console.log(error)
        res.json({
            status: 400,
            message: "取得できませんでした。"
        })
    })
})

app.post('/updateHabitByObjectId' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            _id : String
            name : String,
            target : String
        }
    }
    */
    console.log("updateHabit!!!")
    console.log("以下受け取ったJson")
    console.log(req.body)
    const id = jwtDecription(req.body.token);
    moduleFordb.updateHabitByObjectId(id, req.body.data).then(result => {
        console.log("以下updateHabitの内容")
        console.log(result)
        res.json({
            status: 200,
            messaeg: "変更を適用できました！"
        })
    }).catch(error => {
        console.log("updateHabit失敗")
        console.log(error)
        res.json({
            status: 400,
            messaeg: "変更を適用できませんでした"
        })
    })    
})

app.post('/deleteHabitByObjectId' , (req , res)=>{
    /*
    受け取るJson
    {
        token : String(token),
        data : {
            _id : String
        }
    }
    */
    console.log("deleteHabitByObjectId!!!!")
    console.log("受け取ったJson")
    console.log(req.body)
    const id = jwtDecription(req.body.token);//id 復号
    moduleFordb.deleteHabitByObjectId(id, req.body.data._id).then(result => {
        console.log("deleteHabitByObjectIdの内容")
        console.log(result)
        res.json({
            status: 400,
            message: "Habit削除成功"
        })
    }).catch(error => {
        console.log("deleteHabitByObjectId失敗")
        console.log(error)
        res.json({
            status: 400,
            message: "Habit削除できませんでした"
        })
    })
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
 