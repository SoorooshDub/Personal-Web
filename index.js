var http = require('http');
var fs = require('fs');
var url = require('url');
var mysql = require('mysql2');
// create a coonection
var con = mysql.createConnection({
    host : "localhost",
    user: "root",
    password :"root",
    port : 3306,
    database : "nodeDB",
})
// conecct to MySQL
con.connect(function(err) {
    if(err) throw err;
    console.log("Connected To Database");
    var values =[
            ['John Doe', 'john.doe@example.com'],
            ['Jane Smith', 'jane.smith@example.com'],
            ['Michael Johnson', 'michael.johnson@example.com'],
            ['Emily Brown', 'emily.brown@example.com'],
            ['David Lee', 'david.lee@example.com'],
            ['Sarah Taylor', 'sarah.taylor@example.com'],
            ['Christopher Clark', 'christopher.clark@example.com'],
            ['Jessica Martinez', 'jessica.martinez@example.com'],
            ['Matthew Rodriguez', 'matthew.rodriguez@example.com'],
            ['Ashley Wilson', 'ashley.wilson@example.com'],
            ['Daniel Anderson', 'daniel.anderson@example.com'],
            ['Amanda Thomas', 'amanda.thomas@example.com'],
            ['James White', 'james.white@example.com'],
            ['Olivia Harris', 'olivia.harris@example.com'],
            ['Robert Martin', 'robert.martin@example.com'],
            ['Elizabeth King', 'elizabeth.king@example.com'],
            ['William Walker', 'william.walker@example.com'],
            ['Sophia Green', 'sophia.green@example.com'],
            ['Benjamin Hall', 'benjamin.hall@example.com'],
            ['Mia Young', 'mia.young@example.com']
        ]
        
    

   
    con.query("CREATE DATABASE IF NOT EXISTS nodeDB", function(err, result) {
        if (err) throw err;
        console.log("Database created");
    });
    var table = "CREATE TABLE IF NOT EXISTS customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))";
    con.query(table,function(err, result) {
        if (err) throw err;
        console.log("Table created");
    });

     var sql = "INSERT INTO customers (name, email) VALUES ?";
    con.query(sql, [values],function(err, result) {
        if (err) throw err;
        console.log("Records inserted "+ result.affectedRows)
    
    
});

});

http.createServer(function(req, res) {
    var q = url.parse(req.url,true);
    var filename = "." + q.pathname;
    if (filename == './'){filename = './index';}
    filename = filename + ".html"

    fs.readFile(filename, function(err, data) {
        if (err){
            res.writeHead(404,{'Content-Type': 'text/html'});
            return res.end("404 Not Found")
        }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();

    })
}).listen(8080);

console.log("Server port listening on port 8080...");   