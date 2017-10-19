var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'mysql'
});

connection.connect();

connection.query('SELECT * from user', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].Host);
});

connection.end();