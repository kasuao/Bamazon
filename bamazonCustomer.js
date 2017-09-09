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

//variables for later
//basically storing the variables here with no value because the value will be given later
//...it is to get around scope issues.
var item_id = "";
var order_quantity = "";
var stock_quantity = "";
var product_name = "";
var price = "";

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
function askId(){
    // The first should ask them the ID of the product they would like to buy.
  inquirer.prompt({
    name: "item_id",
    type: "input",
    message: "Please enter the ID of the item you would like to order.\n"
  }).then(function(answer){
    item_id = answer.item_id
    // running the askQuantity function from in here so it keeps going through the process.
    // this way the processes are split into simpler manageable code.
    askQuantity();
  });
};
  // The second message should ask how many units of the product they would
  // like to buy.
function askQuantity(){
  inquirer.prompt({
    name: "order_quantity",
    type: "input",
    message: "Please enter a quantity."
  }).then(function(answer){
    order_quantity = answer.order_quantity
    sendQuery();
  });
};

function sendQuery(){
  var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
  connection.query(query, {item_id: item_id}, function(err, res){
   for (var i = 0; i < res.length; i++) {
     console.log("Product Name: " + res[i].product_name + " | Price: " + res[i].price + " | Order Quantity: " + order_quantity);
   	 // store stock_quantity and product_name in a variable for use in next step/function.
	 stock_quantity = res[i].stock_quantity;
	 product_name = res[i].product_name;
	 price = res[i].price;
   };
   checkStock();
  });
};

// Once the customer has placed the order, your application should check if 
// your store has enough of the product to meet the customer's request.
function checkStock(){
	// compare order_quantity to stock_quantity if stock quantity is not enough
	if (order_quantity > stock_quantity) {
		//log that there is insufficient quantity
		console.log("There is insufficient quantity. Please enter a quantity less then what is in stock.");
		askQuantity();
	}else{
		//else
	// log your order of x number of product y has been placed.
		console.log("Your order of " + order_quantity + " of " + product_name + " is being processed.");
	// run function to update SQL database.
		updateDB();
	};
	
	
};

function updateDB(){
	// update stock_quantity to be (stock_quantity - order_quantity).
	var newStock = stock_quantity - order_quantity;
	// the query to update a db would be
	
	// connection.query([{column: updated value},
		connection.query(
			// UPDATE [table name] SET ? WHERE ?,
			"UPDATE products SET ? WHERE ?",
			[
				{
					stock_quantity: newStock
				},
				{
					// {row: chosenRow}], identifies the row where the column item needs
					// to be updated.
					item_id: item_id						
				}
			]);

	// log updated inventory.
	console.log("The inventory has been updated\n");
	console.log(product_name + " now has " + newStock + " in stock.");
	totalCost();
};

function totalCost(){
	// store the totalCost in a variable.
	var cost = order_quantity * price;
	// log "The price of your purchase is " + totalCost
	console.log("The price of your purchase is $ " + cost);
};


// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

displayAll();
askId();



