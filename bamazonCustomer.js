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
		console.log("Enter the item number to select the item you want to order.");
	});
};



// The app should then prompt users with two messages.
function askQuestions(){
	// The first should ask them the ID of the product they would like to buy.
	inquirer.prompt({
		name: "item_id",
		type: "input",
		message: "Please enter the ID of the item you would like to order.\n"
	},
	// The second message should ask how many units of the product they would 
	// like to buy.
	{
		name: "order_quantity",
		type: "input",
		message: "Please enter a quantity."
	}).then(function(answer){
		var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?"; 
		connection.query(query, {item_id: answer.item_id}, function(err, res){
			for (var i = 0; i < res.length; i++) {

				console.log("You have chosen the following\n Product Name: " + res[i].product_name + " | Price: " + res[i].price + " | Order Quantity: " + answer.order_quantity);
			};
		});
	});
	
};
displayAll();
askQuestions();
// Once the customer has placed the order, your application should check if 
// your store has enough of the product to meet the customer's request.



// If not, the app should log a phrase like Insufficient quantity!, and then 
// prevent the order from going through.



// However, if your store does have enough of the product, you should fulfill the 
// customer's order.


// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.