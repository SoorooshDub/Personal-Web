var mysql = require('mysql');

// Create A Connection
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "nodeDB",

})


// Connect To MySQL
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected To The Database!");
	// Select Data
	var sql = "SELECT * FROM customers";	
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		var i;
		for (i = 0; i < result.length; i++) {
			console.log(result[i].name);
		};
		
	});
});