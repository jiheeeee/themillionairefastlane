const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = process.env.port || 8000;

const bodyParser = require('body-parser');
const cors = require('cors');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "H/KMC123",
    database: "todolistdb",
    multipleStatements: true
});
connection.connect();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());

app.get("/api/todolist/readdb", (req,res)=>{
    const sqlQuery = "SELECT * FROM todolistdb.todolist ORDER BY due;"
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*result: "+result);
    })
});

app.post("/api/todolist/insert", (req,res)=>{
    let sqlQuery = "INSERT INTO todolistdb.todolist (id, author, title, description, due, participants)"+
                    " VALUES ('"+req.body.id+"','"+req.body.author+"','"+req.body.title+"','"+req.body.description+"','"+req.body.due+"','');"
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*result: "+result);
    });
});

app.post("/api/todolist/edit", (req,res)=>{
    let sqlQuery = "UPDATE todolistdb.todolist SET id="+req.body.id
                    +",author='"+req.body.author
                    +"',title='"+req.body.title
                    +"',description='"+req.body.description
                    +"',due='"+req.body.due
                    +"' WHERE id = " + req.body.id + ";";
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*result: "+result);
    })
})

app.post("/api/todolist/delete", (req,res)=>{
    /* 1) DELETE */
    /* 2) id Rearrange */
    let sqlQuery = "DELETE FROM todolistdb.todolist WHERE id="+req.body.id+";"
                    +"SET @CNT=-1;" + "UPDATE todolist SET todolist.id=@CNT:=@CNT+1;";
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*result: "+result);
    });
});

app.get("/api/todolist/getparticipant", (req,res)=>{
    let sqlQuery = "SELECT participants from todolistdb.todolist;"
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*results: "+result[1].participants);
    });
});

app.post("/api/todolist/updateparticipant", (req,res)=>{
    let sqlQuery = "UPDATE todolist SET participants = '" + req.body.user + "' WHERE id = " + req.body.id + ";"
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*results: "+result);
    });
});

app.get("/api/prjcalendar/readdb", (req,res)=>{
    const sqlQuery = "SELECT * FROM todolistdb.prjcalendar ORDER BY due;"
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*result: "+result);
    })
});

app.post("/api/prjcalendar/insert", (req,res)=>{
    let sqlQuery = "INSERT INTO todolistdb.prjcalendar (id, class, type, ver, title, description, due)"+
                    " VALUES ('"+req.body.id+"','"+req.body.class+"','"+req.body.type+"','"+req.body.ver+"','"+req.body.title+"','"+req.body.description+"','"+req.body.due+"');"
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*result: "+result);
    });
});

app.post("/api/prjcalendar/edit", (req,res)=>{
    let sqlQuery = "UPDATE todolistdb.prjcalendar SET id="+req.body.id
                    +",class='"+req.body.class
                    +"',type='"+req.body.type
                    +"',ver='"+req.body.ver
                    +"',title='"+req.body.title
                    +"',description='"+req.body.description
                    +"',due='"+req.body.due
                    +"' WHERE id = " + req.body.id + ";";
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*result: "+result);
    })
})

app.post("/api/prjcalendar/delete", (req,res)=>{
    /* 1) DELETE */
    /* 2) id Rearrange */
    let sqlQuery = "DELETE FROM todolistdb.prjcalendar WHERE id="+req.body.id+";"
                    +"SET @CNT=-1;" + "UPDATE prjcalendar SET prjcalendar.id=@CNT:=@CNT+1;";
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*result: "+result);
    });
});

app.get("/api/developers/readdb", (req,res)=>{
    const sqlQuery = "SELECT * FROM todolistdb.developers;"
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*result: "+result);
    })
});

app.post("/api/developers/insert", (req,res)=>{
    let sqlQuery = "INSERT INTO todolistdb.developers (id, name, romtitle, done)"+
                    " VALUES ('"+req.body.id+"','"+req.body.name+"','"+req.body.romtitle+"','"+req.body.done+"');"
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*result: "+result);
    });
});

app.post("/api/developers/checkdone", (req,res)=>{
    let sqlQuery = "UPDATE todolistdb.developers SET id="+req.body.id
                    +",name='"+req.body.name
                    +"',romtitle='"+req.body.romtitle
                    +"',done='"+req.body.done
                    +"' WHERE id = " + req.body.id + ";";
    console.log(sqlQuery);
    connection.query(sqlQuery, (err,result)=>{
        res.send(result);
        console.log("*err: "+err);
        console.log("*result: "+result);
    })
});

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`)
});