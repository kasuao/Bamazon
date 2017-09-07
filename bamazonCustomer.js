// Then create a Node application called bamazonCustomer.js.
//requires
var mysql = require('mysql');
var inquirer = require('inquirer');

//create connection
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	database: "bamazon_db"
});
//error handling
connection.connect(function(err){
	if (err) {
		throw err;
		console.log("connected as id " + connection.threadId);
	};
});
// Running this application will first display all of the items 
// available for sale. Include the ids, names, and prices of products 
// for sale.
function displayAll(){
	connection.query("SELECT * FROM products", function(err, res){
		for (var i = 0; i < res.length; i++) {
			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + " $ " +  res[i].price + " | " + res[i].stock_quantity);
		}
		console.log("---------------------------------------------");
	});
};

displayAll();

// The app should then prompt users with two messages.
function askQuestions(){
	// The first should ask them the ID of the product they would like to buy.

	// The second message should ask how many units of the product they would 
	// like to buy.
}
