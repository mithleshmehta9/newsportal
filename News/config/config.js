const mysql = require("mysql");
var ip = require('ip');


const port = 4600
//CREATING CONNECTION
const dbconn  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_name',
    port: 3306,
    multipleStatements:true
});
        
dbconn.connect(function(err){
    if(err) console.log(err, "Error in database connection.");
    else {
        console.log(`System started on local\n host: http://localhost:${port}/ \n server: http://${ip.address()}:${port}/`)
    }   console.log("Database Connection is successfull.")
});

module.exports = dbconn;