var mysql = require("mysql");
var inquirer = require("inquirer");
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "emilykeen711",
    // Your password
    password: "password123",
    database: "Bamazon_db"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
});


var start = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].item_id + "|| Product name: " + results[i].product_name +
                "|| Department Name: " +
                results[i].department_name + "|| Price: " +
                results[i].price + "|| Stock Quanity: " +
                results[i].stock_quanity);
        }
        //put query "select * From products;"
        inquirer.prompt([{
            name: "ID",
            type: "input",
            message: "What is the ID of the item you would like to purchase?"
        }, {
            name: "quantity",
            type: "input",
            message: "What quantity of this product would you like?"
        }]).then(function(answer) {

            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id == answer.ID) {
                    chosenItem = results[i];
                    if (chosenItem.stock_quanity >= answer.quantity) {
                        var quantity = +chosenItem.stock_quanity - +answer.quantity;
                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quanity: quantity
                        }, {
                            item_id: answer.ID
                        }], function(err, res) {
                            console.log("Your Total is: $" + chosenItem.price * answer.quantity);


                        });
                    } else {
                        console.log("Insufficient quantity! Try again");
                    }
                }
            }


            start();
        })
    });
}

start();